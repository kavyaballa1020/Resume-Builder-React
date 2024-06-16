// src/components/Resume.js
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './Resume.css';

const Resume = ({ resumeData }) => {
    const resumeRef = useRef();

    const handleDownload = () => {
        const input = resumeRef.current;
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    return (
        <div>
            <div ref={resumeRef} className="resume-container">
                <div className="header">
                    <h1>{resumeData.name}</h1>
                    <h2>{resumeData.title}</h2>
                </div>
                <div className="content">
                    <div className="left-column">
                        <section>
                            <h3>Contact</h3>
                            <p><i className="fas fa-phone-alt"></i> {resumeData.contact.phone}</p>
                            <p><i className="fas fa-envelope"></i> {resumeData.contact.email}</p>
                            <p><i className="fas fa-globe"></i> {resumeData.contact.website}</p>
                            <p><i className="fas fa-map-marker-alt"></i> {resumeData.contact.address}</p>
                        </section>
                        <section>
                            <h3>Skills</h3>
                            <ul>
                                {resumeData.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h3>Education</h3>
                            {resumeData.education.map((edu, index) => (
                                <div key={index}>
                                    <p>{edu.degree}</p>
                                    <p>{edu.institution}</p>
                                    <p>{edu.year}</p>
                                </div>
                            ))}
                        </section>
                        <section>
                            <h3>Languages</h3>
                            <ul>
                                {resumeData.languages.map((lang, index) => (
                                    <li key={index}>{lang}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                    <div className="right-column">
                        <section>
                            <h3>Profile</h3>
                            <p>{resumeData.profile}</p>
                        </section>
                        <section>
                            <h3>Work Experience</h3>
                            {resumeData.experience.map((job, index) => (
                                <div key={index}>
                                    <h4>{job.position}</h4>
                                    <p>{job.company} | {job.years}</p>
                                    <ul>
                                        {job.responsibilities.map((resp, respIndex) => (
                                            <li key={respIndex}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
            <button onClick={handleDownload} className="download-button">Download Resume</button>
        </div>
    );
};

export default Resume;
