import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Resume from './components/Resume';
import Preloader from './components/Preloader';
import {
    handleChange,
    handleArrayChange,
    handleNestedArrayChange,
    addSkill,
    addEducation,
    addCertificate,
    addLanguage,
    handleAddExperience,
    handleDelete,
    handleSubmit
} from './components/Handler';
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-container">
            {loading && <Preloader />}
            {!loading && (
                <>
                    <div className="form-wrapper">
                        <Form
                            formData={formData}
                            handleChange={(e) => handleChange(e, formData, setFormData)}
                            handleArrayChange={(e, index, field) => handleArrayChange(e, index, field, formData, setFormData)}
                            addSkill={() => addSkill(formData, setFormData)}
                            addEducation={() => addEducation(formData, setFormData)}
                            addCertificate={() => addCertificate(formData, setFormData)}
                            addLanguage={() => addLanguage(formData, setFormData)}
                            handleAddExperience={() => handleAddExperience(formData, setFormData)}
                            handleNestedArrayChange={(e, index, field, parentField) => handleNestedArrayChange(e, index, field, parentField, formData, setFormData)}
                            handleSubmit={(e) => handleSubmit(e, formData)}
                            handleDelete={(index, field) => handleDelete(index, field, formData, setFormData)}
                        />
                    </div>
                    <div className="resume-wrapper">
                        <Resume resumeData={formData} />
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
