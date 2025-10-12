import React, { useState, useEffect } from 'react';
import './Auth.css';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(() => {
        try { return localStorage.getItem('profileImage') || null } catch { return null }
    });

    useEffect(() => {
        // nothing
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result);
            localStorage.setItem('profileImage', reader.result);
            // dispatch event so header can update
            window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profileImage: reader.result } }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Profile</h2>
                <label>Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {profileImage && <img src={profileImage} alt="profile preview" style={{width:96,height:96,borderRadius:12,marginTop:12}} />}
                <p style={{marginTop:12}}>Upload a picture to personalize your profile icon.</p>
            </div>
        </div>
    );
};

export default Profile;
