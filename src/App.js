// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';

const App = () => {
    const [resumeData, setResumeData] = useState({});

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form setResumeData={setResumeData} />} />
                <Route path="/resume" element={<Resume resumeData={resumeData} />} />
            </Routes>
        </Router>
    );
};

export default App;
