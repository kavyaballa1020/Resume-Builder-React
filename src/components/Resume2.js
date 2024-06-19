import React, { useRef } from 'react';
import './Resume2.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Resume2 = ({ resumeData }) => {
    const { name, title, contact, photo, profileText, skills, education, experience, languages, certificates } = resumeData;
    const resumeRef = useRef();

    const handleDownload = () => {
        const input = resumeRef.current;
        // Hide the download button before taking the screenshot
        const downloadButton = document.querySelector('.download-button-container');
        downloadButton.style.display = 'none';

        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
            
            // Show the download button again after the screenshot is taken
            downloadButton.style.display = 'block';
        });
    };

    return (
        <div>
            <div className="resume2" ref={resumeRef}>
                <div className="resume-header">
                    <div className="profile-image">
                        {photo && <img src={photo} alt="Profile" />}
                    </div>
                    <div className="header-text">
                        <h1>{name}</h1>
                        <h3>{title}</h3>
                    </div>
                </div>
                <div className="resume-body">
                    <div className="sidebar">
                        <section className="about-me">
                            <h3>About Me</h3>
                            <p>{profileText}</p>
                        </section>
                        <section className="personal-skills">
                            <h3>Skills</h3>
                            {skills.map((skill, index) => (
                                <div key={index} className="skill">
                                    <span>{skill.name}</span>
                                    <div className="skill-bar">
                                        <div className="skill-level" style={{ width: `${skill.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className="personal-info">
                            <h3>Personal Info</h3>
                            <p><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
                            <p><i className="fas fa-envelope"></i> {contact.email}</p>
                            <p><i className="fas fa-phone-alt"></i> {contact.phone}</p>
                            <p><i className="fab fa-linkedin"></i> {contact.linkedin}</p>
                            <p><i className="fab fa-github"></i> {contact.github}</p>
                        </section>
                        <section className="languages">
                            <h3>Languages</h3>
                            {languages.map((language, index) => (
                                <div key={index} className="language">
                                    <span>{language.name}</span>
                                    <div className="language-bar">
                                        <div className="language-level" style={{ width: `${language.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="main-content">
                        <section className="work-experience">
                            <h3>Work Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <span>{exp.startYear} - {exp.endYear}</span>
                                    <div className="experience-details">
                                        <h4>{exp.position} - {exp.company}</h4>
                                        <p>{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className="education">
                            <h3>Education</h3>
                            {education.map((edu, index) => (
                                <div key={index} className="education-item">
                                    <span>{edu.startYear} - {edu.endYear}</span>
                                    <div className="education-details">
                                        <h4>{edu.degree}</h4>
                                        <p>{edu.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className="awards">
                            <h3>Awards</h3>
                            {certificates.map((cert, index) => (
                                <div key={index} className="award-item">
                                    <span>{cert}</span>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
            <div className="download-button-container">
                <button className="download-button" onClick={handleDownload}>
                    <i className="fas fa-download"></i> Download Resume
                </button>
            </div>
        </div>
    );
};

export default Resume2;
