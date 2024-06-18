import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Resume1Image from './Resume1.jpg';
import './Home.css'

const Home = () => {
    const [zoomedPicture, setZoomedPicture] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handlePictureClick = (picture) => {
        setZoomedPicture(picture);
    };

    const closeZoomedPicture = () => {
        setZoomedPicture(null);
    };

    const toggleTooltip = (event) => {
        setShowTooltip(!showTooltip);

        // Position the tooltip below the hovered picture
        if (tooltipRef.current) {
            tooltipRef.current.style.left = `${event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2}px`;
        }
    };

    return (
        <div className="home-page">
            <div className="pictures">
                <img
                    src={Resume1Image}
                    alt="First Picture"
                    onClick={() => handlePictureClick(Resume1Image)}
                    onMouseEnter={toggleTooltip}
                    onMouseLeave={toggleTooltip}
                />
                <img
                    src="/path/to/second-pic.jpg"
                    alt="Second Picture"
                    onClick={() => handlePictureClick('/path/to/second-pic.jpg')}
                    onMouseEnter={toggleTooltip}
                    onMouseLeave={toggleTooltip}
                />
                {showTooltip && (
                    <div className="tooltip" ref={tooltipRef}>
                        Click to zoom in
                    </div>
                )}
            </div>
            <div className="buttons">
                <Link to="/resume/1">
                    <button>First Resume</button>
                </Link>
                <Link to="/resume/2">
                    <button>Second Resume</button>
                </Link>
            </div>
            {zoomedPicture && (
                <div className="zoomed-picture" onClick={closeZoomedPicture}>
                    <img src={zoomedPicture} alt="Zoomed Picture" />
                </div>
            )}
        </div>
    );
};

export default Home;