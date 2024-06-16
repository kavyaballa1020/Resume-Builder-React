// src/components/Form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = ({ setResumeData }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        contact: {
            phone: '',
            email: '',
            linkedin: '', // Updated field for LinkedIn profile
            github: '',   // Updated field for GitHub profile
            address: ''
        },
        profile: '',
        skills: [''],
        education: [
            { degree: '', institution: '', year: '' }
        ],
        experience: [
            { position: '', company: '', years: '', responsibilities: [''] }
        ],
        languages: ['']
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            setFormData(prevState => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleArrayChange = (e, index, key) => {
        const { value } = e.target;
        const updatedArray = [...formData[key]];
        updatedArray[index] = value;
        setFormData({ ...formData, [key]: updatedArray });
    };

    const handleNestedArrayChange = (e, index, nestedKey, key) => {
        const { value } = e.target;
        const updatedArray = [...formData[key]];
        updatedArray[index][nestedKey] = value;
        setFormData({ ...formData, [key]: updatedArray });
    };

    const handleNestedArrayItemChange = (e, index, nestedIndex, key, nestedKey) => {
        const { value } = e.target;
        const updatedArray = [...formData[key]];
        updatedArray[index][nestedKey][nestedIndex] = value;
        setFormData({ ...formData, [key]: updatedArray });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResumeData(formData);
        navigate('/resume');
    };

    const addSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, ''] });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institution: '', year: '' }]
        });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { position: '', company: '', years: '', responsibilities: [''] }]
        });
    };

    const addResponsibility = (index) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[index].responsibilities.push('');
        setFormData({ ...formData, experience: updatedExperience });
    };

    const addLanguage = () => {
        setFormData({ ...formData, languages: [...formData.languages, ''] });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Personal Information</h2>
            <input className="form-input" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input className="form-input" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

            <h2>Contact Information</h2>
            <input className="form-input" type="text" name="contact.phone" placeholder="Phone" value={formData.contact.phone} onChange={handleChange} required />
            <input className="form-input" type="email" name="contact.email" placeholder="Email" value={formData.contact.email} onChange={handleChange} required />
            <input className="form-input" type="text" name="contact.linkedin" placeholder="LinkedIn Profile URL" value={formData.contact.linkedin} onChange={handleChange} />
            <input className="form-input" type="text" name="contact.github" placeholder="GitHub Profile URL" value={formData.contact.github} onChange={handleChange} />
            <input className="form-input" type="text" name="contact.address" placeholder="Address" value={formData.contact.address} onChange={handleChange} />

            <h2>Profile</h2>
            <textarea className="form-input" name="profile" placeholder="Profile" value={formData.profile} onChange={handleChange} required />

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
                    <input className="form-input" type="text" placeholder="Year" value={edu.year} onChange={(e) => handleNestedArrayChange(e, index, 'year', 'education')} required />
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>Add Education</button>

            <h2>Experience</h2>
            {formData.experience.map((job, index) => (
                <div key={index} className="nested-form-group">
                    <input className="form-input" type="text" placeholder="Position" value={job.position} onChange={(e) => handleNestedArrayChange(e, index, 'position', 'experience')} required />
                    <input className="form-input" type="text" placeholder="Company" value={job.company} onChange={(e) => handleNestedArrayChange(e, index, 'company', 'experience')} required />
                    <input className="form-input" type="text" placeholder="Years" value={job.years} onChange={(e) => handleNestedArrayChange(e, index, 'years', 'experience')} required />
                    <h3>Responsibilities</h3>
                    {job.responsibilities.map((resp, respIndex) => (
                        <input key={respIndex} className="form-input" type="text" placeholder="Responsibility" value={resp} onChange={(e) => handleNestedArrayItemChange(e, index, respIndex, 'experience', 'responsibilities')} />
                    ))}
                    <button type="button" className="add-button" onClick={() => addResponsibility(index)}>Add Responsibility</button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addExperience}>Add Experience</button>

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
