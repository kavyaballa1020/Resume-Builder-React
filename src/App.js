import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';
import Form2 from './components/Form2';
import Resume2 from './components/Resume2';
import Preloader from './components/Preloader';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ChooseTemplate from './components/ChooseTemplate';
import useFormHandlers from './components/Handler'; // Assuming this is for the first form
import useFormHandlers2 from './components/Handler2';
import ATSChecker from './components/ATSChecker'; // Import ATSChecker component
import VideoTutorials from './components/VideoTutorials'; // Import VideoTutorials component
import TextToSpeech from './components/TextToSpeech'; // Import TextToSpeech component
import './App.css';

const App = () => {
    const [loading1, setLoading1] = useState(true); // State for useFormHandlers (for the first form)
    const [loading2, setLoading2] = useState(true); // State for useFormHandlers2 (for the second form)

    // Form handler for resume 1 (using useFormHandlers)
    const {
        formData: formData1,
        handleChange: handleChange1,
        handleArrayChange: handleArrayChange1,
        handleNestedArrayChange: handleNestedArrayChange1,
        addSkill: addSkill1,
        addSkillWithValue: addSkillWithValue1,
        addLanguageWithValue: addLanguageWithValue1,
        setLanguagesFromText,
        addCertificateWithValue: addCertificateWithValue1,
        setCertificatesFromText,
        addEducation: addEducation1,
        addCertificate: addCertificate1,
        addLanguage: addLanguage1,
        handleAddExperience: handleAddExperience1,
        handleDelete: handleDelete1,
        handleSubmit: handleSubmit1,
    } = useFormHandlers();

    // Form handler for resume 2 (using useFormHandlers2)
    const {
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

    // authentication state (simple client-side flag persisted to localStorage)
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
        } catch (e) {
            return false;
        }
    });

    // mute state for global audio control
    const [isMuted, setIsMuted] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('isMuted')) || false;
        } catch (e) {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('isMuted', JSON.stringify(isMuted));
    }, [isMuted]);

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
                        <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isMuted={isMuted} setIsMuted={setIsMuted} />} />

                        {/* Login / Signup routes */}
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/templates" element={<ChooseTemplate isAuthenticated={isAuthenticated} />} />

                        {/* Route for Resume 1 */}
                        <Route path="/resume/1" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form
                                        formData={formData1}
                                        handleChange={handleChange1}
                                        handleArrayChange={handleArrayChange1}
                                        addSkill={addSkill1}
                                        addSkillWithValue={addSkillWithValue1}
                                        addLanguageWithValue={addLanguageWithValue1}
                                        setLanguagesFromText={setLanguagesFromText}
                                        addCertificateWithValue={addCertificateWithValue1}
                                        setCertificatesFromText={setCertificatesFromText}
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

                        {/* Route for ATS Checker */}
                        <Route path="/ats-checker" element={
                            <div className="ats-checker-wrapper">
                                <ATSChecker resumeText={formData1} /> {/* Passing the resume data to ATSChecker */}
                            </div>
                        } />

                        {/* Route for Video Tutorials */}
                        <Route path="/videos" element={<VideoTutorials />} />

                        {/* Route for Text-to-Speech */}
                        <Route path="/text-to-speech" element={<TextToSpeech />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
