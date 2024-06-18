import React from 'react';
import './Form.css';

const Form = ({ formData, handleChange, handleArrayChange, addSkill, addEducation, addCertificate, addLanguage, handleAddExperience, handleNestedArrayChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Personal Information</h2>
            <input className="form-input" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input className="form-input" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

            <h2>Contact Information</h2>
            <input className="form-input" type="text" name="contact.phone" placeholder="📞 Phone" value={formData.contact.phone} onChange={handleChange} required />
            <input className="form-input" type="email" name="contact.email" placeholder="📧 Email" value={formData.contact.email} onChange={handleChange} required />
            <input className="form-input" type="text" name="contact.linkedin" placeholder="🔗 LinkedIn Profile URL" value={formData.contact.linkedin} onChange={handleChange} />
            <input className="form-input" type="text" name="contact.github" placeholder="💻 GitHub Profile URL" value={formData.contact.github} onChange={handleChange} />
            <input className="form-input" type="text" name="contact.address" placeholder="🏠 Address" value={formData.contact.address} onChange={handleChange} />

            <h2>Profile</h2>
            <select className="form-input" name="profile" onChange={handleChange} required>
                <option value="">Select Profile</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Software Developer">Software Developer</option>
                <option value="MERN Stack Developer">MERN Stack Developer</option>
                <option value="App Developer">App Developer</option>
                <option value="Front End Developer">Front End Developer</option>
            </select>
            <textarea className="form-input" name="profileText" placeholder="Profile" value={formData.profileText} onChange={handleChange} />

            <h2>Skills</h2>
            {formData.skills.map((skill, index) => (
                <input key={index} className="form-input" type="text" placeholder="Skill" value={skill} onChange={(e) => handleArrayChange(e, index, 'skills')} />
            ))}
            <button type="button" className="add-button" onClick={addSkill}>Add Skill</button>

            <h2>Education</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className="nested-form-group">
                    <input className="form-input" type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedArrayChange(e, index, 'degree', 'education')} required />
                    <input className="form-input" type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleNestedArrayChange(e, index, 'institution', 'education')} required />
                    <input className="form-input" type="text" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'education')} required />
                    <input className="form-input" type="text" placeholder="End Year" value={edu.endYear} onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'education')} required />
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>Add Education</button>

            <h2>Experience</h2>
            {formData.experience.map((exp, index) => (
                <div key={index} className="nested-form-group">
                    <input className="form-input" type="text" placeholder="Position" value={exp.position} onChange={(e) => handleNestedArrayChange(e, index, 'position', 'experience')} />
                    <input className="form-input" type="text" placeholder="Company" value={exp.company} onChange={(e) => handleNestedArrayChange(e, index, 'company', 'experience')} />
                    <input className="form-input" type="text" placeholder="Start Month" value={exp.startMonth} onChange={(e) => handleNestedArrayChange(e, index, 'startMonth', 'experience')} />
                    <input className="form-input" type="text" placeholder="Start Year" value={exp.startYear} onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'experience')} />
                    <input className="form-input" type="text" placeholder="End Month" value={exp.endMonth} onChange={(e) => handleNestedArrayChange(e, index, 'endMonth', 'experience')} />
                    <input className="form-input" type="text" placeholder="End Year" value={exp.endYear} onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'experience')} />
                    <textarea className="form-input textarea" placeholder="Explain briefly about your experience and projects and languages used" value={exp.internships} onChange={(e) => handleNestedArrayChange(e, index, 'internships', 'experience')} />
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddExperience}>Add Experience</button>

            <h2>Certificates</h2>
            {formData.certificates.map((certificate, index) => (
                <input key={index} className="form-input" type="text" placeholder="Certificate" value={certificate} onChange={(e) => handleArrayChange(e, index, 'certificates')} />
            ))}
            <button type="button" className="add-button" onClick={addCertificate}>Add Certificate</button>

            <h2>Languages</h2>
            {formData.languages.map((lang, index) => (
                <input key={index} className="form-input" type="text" placeholder="Language" value={lang} onChange={(e) => handleArrayChange(e, index, 'languages')} />
            ))}
            <button type="button" className="add-button" onClick={addLanguage}>Add Language</button>

            <button type="submit" className="submit-button">Generate Resume</button>
        </form>
    );
};

export default Form;
