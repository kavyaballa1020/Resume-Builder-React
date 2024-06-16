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
                    <h1>{resumeData.name || 'Your Name'}</h1>
                    <h2>{resumeData.title || 'Your Title'}</h2>
                </div>
                <div className="content">
                    <div className="left-column">
                        <section>
                            <h3>Contact</h3>
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
                                    <p><i className="fas fa-map-marker-alt"></i> {resumeData.contact.address}</p>
                                </>
                            ) : (
                                <p>No contact information available.</p>
                            )}
                        </section>
                        <section>
                            <h3>Skills</h3>
                            <ul>
                                {resumeData.skills ? resumeData.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                )) : <li>No skills listed.</li>}
                            </ul>
                        </section>
                        <section>
                            <h3>Education</h3>
                            {resumeData.education ? resumeData.education.map((edu, index) => (
                                <div key={index}>
                                    <p>{edu.degree}</p>
                                    <p>{edu.institution}</p>
                                    <p>{edu.year}</p>
                                </div>
                            )) : <p>No education details available.</p>}
                        </section>
                        <section>
                            <h3>Languages</h3>
                            <ul>
                                {resumeData.languages ? resumeData.languages.map((lang, index) => (
                                    <li key={index}>{lang}</li>
                                )) : <li>No languages listed.</li>}
                            </ul>
                        </section>
                    </div>
                    <div className="right-column">
                        <section>
                            <h3>Profile</h3>
                            <p>{resumeData.profile || 'No profile available.'}</p>
                        </section>
                        <section>
                            <h3>Work Experience</h3>
                            {resumeData.experience ? resumeData.experience.map((job, index) => (
                                <div key={index}>
                                    <h4>{job.position}</h4>
                                    <p>{job.company} | {job.years}</p>
                                    {job.certificates && (
                                        <ul>
                                            {job.certificates.map((cert, certIndex) => (
                                                <li key={certIndex}>{cert}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )) : <p>No work experience available.</p>}
                        </section>
                    </div>
                </div>
            </div>
            <button onClick={handleDownload} className="download-button">Download Resume</button>
        </div>
    );
};

export default Resume;
