import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
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
    const fileInputRef = useRef(null);

    // State to track hovered feature card index
    const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState(null);

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

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result);
            localStorage.setItem('profileImage', reader.result);
            // dispatch event so header can update
            window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profileImage: reader.result } }));
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('profileImage');
        localStorage.removeItem('profileName');
        setShowProfile(false);
        navigate('/');
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
                                            <button className="profile-menu-item" onClick={() => { fileInputRef.current.click(); setShowProfile(false); }}>Change Photo</button>
                                            <button className="profile-menu-item" onClick={() => { navigate('/profile'); setShowProfile(false); }}>Profile</button>
                                            <button className="profile-menu-item" onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
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

                <section className="video-section">
                    <div className="video-inner">
                        <h2>What is a Resume?</h2>
                        <div className="video-card">
                            <video
                                width="100%"
                                controls
                                loop
                                preload="metadata"
                            >
                                <source src="/videos/What is a resume_.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <p>Learn the fundamentals of what a resume is and its purpose in job applications.</p>
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
