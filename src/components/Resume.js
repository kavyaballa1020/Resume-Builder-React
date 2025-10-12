import React, { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Resume.css';

const Resume = ({ resumeData }) => {
    const resumeRef = useRef();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
            // Select a varied voice - prefer female or non-default if available
            const variedVoice = availableVoices.find(voice => 
                voice.name.includes('Female') || 
                voice.name.includes('Zira') || 
                voice.name.includes('Samantha') || 
                (voice.lang.startsWith('en-') && voice.name !== 'Google US English')
            ) || availableVoices[0];
            setSelectedVoice(variedVoice);
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const generateResumeText = () => {
        let text = `Resume for ${resumeData.name || 'Your Name'}, ${resumeData.title || 'Your Title'}. `;
        
        if (resumeData.profileText) {
            text += `About me: ${resumeData.profileText}. `;
        }

        if (resumeData.contact) {
            text += `Contact information: Address ${resumeData.contact.address}, Email ${resumeData.contact.email}, Phone ${resumeData.contact.phone}. `;
            if (resumeData.contact.linkedin) text += `LinkedIn ${resumeData.contact.linkedin}. `;
            if (resumeData.contact.github) text += `GitHub ${resumeData.contact.github}. `;
        }

        if (resumeData.skills && resumeData.skills.length > 0) {
            text += 'Skills: ';
            resumeData.skills.forEach(skill => {
                text += `${skill}. `;
            });
        }

        if (resumeData.languages && resumeData.languages.length > 0) {
            text += 'Languages: ';
            resumeData.languages.forEach(lang => {
                text += `${lang}. `;
            });
        }

        if (resumeData.education && resumeData.education.length > 0) {
            text += 'Education: ';
            resumeData.education.forEach(edu => {
                text += `${edu.degree} from ${edu.institution}, ${edu.startYear} - ${edu.endYear}. `;
            });
        }

        if (resumeData.experience && resumeData.experience.length > 0) {
            text += 'Work Experience: ';
            resumeData.experience.forEach(exp => {
                text += `${exp.position} at ${exp.company}, ${exp.location || ''}, from ${exp.startMonth} ${exp.startYear} to ${exp.endMonth} ${exp.endYear}. ${exp.internships}. `;
            });
        }

        if (resumeData.certificates && resumeData.certificates.length > 0) {
            text += 'Certificates and Awards: ';
            resumeData.certificates.forEach(cert => {
                text += `${cert}. `;
            });
        }

        return text;
    };

    const handleVoiceOver = () => {
        if (isSpeaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(generateResumeText());
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1.1; // Slightly higher pitch for variety
        utterance.volume = 1;

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechSynthesis.speak(utterance);
    };

    const handleDownload = () => {
        const input = resumeRef.current;
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    return (
        <div>
             <div className="button-container">
                <Link to="/">
                    <button className="home-button">
                        <i className="fas fa-arrow-left" style={{marginRight: "10px"}}></i> Home 
                    </button>
                </Link>
            </div>
            <div id="resume" className="resume-container" ref={resumeRef}>
                <div className="header1">
                    {resumeData.photo && <img src={resumeData.photo} alt="Profile" className="profile-photo" />}
                    <h1>{resumeData.name || 'Your Name'}</h1>
                    <h4 className='headerh1'>{resumeData.title || 'Your Title'}</h4>
                </div>
                <div className="content">
                    <div className="left-column1">
                        <section>
                            <h3><i className="fas fa-address-book"></i> Contact</h3>
                            {resumeData.contact ? (
                                <>
                                    <p><i className="fas fa-phone-alt"></i> {resumeData.contact.phone}</p>
                                    <p><i className="fas fa-envelope"></i> {resumeData.contact.email}</p>
                                    {resumeData.contact.linkedin && (
                                        <p><i className="fab fa-linkedin"></i> <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
                                    )}
                                    {resumeData.contact.github && (
                                        <p><i className="fab fa-github"></i> <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
                                    )}
                                    <p className="contact-address"><i className="fas fa-map-marker-alt"></i> {resumeData.contact.address}</p>
                                </>
                            ) : (
                                <p>No contact information available.</p>
                            )}
                        </section>
                        <section>
                            <h3><i className="fas fa-cogs"></i> Skills</h3>
                            <ul className="two-column-list">
                                {resumeData.skills?.map((skill, index) => (
                                    <li className="two-column-item" key={index}>
                                        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('focusSkill', {detail: index}))} style={{all:'unset',cursor:'pointer'}}>
                                            {skill}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h3><i className="fas fa-award"></i> Certificates</h3>
                            <ul>
                                {resumeData.certificates?.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h3><i className="fas fa-globe-americas"></i> Languages</h3>
                            <ul className="two-column-list ">
                                {resumeData.languages?.map((lang, index) => (
                                    <li className="two-column-item" key={index}>
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                    <div className="right-column">
                        <section>
                            <h3><i className="fas fa-user"></i> Profile</h3>
                            <p>{resumeData.profileText || 'No profile available.'}</p>
                        </section>
                        <section>
                            <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                            <ul className="education-list">
                                {resumeData.education?.map((edu, index) => (
                                    <li className="education-item" key={index}>
                                        <div className="education-details">
                                            <h4>{edu.degree}</h4>
                                            <p>{edu.institution}</p>
                                            <p>{edu.startYear} - {edu.endYear}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h3><i className="fas fa-briefcase"></i> Work Experience</h3>
                            <ul className="experience-list">
                                {resumeData.experience?.map((exp, index) => (
                                    <li className="experience-item" key={index}>
                                        <div className="experience-details">
                                            <h4>{exp.position}</h4>
                                            <p>{exp.company}</p>
                                            <p>{exp.startMonth} {exp.startYear} - {exp.endMonth} {exp.endYear}</p>
                                            <p>{exp.internships}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
           
            <div className="download-button-container">
                <button className="download-button" onClick={handleDownload}>
                    <i className="fas fa-download"></i> Download Resume
                </button>
                <div className="voice-controls">
                    <select 
                        value={selectedVoice ? selectedVoice.name : ''} 
                        onChange={(e) => {
                            const voice = voices.find(v => v.name === e.target.value);
                            setSelectedVoice(voice || null);
                        }} 
                        className="voice-selector"
                        disabled={isSpeaking}
                    >
                        <option value="">Select Voice</option>
                        {voices.filter(voice => voice.lang.startsWith('en-')).map(voice => (
                            <option key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                    <button 
                        className={`voice-over-button ${isSpeaking ? 'speaking' : ''}`} 
                        onClick={handleVoiceOver}
                        disabled={!selectedVoice || voices.length === 0}
                    >
                        <i className={`fas ${isSpeaking ? 'fa-stop' : 'fa-volume-up'}`}></i> 
                        {isSpeaking ? 'Stop' : 'Play'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Resume;