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
        profile: '', // This will hold the selected profile type ('fullStack', 'software', etc.)
        profileText: '', // This will hold the corresponding profile text
        skills: [],
        education: [],
        experience: [],
        certificates: [],
        languages: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle profile selection separately
        if (name === 'profile') {
            let profileText = '';
            switch (value) {
                case 'fullStack':
                    profileText = "I am an experienced full-stack developer with expertise in frontend (HTML/CSS/JavaScript, React) and backend (Node.js, Express) technologies. Skilled in building scalable applications, optimizing performance, and implementing best practices. Passionate about problem-solving and creating seamless user experiences.";
                    break;
                case 'software':
                    profileText = "I am a software developer adept in designing and implementing robust applications. Proficient in multiple programming languages and frameworks, with a strong focus on code quality, scalability, and innovation. Committed to delivering solutions that meet both technical and business requirements effectively.";
                    break;
                case 'mernStack':
                    profileText = "I am a MERN stack developer proficient in MongoDB, Express.js, React, and Node.js. Experienced in building full-stack applications, integrating APIs, and optimizing performance. Skilled in frontend and backend development, with a focus on creating responsive, user-friendly interfaces and scalable solutions.";
                    break;
                case 'appDeveloper':
                    profileText = "I am an app developer skilled in designing and deploying native and hybrid applications for iOS and Android platforms. Proficient in UI/UX design, mobile development frameworks, and implementing robust backend solutions. Dedicated to creating intuitive user experiences and optimizing app performance for diverse user bases.";
                    break;
                case 'frontEnd':
                    profileText = "I am a dedicated front-end web developer proficient in HTML, CSS, and JavaScript frameworks such as React and Vue.js. Experienced in creating responsive, user-friendly interfaces and optimizing web performance. Passionate about crafting visually appealing websites that enhance user experience and achieve business objectives.";
                    break;
                default:
                    profileText = '';
            }

            // Update formData with selected profile type and corresponding text
            setFormData({ ...formData, profile: value, profileText: profileText });
        } else {
            // Handle other input fields, including nested fields
            const keys = name.split('.');
            if (keys.length > 1) {
                // Handle nested fields
                setFormData(prevState => ({
                    ...prevState,
                    [keys[0]]: {
                        ...prevState[keys[0]],
                        [keys[1]]: value
                    }
                }));
            } else {
                // Handle regular fields
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    // Function to handle changes in array fields
    const handleArrayChange = (e, index, field) => {
        const newValue = e.target.value;
        const newArray = [...formData[field]];
        newArray[index] = newValue;
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };

    // Function to handle changes in nested array fields
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

    // Function to add a new skill
    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, ''],
        });
    };

    // Function to add a new education entry
    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institution: '', startYear: '', endYear: '' }],
        });
    };

    // Function to add a new certificate
    const addCertificate = () => {
        setFormData({
            ...formData,
            certificates: [...formData.certificates, ''],
        });
    };

    // Function to add a new language
    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [...formData.languages, ''],
        });
    };

    // Function to add a new experience entry
    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', internships: '' }],
        });
    };
    const handleDelete = (index, field) => {
        const newArray = [...formData[field]];
        newArray.splice(index, 1);
        setFormData({
            ...formData,
            [field]: newArray,
        });
    };


    // Function to handle form submission (currently just logs the form data)
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
                    handleDelete={handleDelete}
                />
            </div>
            <div className="resume-wrapper">
                <Resume resumeData={formData} />
            </div>
        </div>
    );
};

export default App;
