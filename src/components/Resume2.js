import React, { useRef } from 'react';
import './Resume2.css';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import html2canvas from 'html2canvas';

const Resume2 = ({ resumeData }) => {
    const { name, title, contact, photo, profileText, skills, education, experience, languages, certificates } = resumeData;
    const resumeRef = useRef();

    const handleDownload = () => {
        const input = resumeRef.current;
        const downloadButton = document.querySelector('.download-button-container');
        downloadButton.style.display = 'none';

        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
            
            downloadButton.style.display = 'block';
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
                            <h3><i className="fas fa-user-circle"></i> About Me</h3>
                            <p>{profileText}</p>
                        </section>
                        <section className="personal-skills">
                            <h3><i className="fas fa-cogs"></i> Skills</h3>
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
                            <h3><i className="fas fa-user"></i> Personal Info</h3>
                            <p><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
                            <p><i className="fas fa-envelope"></i> {contact.email}</p>
                            <p><i className="fas fa-phone-alt"></i> {contact.phone}</p>
                            <p><i className="fab fa-linkedin"></i> {contact.linkedin}</p>
                            <p><i className="fab fa-github"></i> {contact.github}</p>
                        </section>
                        <section className="languages">
                            <h3><i className="fas fa-globe-americas"></i> Languages</h3>
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
                    <section className="Work-experience">
    <h3><i className="fas fa-briefcase"></i> Work Experience</h3>
    {experience.map((exp, index) => (
        <div key={index} className="Experience-item">
            <div className="Experience-duration">
                <span>{exp.startYear}  - {exp.endYear} </span>
            </div>
            <div className="Experience-details">
                <div className="Experience-header">
                    <h4> {exp.company}</h4>
                </div>
                <div className="Experience-content">
                <p>{exp.startMonth} - {exp.endMonth} </p>
                <p>{exp.position} </p>
                    <p>{exp.location}</p>
                    <p>{exp.internships}</p>
                    
                </div>
            </div>
        </div>
    ))}
</section>



<section className="Education">
    <h3><i className="fas fa-graduation-cap"></i> Education</h3>
    {education.map((edu, index) => (
        <div key={index} className="Education-item">
            <div className="Education-duration">
                <span>{edu.startYear} - {edu.endYear}</span>
            </div>
            <div className="Education-details">
                <div className="Education-header">
                    <h4>{edu.degree}</h4>
                </div>
                <div className="Education-content">
                    <p>{edu.institution}</p>
                    <p>Location : {edu.location}</p>
                    <p>Branch: {edu.branch}</p> {/* Display branch */}
                    <p>Marks : {edu.cgpa} {edu.cgpaType === 'percentage' ? 'Percentage' : 'CGPA'}</p> {/* Display CGPA with type */}
                </div>
            </div>
        </div>
    ))}
</section>
                
                
                  <section className="awards">
    <h3><i className="fas fa-award"></i> Awards</h3>
    {certificates.map((cert, index) => (
        <div key={index} className="award-item">
            <h6 key={index}>{cert}</h6>
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
