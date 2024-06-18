import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';
import Form2 from './components/Form2';
import Resume2 from './components/Resume2';
import Preloader from './components/Preloader';
import Home from './components/Home'; 
import useFormHandlers from './components/Handler'; 
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(true); 
    const {
        formData,
        handleChange,
        handleArrayChange,
        handleNestedArrayChange,
        addSkill,
        addEducation,
        addCertificate,
        addLanguage,
        handleAddExperience,
        handleDelete,
        handleSubmit,
        handleFileChange // Add this line
    } = useFormHandlers();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false); 
        }, 2000); 
        return () => clearTimeout(timeout);
    }, []);

    // Render only after loading is complete
    if (loading) {
        return <Preloader />;
    }

    return (
        <Router>
            <div className="app-container">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/resume/1" element={
                            <div className="form-and-resume">
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
                                        handleDelete={handleDelete}
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume resumeData={formData} />
                                </div>
                            </div>
                        } />

                        <Route path="/resume/2" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form2
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
                                        handleDelete={handleDelete}
                                        handleFileChange={handleFileChange} // Add this line
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume2 resumeData={formData} />
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
