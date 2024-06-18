import React, { useState } from 'react';
import Form from './components/Form';
import Resume from './components/Resume';
import './App.css';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        contact: {
            phone: '',
            email: '',
            linkedin: '',
            github: '',
            address: '',
        },
        profile: '',
        profileText: '',
        skills: [],
        education: [],
        experience: [],
        certificates: [],
        languages: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleArrayChange = (e, index, field) => {
        const newValue = e.target.value;
        const newArray = [...formData[field]];
        newArray[index] = newValue;
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    const handleNestedArrayChange = (e, index, field, parentField) => {
        const newValue = e.target.value;
        const newArray = [...formData[parentField]];
        newArray[index] = {
            ...newArray[index],
            [field]: newValue,
        };
        setFormData({
            ...formData,
            [parentField]: newArray,
        });
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, ''],
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institution: '', startYear: '', endYear: '' }],
        });
    };

    const addCertificate = () => {
        setFormData({
            ...formData,
            certificates: [...formData.certificates, ''],
        });
    };

    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [...formData.languages, ''],
        });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', internships: '' }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
    };

    return (
        <div className="app-container">
            <div className="form-wrapper">
                <Form
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    addSkill={addSkill}
                    addEducation={addEducation}
                    addCertificate={addCertificate}
                    addLanguage={addLanguage}
                    handleAddExperience={handleAddExperience}
                    handleNestedArrayChange={handleNestedArrayChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div className="resume-wrapper">
                <Resume resumeData={formData} />
            </div>
        </div>
    );
};

export default App;
