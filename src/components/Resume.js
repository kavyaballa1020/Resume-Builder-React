// src/components/Resume.js
import React from 'react';

const Resume = ({ resumeData }) => {
    const {
        name,
        title,
        contact,
        skills,
        education,
        experience,
        languages
    } = resumeData;

    return (
        <div className="resume">
            <h1>{name}</h1>
            <h2>{title}</h2>
            <div className="contact">
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                <p>{contact.website}</p>
                <p>{contact.address}</p>
            </div>
            <div className="skills">
                <h3>Skills</h3>
                <p>{skills}</p>
            </div>
            <div className="education">
                <h3>Education</h3>
                {/* Render each education entry here */}
            </div>
            <div className="experience">
                <h3>Work Experience</h3>
                {/* Render each experience entry here */}
            </div>
            <div className="languages">
                <h3>Languages</h3>
                <p>{languages}</p>
            </div>
        </div>
    );
};

export default Resume;
