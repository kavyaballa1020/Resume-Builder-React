import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';
import Form2 from './components/Form2';
import Resume2 from './components/Resume2';
import Preloader from './components/Preloader';
import Home from './components/Home'; // Ensure correct path to Home component
import useFormHandlers from './components/Handler'; // Import the custom hook
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(true); // State to manage loading state
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
        handleSubmit
    } = useFormHandlers();

    useEffect(() => {
        // Simulate loading delay for demonstration purposes
        const timeout = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds (adjust as needed)
        }, 2000); // 2000 milliseconds (2 seconds)
        
        // Cleanup function to clear timeout if component unmounts
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
                        {/* Route for the home page */}
                        <Route path="/" element={<Home />} />

                        {/* Route for the first resume */}
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

                        {/* Route for the second resume */}
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
