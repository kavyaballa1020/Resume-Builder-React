// Resume2.js
import React from 'react';
import './Resume2.css';

const Resume2 = ({ resumeData }) => {
    const { name, title, contact, profileText, skills, education, experience, languages, certificates } = resumeData;

    return (
        <div className="resume2">
            <div className="resume-header">
                <div className="profile-image">
                    <img src="your-profile-image-url" alt="Profile" />
                </div>
                <div className="header-text">
                    <h1>{name}</h1>
                    <h2>{title}</h2>
                </div>
            </div>
            <div className="resume-body">
                <div className="sidebar">
                    <section className="about-me">
                        <h3>About Me</h3>
                        <p>{profileText}</p>
                    </section>
                    <section className="personal-skills">
                        <h3>Personal Skills</h3>
                        {skills.map((skill, index) => (
                            <div key={index} className="skill">
                                <span>{skill}</span>
                                <div className="skill-level">
                                    <div className="skill-bar" style={{ width: `${Math.random() * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="personal-info">
                        <h3>Personal Info</h3>
                        <p>{contact.address}</p>
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.linkedin}</p>
                        <p>{contact.github}</p>
                    </section>
                    <section className="languages">
                        <h3>Languages</h3>
                        {languages.map((language, index) => (
                            <div key={index} className="language">
                                <span>{language}</span>
                                <div className="language-level">
                                    <div className="language-bar" style={{ width: `${Math.random() * 100}%` }}></div>
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
    );
};

export default Resume2;
