import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <div className="pictures">
                <img src="/path/to/first-pic.jpg" alt="First Picture" />
                <img src="/path/to/second-pic.jpg" alt="Second Picture" />
            </div>
            <div className="buttons">
                <Link to="/resume/1">
                    <button>First Resume</button>
                </Link>
                <Link to="/resume/2">
                    <button>Second Resume</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
