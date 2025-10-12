import { useState, useEffect } from 'react';

const useFormHandlers = () => {
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
        photo: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

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

            setFormData({ ...formData, profile: value, profileText: profileText });
        } else {
            const keys = name.split('.');
            if (keys.length > 1) {
                setFormData(prevState => ({
                    ...prevState,
                    [keys[0]]: {
                        ...prevState[keys[0]],
                        [keys[1]]: value
                    }
                }));
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

   

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prevState => ({
                ...prevState,
                photo: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
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
            // Initialize new skill with a visible placeholder so it shows in the template
            skills: [...formData.skills, 'New Skill'],
        });
    };

    // Add a skill by value (used by the form's suggestion input)
    const addSkillWithValue = (value) => {
        if (!value || typeof value !== 'string') return;
        setFormData(prev => ({
            ...prev,
            skills: [...(prev.skills || []), value]
        }));
    };
    
    // Add a language by value (used by the form's suggestion input)
    const addLanguageWithValue = (value) => {
        if (!value || typeof value !== 'string') return;
        setFormData(prev => ({
            ...prev,
            languages: [...(prev.languages || []), value]
        }));
    };

    // Set languages from multi-line text (one language per line or comma-separated)
    const setLanguagesFromText = (text) => {
        if (typeof text !== 'string') return;
        const items = text.split(/\n|,/) // split by newline or comma
            .map(s => s.trim())
            .filter(Boolean);
        setFormData(prev => ({ ...prev, languages: items }));
    };

    // Add a certificate by value (used by the form's suggestion input)
    const addCertificateWithValue = (value) => {
        if (!value || typeof value !== 'string') return;
        setFormData(prev => ({
            ...prev,
            certificates: [...(prev.certificates || []), value]
        }));
    };

    // Set certificates from multi-line text (one certificate per line or comma-separated)
    const setCertificatesFromText = (text) => {
        if (typeof text !== 'string') return;
        const items = text.split(/\n|,/) // split by newline or comma
            .map(s => s.trim())
            .filter(Boolean);
        setFormData(prev => ({ ...prev, certificates: items }));
    };
    
    const handleArrayChange = (e, index, field, subField = null) => {
        const newValue = e.target.value;
        const newArray = [...formData[field]];
        newArray[index] = newValue;  // Update the value directly if it's an array of strings
    
        setFormData({
            ...formData,
            [field]: newArray,
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
            languages: [...formData.languages, ''],  // Initialize with an empty string
        });
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
    };

    return {
        loading,
        formData,
        handleChange,
        handleArrayChange,
        handleNestedArrayChange,
        addSkill,
        addSkillWithValue,
        addLanguageWithValue,
        setLanguagesFromText,
        addCertificateWithValue,
        setCertificatesFromText,
        addEducation,
        addCertificate,
        addLanguage,
        handleAddExperience,
        handleDelete,
        handleSubmit,
        handleFileChange
    };
};

export default useFormHandlers;  