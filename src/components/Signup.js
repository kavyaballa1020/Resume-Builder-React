import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Signup = ({ setIsAuthenticated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        // Fake register flow
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        // save name and avatar
        localStorage.setItem('profileName', name);
        if (avatar) {
            localStorage.setItem('profileImage', avatar);
            // dispatch update so header updates immediately
            window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profileImage: avatar, profileName: name } }));
        } else {
            // still dispatch name update
            window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { profileImage: null, profileName: name } }));
        }
        navigate('/');
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <label>Profile Photo (optional)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {avatar && <img src={avatar} alt="avatar preview" style={{width:72,height:72,borderRadius:12,marginTop:8}} />}
                    <label>Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />

                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />

                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                    {error && <div className="auth-error">{error}</div>}

                    <button className="auth-btn" type="submit">Sign Up</button>
                </form>

                <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
