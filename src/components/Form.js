// src/components/Form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = ({ setResumeData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        contact: {
            phone: '',
            email: '',
            website: '',
            address: ''
        },
        skills: '',
        education: [],
        experience: [],
        languages: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResumeData(formData);
        navigate('/resume');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Personal Details</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />

            <h2>Contact Information</h2>
            <input type="text" name="contact.phone" placeholder="Phone" onChange={handleChange} required />
            <input type="email" name="contact.email" placeholder="Email" onChange={handleChange} required />
            <input type="url" name="contact.website" placeholder="Website" onChange={handleChange} />
            <input type="text" name="contact.address" placeholder="Address" onChange={handleChange} required />

            <h2>Skills</h2>
            <textarea name="skills" placeholder="Skills (comma-separated)" onChange={handleChange}></textarea>

            <h2>Education</h2>
            {/* You can create multiple inputs for each education entry here */}

            <h2>Work Experience</h2>
            {/* You can create multiple inputs for each experience entry here */}

            <h2>Languages</h2>
            <textarea name="languages" placeholder="Languages (comma-separated)" onChange={handleChange}></textarea>

            <button type="submit">Generate Resume</button>
        </form>
    );
};

export default Form;
