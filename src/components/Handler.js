export const handleChange = (e, formData, setFormData) => {
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

export const handleArrayChange = (e, index, field, formData, setFormData) => {
    const newValue = e.target.value;
    const newArray = [...formData[field]];
    newArray[index] = newValue;
    setFormData({
        ...formData,
        [field]: newArray,
    });
};

export const handleNestedArrayChange = (e, index, field, parentField, formData, setFormData) => {
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

export const addSkill = (formData, setFormData) => {
    setFormData({
        ...formData,
        skills: [...formData.skills, ''],
    });
};

export const addEducation = (formData, setFormData) => {
    setFormData({
        ...formData,
        education: [...formData.education, { degree: '', institution: '', startYear: '', endYear: '' }],
    });
};

export const addCertificate = (formData, setFormData) => {
    setFormData({
        ...formData,
        certificates: [...formData.certificates, ''],
    });
};

export const addLanguage = (formData, setFormData) => {
    setFormData({
        ...formData,
        languages: [...formData.languages, ''],
    });
};

export const handleAddExperience = (formData, setFormData) => {
    setFormData({
        ...formData,
        experience: [...formData.experience, { position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', internships: '' }],
    });
};

export const handleDelete = (index, field, formData, setFormData) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
        ...formData,
        [field]: newArray,
    });
};

export const handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log('Form submitted', formData);
};
