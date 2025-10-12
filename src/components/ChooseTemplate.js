import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
// use public assets for thumbnails (expected filenames in public/Assets)
const Resume1Image = '/Assets/classic.png';
const Resume2Image = '/Assets/modern.png';

const ChooseTemplate = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleChoose = (templateId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        // navigate to resume form for selected template
        if (templateId === 1) navigate('/resume/1');
        else if (templateId === 2) navigate('/resume/2');
    };

    return (
        <div style={{padding:40}}>
            <h2 style={{textAlign:'center',marginBottom:20}}>Choose a Template</h2>
            <div className="templates-row" style={{maxWidth:900,margin:'0 auto'}}>
                <div className="template-card" onClick={() => handleChoose(1)} role="button">
                    <div className="template-media">
                        <img src={Resume1Image} alt="Classic" className="template-thumb" onError={(e)=>{e.target.onerror=null; e.target.src='/Assets/resume-192x192.png'}} />
                        <div className="template-overlay">Classic</div>
                    </div>
                    <div className="template-foot">Classic Professional</div>
                </div>

                <div className="template-card" onClick={() => handleChoose(2)} role="button">
                    <div className="template-media">
                        <img src={Resume2Image} alt="Modern" className="template-thumb" onError={(e)=>{e.target.onerror=null; e.target.src='/Assets/resume-192x192.png'}} />
                        <div className="template-overlay">Modern</div>
                    </div>
                    <div className="template-foot">Modern Creative</div>
                </div>
            </div>
        </div>
    );
};

export default ChooseTemplate;
