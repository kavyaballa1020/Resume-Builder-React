import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation / fake auth
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        // Fake success - in real app call API
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />

                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                    {error && <div className="auth-error">{error}</div>}

                    <button className="auth-btn" type="submit">Login</button>
                </form>

                <p className="auth-switch">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;
