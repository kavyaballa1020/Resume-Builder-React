import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Resume.css';

const Resume = ({ resumeData }) => {
    const resumeRef = useRef();

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
                                        {skill}
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
            </div>
        </div>
    );
};

export default Resume;
