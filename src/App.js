import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';
import Form2 from './components/Form2';
import Resume2 from './components/Resume2';
import Preloader from './components/Preloader';
import Home from './components/Home';
import useFormHandlers from './components/Handler'; // Assuming this is for the first form
import useFormHandlers2 from './components/Handler2'; // Import useFormHandlers2
import './App.css';

const App = () => {
    const [loading1, setLoading1] = useState(true); // State for useFormHandlers (assuming for the first form)
    const [loading2, setLoading2] = useState(true); // State for useFormHandlers2 (assuming for the second form)

    // Form handler for resume 1 (using useFormHandlers)
    const {
        formData: formData1,
        handleChange: handleChange1,
        handleArrayChange: handleArrayChange1,
        handleNestedArrayChange: handleNestedArrayChange1,
        addSkill: addSkill1,
        addEducation: addEducation1,
        addCertificate: addCertificate1,
        addLanguage: addLanguage1,
        handleAddExperience: handleAddExperience1,
        handleDelete: handleDelete1,
        handleSubmit: handleSubmit1,
    } = useFormHandlers();

    // Form handler for resume 2 (using useFormHandlers2)
    const {
        loading: loading2State, // Rename to loading2State to avoid redeclaration
        formData: formData2,
        handleChange: handleChange2,
        handleArrayChange: handleArrayChange2,
        handleNestedArrayChange: handleNestedArrayChange2,
        addSkill: addSkill2,
        addEducation: addEducation2,
        addCertificate: addCertificate2,
        addLanguage: addLanguage2,
        handleAddExperience: handleAddExperience2,
        handleDelete: handleDelete2,
        handleSubmit: handleSubmit2,
        handleFileChange: handleFileChange2
    } = useFormHandlers2(); // Destructure the returned object from useFormHandlers2

    // useEffect for loading states
    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setLoading1(false); // Set loading state for the first form handler
        }, 2000);

        const timeout2 = setTimeout(() => {
            setLoading2(false); // Set loading state for the second form handler
        }, 2000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    // Render loading indicator if either form is loading
    if (loading1 || loading2) {
        return <Preloader />;
    }

    return (
        <Router>
            <div className="app-container">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        {/* Route for Resume 1 */}
                        <Route path="/resume/1" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form
                                        formData={formData1}
                                        handleChange={handleChange1}
                                        handleArrayChange={handleArrayChange1}
                                        addSkill={addSkill1}
                                        addEducation={addEducation1}
                                        addCertificate={addCertificate1}
                                        addLanguage={addLanguage1}
                                        handleAddExperience={handleAddExperience1}
                                        handleNestedArrayChange={handleNestedArrayChange1}
                                        handleSubmit={handleSubmit1}
                                        handleDelete={handleDelete1}
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume resumeData={formData1} />
                                </div>
                            </div>
                        } />

                        {/* Route for Resume 2 */}
                        <Route path="/resume/2" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form2
                                        formData={formData2}
                                        handleChange={handleChange2}
                                        handleArrayChange={handleArrayChange2}
                                        addSkill={addSkill2}
                                        addEducation={addEducation2}
                                        addCertificate={addCertificate2}
                                        addLanguage={addLanguage2}
                                        handleAddExperience={handleAddExperience2}
                                        handleNestedArrayChange={handleNestedArrayChange2}
                                        handleSubmit={handleSubmit2}
                                        handleDelete={handleDelete2}
                                        handleFileChange={handleFileChange2}
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume2 resumeData={formData2} />
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
