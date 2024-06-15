import React from 'react';
import './ResumePreview.css';

const ResumePreview = ({ resumeData }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-preview">
      <button onClick={handlePrint} className="print-button">Print Resume</button>
      <h2>{resumeData.name}</h2>
      <p><strong>Email:</strong> {resumeData.email}</p>
      <p><strong>Phone:</strong> {resumeData.phone}</p>
      <p><strong>Address:</strong> {resumeData.address}</p>
      <h3>Education</h3>
      <p>{resumeData.education}</p>
      <h3>Experience</h3>
      <p>{resumeData.experience}</p>
      <h3>Skills</h3>
      <p>{resumeData.skills}</p>
      <h3>Projects</h3>
      <p>{resumeData.project}</p>
      <h3>Social Profiles</h3>
      <p><strong>LinkedIn:</strong> <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">{resumeData.linkedin}</a></p>
      <p><strong>GitHub:</strong> <a href={resumeData.github} target="_blank" rel="noopener noreferrer">{resumeData.github}</a></p>
    </div>
  );
};

export default ResumePreview;
