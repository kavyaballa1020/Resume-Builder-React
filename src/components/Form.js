import React, { useEffect, useRef, useState } from 'react';
import './Form.css';

const Form = ({
    formData,
    handleChange,
    handleArrayChange,
    addSkill,
    addSkillWithValue,
    addLanguageWithValue,
    addCertificateWithValue,
    addEducation,
    addCertificate,
    addLanguage,
    handleAddExperience,
    handleNestedArrayChange,
    handleSubmit,
    handleDelete,
    setCertificatesFromText,
    setLanguagesFromText
}) => {
    const skillRefs = useRef([]);
    const [showCertificatesBox, setShowCertificatesBox] = useState(false);
    const certTextRef = useRef(null);
    const [selectedSkill, setSelectedSkill] = useState('JavaScript');
    const otherSkillRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const otherLanguageRef = useRef(null);

    // When a new skill is added, focus the last skill input
    useEffect(() => {
        if (skillRefs.current && skillRefs.current.length > 0) {
            const idx = formData.skills.length - 1;
            const el = skillRefs.current[idx];
            if (el) el.focus();
        }
    }, [formData.skills.length]);

    // focus certificate textarea when shown
    useEffect(() => {
        if (showCertificatesBox && certTextRef.current) {
            certTextRef.current.focus();
        }
    }, [showCertificatesBox]);

    // ...existing code...

    // Listen for external focus events (dispatched from Resume preview)
    useEffect(() => {
        const handler = (e) => {
            const idx = e?.detail;
            if (typeof idx === 'number' && skillRefs.current[idx]) {
                skillRefs.current[idx].focus();
                // Optionally scroll into view
                skillRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
        window.addEventListener('focusSkill', handler);
        return () => window.removeEventListener('focusSkill', handler);
    }, []);
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2><i className="fas fa-user"></i> Personal Info</h2>
            <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <h2><i className="fas fa-address-book"></i> Contact Info</h2>
            <input
                className="form-input"
                type="text"
                name="contact.phone"
                placeholder=" Phone"
                value={formData.contact.phone}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="email"
                name="contact.email"
                placeholder="Email"
                value={formData.contact.email}
                onChange={handleChange}
                required
            />
            <input
                className="form-input"
                type="text"
                name="contact.linkedin"
                placeholder=" LinkedIn Profile URL"
                value={formData.contact.linkedin}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.github"
                placeholder=" GitHub Profile URL"
                value={formData.contact.github}
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="contact.address"
                placeholder=" Address"
                value={formData.contact.address}
                onChange={handleChange}
            />

            <h2><i className="fas fa-user-tie"></i> Profile</h2>
            <select
                className="form-input"
                name="profile"
                onChange={handleChange}
                value={formData.profile}
                required
            >
                <option value="">Select Profile</option>
                <option value="fullStack">Full Stack Developer</option>
                <option value="software">Software Developer</option>
                <option value="mernStack">MERN Stack Developer</option>
                <option value="appDeveloper">App Developer</option>
                <option value="frontEnd">Front End Developer</option>
            </select>
            <textarea
                className="form-input textarea"
                name="profileText"
                placeholder="Profile"
                value={formData.profileText}
                onChange={handleChange}
            />

<h2><i className="fas fa-cogs"></i> Skills</h2>
            {formData.skills.map((skill, index) => (
                <div key={index} className="form-group">
                    <input
                        ref={el => skillRefs.current[index] = el}
                        className="form-input"
                        type="text"
                        placeholder="Skill"
                        value={skill}  // Directly render the string value
                        onChange={(e) => handleArrayChange(e, index, 'skills')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'skills')}>
                        Delete
                    </button>
                </div>
            ))}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="skill-select" style={{ fontWeight: 600 }}>Choose skill</label>
                <select id="skill-select" className="form-input" value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                    {/* Large set of common job skills */}
                    <option>JavaScript</option>
                    <option>React</option>
                    <option>Node.js</option>
                    <option>TypeScript</option>
                    <option>Python</option>
                    <option>Java</option>
                    <option>SQL</option>
                    <option>NoSQL</option>
                    <option>MongoDB</option>
                    <option>PostgreSQL</option>
                    <option>AWS</option>
                    <option>Azure</option>
                    <option>Docker</option>
                    <option>Kubernetes</option>
                    <option>Git</option>
                    <option>Jest</option>
                    <option>Testing</option>
                    <option>UI/UX</option>
                    <option>Design</option>
                    <option>CSS</option>
                    <option>HTML</option>
                    <option>Redux</option>
                    <option>Next.js</option>
                    <option>GraphQL</option>
                    <option>REST API</option>
                    <option>Data Analysis</option>
                    <option>Machine Learning</option>
                    <option>DevOps</option>
                    <option>Mobile Development</option>
                    <option>Android</option>
                    <option>iOS</option>
                    <option>Flutter</option>
                </select>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button type="button" className="add-button" onClick={() => addSkillWithValue(selectedSkill)}>Add Skill</button>
                    <input ref={otherSkillRef} className="form-input" placeholder="Other skill (type here)" onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const v = e.target.value && e.target.value.trim();
                            if (v) { addSkillWithValue(v); e.target.value = ''; }
                        }
                    }} />
                    <button type="button" className="add-inline-button" onClick={() => {
                        const el = otherSkillRef.current;
                        const v = el && el.value && el.value.trim();
                        if (v) { addSkillWithValue(v); el.value = ''; el.focus(); }
                    }}>Add</button>
                </div>
            </div>
            <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleNestedArrayChange(e, index, 'degree', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => handleNestedArrayChange(e, index, 'institution', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Start Year"
                        value={edu.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'education')}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="End Year"
                        value={edu.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'education')}
                        required
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'education')}>
                        Delete
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>
                Add Education
            </button>
            
            <h2><i className="fas fa-briefcase"></i> Experience</h2>
            {formData.experience.map((exp, index) => (
                <div key={index} className="nested-form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => handleNestedArrayChange(e, index, 'position', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleNestedArrayChange(e, index, 'company', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Start Month"
                        value={exp.startMonth}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startMonth', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Start Year"
                        value={exp.startYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'startYear', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="End Month"
                        value={exp.endMonth}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endMonth', 'experience')}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="End Year"
                        value={exp.endYear}
                        onChange={(e) => handleNestedArrayChange(e, index, 'endYear', 'experience')}
                    />
                    <textarea
                        className="form-input textarea"
                        placeholder="Explain briefly about your experience and projects and languages used"
                        value={exp.internships}
                        onChange={(e) => handleNestedArrayChange(e, index, 'internships', 'experience')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'experience')}>
                        Delete
                    </button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddExperience}>
                Add Experience
            </button>

            <h2><i className="fas fa-award"></i> Certificates</h2>
            {/* Bulk textarea for certificates (one per line) */}
            <textarea
                className="form-input textarea"
                placeholder="Enter certificates, one per line"
                value={(formData.certificates || []).join('\n')}
                onChange={(e) => setCertificatesFromText && setCertificatesFromText(e.target.value)}
            />

            {/* Individual certificate items (still editable) */}
            {formData.certificates.map((certificate, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Certificate"
                        value={certificate}
                        onChange={(e) => handleArrayChange(e, index, 'certificates')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'certificates')}>
                        Delete
                    </button>
                </div>
            ))}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input id="certificate-input" className="form-input" placeholder="Type certificate name (manual)" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const el = e.target;
                        if (el && el.value) {
                            addCertificateWithValue(el.value.trim());
                            el.value = '';
                            el.focus();
                        } else {
                            // show bulk input if nothing typed
                            setShowCertificatesBox(true);
                        }
                    }
                }} />
                <button type="button" className="add-inline-button" style={{ padding: '8px 10px' }} onClick={() => {
                    const el = document.getElementById('certificate-input');
                    if (el && el.value) {
                        addCertificateWithValue(el.value.trim());
                        el.value = '';
                        el.focus();
                    } else {
                        setShowCertificatesBox(true);
                        if (certTextRef.current) certTextRef.current.focus();
                    }
                }}>Add</button>
                <button type="button" className="add-button" onClick={() => {
                    // main add should reveal the chatbox (bulk textarea)
                    setShowCertificatesBox(true);
                    if (certTextRef.current) certTextRef.current.focus();
                }}>
                    Add Certificate
                </button>
                {showCertificatesBox && (
                    <button type="button" className="add-button" style={{ marginLeft: 8 }} onClick={() => setShowCertificatesBox(false)}>Close</button>
                )}
            </div>

            <h2><i className="fas fa-globe-americas"></i> Languages</h2>
            {/* Languages: select + add (no inline plus) */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="language-select" style={{ fontWeight: 600 }}>Choose language</label>
                <select id="language-select" className="form-input" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                    <option>English</option>
                    <option>Indonesian</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Mandarin</option>
                    <option>Arabic</option>
                    <option>Hindi</option>
                    <option>Portuguese</option>
                    <option>Russian</option>
                    <option>German</option>
                </select>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button type="button" className="add-button" onClick={() => addLanguageWithValue(selectedLanguage)}>Add Language</button>
                    <input ref={otherLanguageRef} className="form-input" placeholder="Other language (type here)" onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const v = e.target.value && e.target.value.trim();
                            if (v) { addLanguageWithValue(v); e.target.value = ''; }
                        }
                    }} />
                    <button type="button" className="add-button" onClick={() => {
                        const el = otherLanguageRef.current;
                        const v = el && el.value && el.value.trim();
                        if (v) { addLanguageWithValue(v); el.value = ''; el.focus(); }
                    }}>Add</button>
                </div>
            </div>

            {/* Individual language items (still editable) */}
            {formData.languages.map((lang, index) => (
                <div key={index} className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Language"
                        value={lang}  // Directly render the string value
                        onChange={(e) => handleArrayChange(e, index, 'languages')}
                    />
                    <button type="button" className="delete-button" onClick={() => handleDelete(index, 'languages')}>
                        Delete
                    </button>
                </div>
            ))}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* removed old inline language input */}
            </div>

           
        </form>
    );
};

export default Form;
