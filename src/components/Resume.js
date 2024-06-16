// src/components/Resume.js
import React from 'react';
import './Resume.css';

const Resume = ({ resumeData }) => {
    const {
        name,
        title,
        contact,
        profile,
        skills,
        education,
        experience,
        languages
    } = resumeData;

    return (
        <div className="resume">
            <header>
                <h1>{name}</h1>
                <h2>{title}</h2>
            </header>
            <div className="resume-body">
                <section className="contact">
                    <h3>Contact</h3>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Website:</strong> {contact.website}</p>
                    <p><strong>Address:</strong> {contact.address}</p>
                </section>
                <section className="profile">
                    <h3>Profile</h3>
                    <p>{profile}</p>
                </section>
                <section className="skills">
                    <h3>Skills</h3>
                    <ul>
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </section>
                <section className="education">
                    <h3>Education</h3>
                    {education.map((edu, index) => (
                        <div key={index}>
                            <h4>{edu.degree}</h4>
                            <p>{edu.institution}</p>
                            <p>{edu.year}</p>
                        </div>
                    ))}
                </section>
                <section className="experience">
                    <h3>Work Experience</h3>
                    {experience.map((job, index) => (
                        <div key={index}>
                            <h4>{job.position}</h4>
                            <p>{job.company} ({job.years})</p>
                            <ul>
                                {job.responsibilities.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <section className="languages">
                    <h3>Languages</h3>
                    <ul>
                        {languages.map((lang, index) => (
                            <li key={index}>{lang}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Resume;
