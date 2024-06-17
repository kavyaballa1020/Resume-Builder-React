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
                            <h3>Certificates</h3>
                            <ul>{resumeData.certificates ? resumeData.certificates.map((cert, index) =>
                                (<li key={index}>{cert}</li>)) : <li>No certificates listed.</li>}
                            </ul>
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
                            <h3>Education</h3>
                            {resumeData.education ? resumeData.education.map((edu, index) => (
                                <div key={index} className="experience-item">
                                    <div className="vertical-line"></div>
                                    <div className="experience-details">
                                        <h4>{edu.degree}</h4>
                                        <p>{edu.institution}</p>
                                        <p>{edu.year}</p>
                                    </div>
                                    <div className="vertical-line"></div>
                                </div>
                            )) : <p>No education details available.</p>}
                        </section>
                        <section>
                            <h3>Work Experience</h3>
                            {resumeData.experience ? (
                                <div className="experience-list">
                                    {resumeData.experience.map((job, index) => (
                                        <div key={index} className="experience-item">
                                            <div className="vertical-line"></div>
                                            <div className="experience-details">
                                                <h4>{job.position}</h4>
                                                <p>Company: {job.company}</p>
                                                <p className="job-duration">Duration: {job.startMonth} {job.startYear} - {job.endMonth} {job.endYear}</p>
                                                {job.internships && (
                                                    <div>
                                                        <p className='intern'>Description: {job.internships}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="vertical-line"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No work experience available.</p>
                            )}
                        </section>
                    </div>
                </div>
            </div>
            <button onClick={handleDownload} className="download-button">Download Resume</button>
        </div>
    );
};

export default Resume;
