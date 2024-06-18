import React from 'react';
import './Preloader.css';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="spinner"></div>
            <div className="welcome-text">
                <h1>👋 Welcome to my Resume Builder webpage! 🚀</h1>
                <h3>Let's create something amazing together! 🌟</h3>
                <p>Loading... Please wait ⏳</p>
            </div>
        </div>
    );
};

export default Preloader;
