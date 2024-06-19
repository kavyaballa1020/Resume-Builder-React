import React from 'react';
import './Form2.css';

const Form2 = ({
    formData,
    handleChange,
    handleArrayChange,
    addSkill,
    addEducation,
    addCertificate,
    addLanguage,
    handleAddExperience,
    handleNestedArrayChange,
    handleSubmit,
    handleDelete,
    handleFileChange
}) => {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2><i className="fas fa-user"></i> Personal Info</h2>
            <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <h2><i className="fas fa-address-book"></i> Contact Info</h2>
            <input
                className="form-input"
                type="text"
                name="contact.phone"
                placeholder=" Phone"
                value={formData.contact.phone}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="email"
                name="contact.email"
                placeholder="Email"
                value={formData.contact.email}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="contact.linkedin"
                placeholder=" LinkedIn Profile URL"
                value={formData.contact.linkedin}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.github"
                placeholder=" GitHub Profile URL"
                value={formData.contact.github}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.address"
                placeholder=" Address"
                value={formData.contact.address}
                onChange={handleChange}
            />
            <h2><i className="fas fa-image"></i> Profile Photo</h2>
            <input
                className="form-input"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
            />

            <h2><i className="fas fa-user-tie"></i> Profile</h2>
            <select
                className="form-input"
                name="profile"
                onChange={handleChange}
                value={formData.profile}
                required
            >
                <option value="">Select Profile</option>
                <option value="fullStack">Full Stack Developer</option>
                <option value="software">Software Developer</option>
                <option value="mernStack">MERN Stack Developer</option>
                <option value="appDeveloper">App Developer</option>
                <option value="frontEnd">Front End Developer</option>
            </select>
            <textarea
                className="form-input textarea"
                name="profileText"
                placeholder="Profile"
                value={formData.profileText}
                onChange={handleChange}
            />
<h2><i className="fas fa-cogs"></i> Skills</h2>
{formData.skills.map((skill, index) => (
    <div key={index} className="form-group">
        <input
            className="form-input"
            type="text"
            placeholder="Skill"
            value={skill.name}
            onChange={(e) => handleArrayChange(e, index, 'skills', 'name')}
        />
        <input
            className="form-input"
            type="number"
            placeholder="Percentage"
            value={skill.percentage}
            onChange={(e) => handleArrayChange(e, index, 'skills', 'percentage')}
            min="0"
            max="100"
        />
        <button type="button" className="delete-button" onClick={() => handleDelete(index, 'skills')}>
            Delete
        </button>
    </div>
))}
<button type="button" className="add-button" onClick={addSkill}>
    Add Skill
</button>
            <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleNestedArrayChange(e, index, 'degree', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => handleNestedArrayChange(e, index, 'institution', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Branch"
                        value={edu.branch}
                        onChange={(e) => handleNestedArrayChange(e, index, 'branch', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) => handleNestedArrayChange(e, index, 'location', 'education')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Start Year"
                        value={edu.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="End Year"
                        value={edu.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'education')}
                        required
                    />
                    <div className="form-group">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="CGPA"
                            value={edu.cgpa}
                            onChange={(e) => handleNestedArrayChange(e, index, 'cgpa', 'education')}
                            required
                        />
                        <select
                            className="form-input"
                            value={edu.cgpaType}
                            onChange={(e) => handleNestedArrayChange(e, index, 'cgpaType', 'education')}
                        >
                            <option value="percentage">Percentage</option>
                            <option value="cgpa">CGPA</option>
                        </select>
                    </div>
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'education')}>
                        Delete
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>
                Add Education
            </button>
            
            <h2><i className="fas fa-briefcase"></i> Experience</h2>
            {formData.experience.map((exp, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => handleNestedArrayChange(e, index, 'position', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleNestedArrayChange(e, index, 'company', 'experience')}
                    />
                    
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Start Month"
                        value={exp.startMonth}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startMonth', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Start Year"
                        value={exp.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="End Month"
                        value={exp.endMonth}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endMonth', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="End Year"
                        value={exp.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'experience')}
                    />
                    <textarea
                        className="form-input textarea"
                        placeholder="Explain briefly about your experience and projects and languages used"
                        value={exp.internships}
                        onChange={(e) => handleNestedArrayChange(e, index, 'internships', 'experience')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'experience')}>
                        Delete
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddExperience}>
                Add Experience
            </button>

            <h2><i className="fas fa-award"></i>Certificate</h2>
            {formData.certificates.map((certificate, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Certificate"
                        value={certificate}
                        onChange={(e) => handleArrayChange(e, index, 'certificates')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'certificates')}>
                        Delete
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addCertificate}>
                Add Certificate
            </button>

            <h2><i className="fas fa-globe-americas"></i> Languages</h2>
            {formData.languages.map((lang, index) => (
    <div key={index} className="form-group">
        <input
            className="form-input"
            type="text"
            placeholder="Language"
            value={lang.name}
            onChange={(e) => handleArrayChange(e, index, 'languages', 'name')}
        />
        <input
            className="form-input"
            type="number"
            placeholder="Percentage"
            value={lang.percentage}
            onChange={(e) => handleArrayChange(e, index, 'languages', 'percentage')}
            min="0"
            max="100"
        />
        <button type="button" className="delete-button" onClick={() => handleDelete(index, 'languages')}>
            Delete
        </button>
    </div>
))}
<button type="button" className="add-button" onClick={addLanguage}>
    Add Language
</button>
        </form>
    );
};

export default Form2;
