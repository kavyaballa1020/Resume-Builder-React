import React, { useRef } from 'react';
import './Resume.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
        <div className="resume-wrapper">
            <div className="resume-container" ref={resumeRef}>
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
                            <div className="two-column-list">
                                {resumeData.skills ? resumeData.skills.map((skill, index) => (
                                    <div key={index} className="two-column-item">{skill}</div>
                                )) : <div className="two-column-item">No skills listed.</div>}
                            </div>
                        </section>
                        <section>
                            <h3>Certificates</h3>
                            <ul>
                                {resumeData.certificates ? resumeData.certificates.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                )) : <li>No certificates listed.</li>}
                            </ul>
                        </section>
                        <section>
                            <h3>Languages</h3>
                            <div className="two-column-list">
                                {resumeData.languages ? resumeData.languages.map((lang, index) => (
                                    <div key={index} className="two-column-item">{lang}</div>
                                )) : <div className="two-column-item">No languages listed.</div>}
                            </div>
                        </section>
                    </div>
                    <div className="right-column">
                        <section>
                            <h3>Profile</h3>
                            <p>{resumeData.profile || 'No profile available.'}</p>
                        </section>
                        <section>
                            <h3>Education</h3>
                            {resumeData.education ? (
                                <div className="education-list">
                                    {resumeData.education.map((edu, index) => (
                                        <div key={index} className="education-item">
                                            <div className="vertical-line"></div>
                                            <div className="education-details">
                                                <h4>{edu.degree}</h4>
                                                <p>Institution : {edu.institution}</p>
                                                <p>Duration : {edu.startYear} - {edu.endYear}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No education details available.</p>
                            )}
                        </section>
                        <section>
                            <h3>Work Experience</h3>
                            {resumeData.experience ? (
                                <div className="experience-list">
                                    {resumeData.experience.map((job, index) => (
                                        <div key={index} className="experience-item">
                                            <div className="vertical-line"></div>
                                            <div className="experience-details">
                                                <h4 >{job.position}</h4>
                                                <p >Company: {job.company}</p>
                                                <p className='job-duration'>Duration: {job.startMonth} {job.startYear} - {job.endMonth} {job.endYear}</p>
                                                {job.internships && (
                                                    <p className="intern">Description: {job.internships}</p>
                                                )}
                                            </div>
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
