import React from 'react';
import './Preloader.css';
import KavyaImage from './Kavya.JPG';  // Adjust the path as necessary

const Preloader = () => {
    return (
        <div className="preloader">
            <h1 className="brand-name"><i className="fas fa-fire"></i> Kavya-Resume-Builder</h1>
            <div className="spinner"></div>
            <div className="welcome-text">
                <h1>👋 Welcome to My Resume Builder webpage! 🚀</h1>
                <h3 className='preloaderh3'>Let's create something amazing together! 🌟</h3>
            </div>
            <img src={KavyaImage} alt="Kavya" className="preloader-image" />
        </div>
    );
};

export default Preloader;
