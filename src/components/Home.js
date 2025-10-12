import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './Quotes.css';
// Use public assets for template thumbnails (place your images in public/Assets)
// Expected filenames (please add these to public/Assets):
// - template-classic.png
// - template-modern.png
const Resume1Image = '/Assets/classic.png';
const Resume2Image = '/Assets/modern.png';

const Home = ({ isAuthenticated, setIsAuthenticated, isMuted, setIsMuted }) => {
    console.log('Home component mounted');
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const profileFromStorage = typeof window !== 'undefined' ? localStorage.getItem('profileImage') : null;
    const nameFromStorage = typeof window !== 'undefined' ? localStorage.getItem('profileName') : null;
    const [profileImage, setProfileImage] = useState(profileFromStorage || '/logo192.png');
    const [profileName, setProfileName] = useState(nameFromStorage || null);

    // State to track hovered feature card index
    const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState(null);

    // State for rotating quotes
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showAuthor, setShowAuthor] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
    ];

    const intervalRef = useRef(null);
    const bgMusicRef = useRef(null);
    const whooshRef = useRef(null);

    // Load voices asynchronously for better TTS
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoicesLoaded(true);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    // Initialize audio on mount
    useEffect(() => {
        bgMusicRef.current = document.getElementById('bgMusic');
        whooshRef.current = document.getElementById('whooshSound');
        if (bgMusicRef.current && !isMuted) {
            bgMusicRef.current.volume = 0.2; // Slightly lower for more subtle background music
            bgMusicRef.current.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }, []);

    // Update audio volume on mute change
    useEffect(() => {
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = isMuted;
            if (!isMuted && document.visibilityState === 'visible') {
                bgMusicRef.current.play().catch(e => console.log('Play failed:', e));
            }
        }
    }, [isMuted]);

    // Typewriter effect with whoosh on start and auto-TTS on complete
    useEffect(() => {
        const quote = quotes[currentQuoteIndex];
        setDisplayedText('');
        setIsTyping(true);
        setIsFading(true); // Start fade in

        // Play whoosh sound on new quote
        if (whooshRef.current && !isMuted) {
            whooshRef.current.currentTime = 0;
            whooshRef.current.play().catch(e => console.log('Whoosh play failed:', e));
        }

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < quote.text.length) {
                setDisplayedText(prev => prev + quote.text[index]);
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                setIsFading(false); // End fade

                // Auto TTS with improved natural voice after typing completes
                if (!isMuted && voicesLoaded) {
                    // Small delay to ensure sync
                    setTimeout(() => {
                        const utterance = new SpeechSynthesisUtterance(quote.text);
                        utterance.rate = 0.8; // Slightly faster for natural flow
                        utterance.pitch = 1.0; // Neutral pitch
                        utterance.volume = 0.8; // Balanced volume
                        const voices = window.speechSynthesis.getVoices();
                        // Prefer natural Google voices or similar for less robotic sound
                        let naturalVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Zira') || v.name.includes('Samantha') || (v.lang === 'en-US' && v.name.toLowerCase().includes('natural')));
                        if (!naturalVoice) {
                            naturalVoice = voices.find(v => v.lang === 'en-US') || voices[0];
                        }
                        if (naturalVoice) utterance.voice = naturalVoice;
                        window.speechSynthesis.cancel();
                        window.speechSynthesis.speak(utterance);
                    }, 500); // Delay for better sync with display
                }
            }
        }, 50); // Typing speed

        return () => clearInterval(typingInterval);
    }, [currentQuoteIndex, isMuted, voicesLoaded]);

    // Auto-rotate quotes every 7 seconds, pause on hover
    useEffect(() => {
        if (isHovered) return;

        intervalRef.current = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 7000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, quotes.length]);

    // Show author after typing completes
    useEffect(() => {
        if (!isTyping) {
            const timer = setTimeout(() => {
                setShowAuthor(true);
            }, 300); // Delay for fade-in
            return () => clearTimeout(timer);
        } else {
            setShowAuthor(false);
        }
    }, [isTyping]);

    // update profile image on custom event (Profile page dispatches this)
    React.useEffect(() => {
        const handler = (e) => {
            if (e && e.detail) {
                if (e.detail.profileImage) setProfileImage(e.detail.profileImage);
                if (e.detail.profileName) setProfileName(e.detail.profileName);
            }
        };
        window.addEventListener('profileUpdated', handler);
        return () => window.removeEventListener('profileUpdated', handler);
    }, []);

    const handleCta = (target) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        navigate(target);
    };
    return (
        <div className="site-root">
            <header className="site-header">
                <div className="header-inner">
                    <div className="logo">
                        <img src="/logo192.png" alt="Logo" />
                        <span className="brand">ResumeForge</span>
                    </div>

                    <nav className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#templates">Templates</a>
                        <a href="#ats">ATSChecker</a>
                        <a href="/videos">Videos</a>
                    </nav>

                    <button className="mute-btn" onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                        {isMuted ? '🔇' : '🔊'}
                    </button>

                    <div className="auth-buttons">
                        {!isAuthenticated ? (
                            <>
                                <button onClick={() => navigate('/login')} className="btn-outline">Login</button>
                                <button onClick={() => navigate('/signup')} className="btn-primary">Sign Up</button>
                            </>
                        ) : (
                            <div className="profile-wrap">
                                <button className="profile-btn" onClick={() => setShowProfile((s) => !s)} aria-haspopup="true" aria-expanded={showProfile}>
                                    <img src={profileImage} alt="profile" className="profile-img" />
                                </button>
                                {showProfile && (
                                    <div className="profile-menu" role="menu">
                                            {profileName && <div className="profile-name">{profileName}</div>}
                                            <button className="profile-menu-item" onClick={() => { navigate('/profile'); setShowProfile(false); }}>Profile</button>
<button className="profile-menu-item" onClick={() => { 
    setIsAuthenticated(false); 
    localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('profileImage'); 
    localStorage.removeItem('profileName'); 
    setShowProfile(false); 
    navigate('/'); 
}}>Logout</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main>
                <section className="hero parallax">
                    <div className="hero-inner">
                        <div className="hero-left">
                            <h1>Build Your Perfect<br/>Resume in Minutes</h1>
                            <p className="lead">Create professional, ATS-friendly resumes with our easy-to-use builder. Choose from beautiful templates and land your dream job.</p>

                            <div className="hero-ctas">
                                <button onClick={() => handleCta('/templates')} className="cta btn-gradient">Get Started Free</button>
                                <a href="#templates" className="cta btn-light">View Templates</a>
                            </div>
                        </div>

                        <div className="hero-right">
                            <div className="device-card">
                                <img src={Resume1Image} alt="Classic Resume preview" style={{marginRight: '12px', maxWidth: '48%'}} />
                                <img src={Resume2Image} alt="Modern Resume preview" style={{maxWidth: '48%'}} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="quotes-section">
                    <div className="quotes-inner">
                        <h2>Inspirational Quotes</h2>
                        <div
                            className={`quote-card ${isFading ? 'fade' : ''}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <blockquote className={`quote-text ${isTyping ? 'typing' : ''}`}>
                                "{displayedText}"
                                {isTyping && <span className="cursor">|</span>}
                            </blockquote>
                            <cite className={`quote-author ${showAuthor ? 'fade-in' : ''}`}>
                                — {quotes[currentQuoteIndex].author}
                            </cite>
                            <button
                                className="speak-quote-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (voicesLoaded) {
                                        const utterance = new SpeechSynthesisUtterance(displayedText || quotes[currentQuoteIndex].text);
                                        utterance.rate = 0.9;
                                        utterance.pitch = 1.0;
                                        utterance.volume = 0.8;
                                        const voices = window.speechSynthesis.getVoices();
                                        let naturalVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Zira') || v.name.includes('Samantha') || (v.lang === 'en-US' && v.name.toLowerCase().includes('natural')));
                                        if (!naturalVoice) {
                                            naturalVoice = voices.find(v => v.lang === 'en-US') || voices[0];
                                        }
                                        if (naturalVoice) utterance.voice = naturalVoice;
                                        window.speechSynthesis.cancel();
                                        window.speechSynthesis.speak(utterance);
                                    }
                                }}
                                aria-label="Speak quote"
                            >
                                🔊
                            </button>
                        </div>
                        <div className="quote-indicators">
                            {quotes.map((_, index) => (
                                <span
                                    key={index}
                                    className={`indicator ${index === currentQuoteIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentQuoteIndex(index)}
                                ></span>
                            ))}
                        </div>
                        <div className="quote-buttons">
                            <button
                                className="quote-btn next-reflection"
                                onClick={() => setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)}
                            >
                                Next Reflection
                            </button>
                            <button
                                className="quote-btn inspire-again"
                                onClick={() => {
                                    const randomIndex = Math.floor(Math.random() * quotes.length);
                                    setCurrentQuoteIndex(randomIndex);
                                }}
                            >
                                Inspire Me Again
                            </button>
                        </div>
                    </div>
                </section>

                <section id="features" className="features">
                    <h2 className="section-title">Why Choose ResumeForge?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎨</div>
                            <h3>Beautiful Templates</h3>
                            <p>Choose from dozens of professionally designed templates that stand out to employers.</p>
                        </div>

                        {/* ATS moved to its own detailed section below */}

                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Quick & Easy</h3>
                            <p>Build your resume in minutes with our intuitive drag-and-drop interface.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Mobile Friendly</h3>
                            <p>Edit and preview your resume on any device, anytime, anywhere.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⬇️</div>
                            <h3>Export Options</h3>
                            <p>Download as PDF, Word, or share via link. Multiple format support.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Private</h3>
                            <p>Your data is encrypted and secure. We never share your information.</p>
                        </div>
                    </div>
                </section>

                <section id="ats" className="ats-section">
                    <div className="ats-inner">
                        <div className="ats-left">
                            <h2 className="section-title">ATS Resume Checker</h2>
                            <p className="ats-lead">Make sure your resume passes the filters employers use. Our ATS checker analyzes formatting, keywords, and structure to increase your chance of getting to a human recruiter.</p>
                            <ul className="ats-list">
                                <li><span className="highlight">Keyword match</span> — compare your resume with job descriptions.</li>
                                <li><span className="highlight">Formatting checks</span> — ensures sections and headings are ATS-friendly.</li>
                                <li><span className="highlight">Readability score</span> — improve clarity for recruiters.</li>
                            </ul>

                            <div className="ats-ctas">
                                <button onClick={() => handleCta('/ats-checker')} className="cta btn-gradient">Run ATS Checker</button>
                                <a href="#templates" className="cta btn-light">Try Templates</a>
                            </div>
                        </div>

                        <div className="ats-right">
                            <div className="ats-card">
                                <img src="/Resume.svg" alt="ATS preview" />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="templates" className="templates">
                    <h2 className="section-title">Professional Templates</h2>
                    <div className="templates-row">
                        <div
                            className="template-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleCta('/resume/1')}
                            onKeyDown={(e) => e.key === 'Enter' && handleCta('/resume/1')}
                        >
                            <div className="template-media">
                                <img src={Resume1Image} alt="Classic template" className="template-thumb" onError={(e)=>{e.target.onerror=null; e.target.src='/Assets/resume-192x192.png'}} />
                                <div className="template-overlay">Classic</div>
                            </div>
                            <div className="template-foot">Classic Professional</div>
                        </div>

                        <div
                            className="template-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => handleCta('/resume/2')}
                            onKeyDown={(e) => e.key === 'Enter' && handleCta('/resume/2')}
                        >
                            <div className="template-media">
                                <img src={Resume2Image} alt="Modern template" className="template-thumb" onError={(e)=>{e.target.onerror=null; e.target.src='/Assets/resume-192x192.png'}} />
                                <div className="template-overlay">Modern</div>
                                <button
                                    className="voice-over-btn"
                                    aria-label="Play voice over for modern template"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (voicesLoaded) {
                                            const utterance = new SpeechSynthesisUtterance(
                                                "The Modern Creative template features a clean, contemporary design with bold headings and ample white space, perfect for showcasing your skills and experience in a visually appealing way."
                                            );
                                            // Select natural voice for template description
                                            const voices = window.speechSynthesis.getVoices();
                                            let naturalVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Zira') || v.name.includes('Samantha') || (v.lang === 'en-US' && v.name.toLowerCase().includes('natural')));
                                            if (!naturalVoice) {
                                                naturalVoice = voices.find(v => v.lang === 'en-US') || voices[0];
                                            }
                                            if (naturalVoice) {
                                                utterance.voice = naturalVoice;
                                                utterance.rate = 0.9;
                                                utterance.pitch = 1.1;
                                            }
                                            window.speechSynthesis.cancel();
                                            window.speechSynthesis.speak(utterance);
                                        }
                                    }}
                                >
                                    🔊
                                </button>
                            </div>
                            <div className="template-foot">Modern Creative</div>
                        </div>

                        {/* removed third template to show only two templates centered */}
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Ready to Build Your Resume?</h2>
                    <p className="sub">Join thousands of job seekers who have landed their dream jobs with ResumeForge</p>
                    <button onClick={() => handleCta('/templates')} className="create-btn">Create Your Resume Now</button>
                </section>
            </main>

            <footer className="site-footer">
                    <div className="footer-inner">
                    <div className="footer-col">
                        <h4>Product</h4>
                        <a href="#features">Features</a>
                        <a href="#templates">Templates</a>
                        <a href="#pricing">ATSChecker</a>
                    </div>

                    <div className="footer-col">
                        <h4>Resources</h4>
                        <a href="#blog">Blog</a>
                        <a href="#resume-tips">Resume Tips</a>
                        <a href="#career-advice">Career Advice</a>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="#about">About Us</a>
                        <a href="#contact">Contact</a>
                        <a href="#privacy">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer-bottom">© 2024 ResumeForge. All rights reserved.</div>
            </footer>

            {/* Audio elements */}
            <audio id="bgMusic" src="/assets/audio/background.mp3" loop preload="auto"></audio>
            <audio id="whooshSound" src="/assets/audio/whoosh.mp3" preload="auto"></audio>

            {/* Particles background */}
            <div className="particles">
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${10 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>
        </div>
    );
};

export default Home;
