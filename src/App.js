import React, { useState } from 'react';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  const handleFormSubmit = (data) => {
    setResumeData(data);
  };

  return (
    <div className="app">
      <Header />
      <div className="content">
        <ResumeForm onSubmit={handleFormSubmit} />
        {resumeData && <ResumePreview resumeData={resumeData} />}
      </div>
    </div>
  );
};

export default App;
