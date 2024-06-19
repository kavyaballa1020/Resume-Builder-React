import { useState, useEffect } from 'react';

const useFormHandlers2 = () => {
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

   const handleArrayChange = (e, index, field, subField = null) => {
    const newValue = e.target.value;
    const newArray = [...formData[field]]; // Create a copy of the array to avoid mutating state directly

    if (subField !== null) {
        // If subField is provided, update a specific property within an object in the array
        newArray[index] = {
            ...newArray[index],
            [subField]: newValue,
        };
    } else {
        // If no subField is provided, update a simple array of strings
        newArray[index] = newValue;
    }

    // Update the formData state with the new array
    setFormData({
        ...formData,
        [field]: newArray,
    });
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
            skills: [...formData.skills, { name: '', percentage: 0 }],
        });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [
                ...formData.education,
                { degree: '', institution: '', branch: '', cgpa: '', cgpaType: 'percentage', startYear: '', endYear: '', location: '' }
            ],
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
            languages: [...formData.languages, { name: '', percentage: 0 }],
        });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experience: [
                ...formData.experience,
                { position: '', company: '', location: '', startMonth: '', startYear: '', endMonth: '', endYear: '', internships: '' }
            ],
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
        addEducation,
        addCertificate,
        addLanguage,
        handleAddExperience,
        handleDelete,
        handleSubmit,
        handleFileChange
    };
};

export default useFormHandlers2;
