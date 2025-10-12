import React from 'react';
import './VideoTutorials.css'; // We'll create this CSS file

const VideoTutorials = () => {
    // Local video tutorials from public/videos/ folder
    const videos = [
        {
            title: 'What is a resume?',
            type: 'local',
            url: '/videos/What is a resume_.mp4',
            description: 'Learn the fundamentals of what a resume is and its purpose in job applications.'
        },
        {
            title: 'How to create an effective resume',
            type: 'local',
            url: '/videos/How to create an effective resume.mp4',
            description: 'Step-by-step guide to building a professional and impactful resume.'
        },
        {
            title: 'The importance of a good resume for job applications',
            type: 'local',
            url: '/videos/The importance of a good resume for job applications.mp4',
            description: 'Understand why a strong resume is crucial for getting noticed by employers.'
        },
        {
            title: 'Explaining the concept and purpose of a CV (Curriculum Vitae)',
            type: 'local',
            url: '/videos/Explaining the concept and purpose of a CV (Curriculum Vitae).mp4',
            description: 'Discover what a CV is, how it differs from a resume, and when to use it.'
        },
        {
            title: 'How to create a good CV',
            type: 'local',
            url: '/videos/How to create a good CV.mp4',
            description: 'Practical tips for crafting a comprehensive and effective CV.'
        },
        {
            title: 'The importance of a professional and clean CV design',
            type: 'local',
            url: '/videos/The importance of a professional and clean CV design.mp4',
            description: 'Learn how design impacts the effectiveness of your CV and best practices for layout.'
        },
        {
            title: 'Explaining what a personal statement is',
            type: 'local',
            url: '/videos/Explaining what a personal statement is.mp4',
            description: 'Get an overview of personal statements and their role in applications.'
        },
        {
            title: 'How to write a compelling personal statement',
            type: 'local',
            url: '/videos/How to write a compelling personal statement.mp4',
            description: 'Tips and techniques for creating a personal statement that stands out.'
        },
        {
            title: 'The importance of a personal statement in applications',
            type: 'local',
            url: '/videos/The importance of a personal statement in applications.mp4',
            description: 'Explore why personal statements are essential and how they influence decisions.'
        },
        {
            title: 'Explaining the purpose and structure of a cover letter',
            type: 'local',
            url: '/videos/Explaining the purpose and structure of a cover letter.mp4',
            description: 'Understand the key components and objectives of an effective cover letter.'
        },
        {
            title: 'The importance of a cover letter in job applications',
            type: 'local',
            url: '/videos/The importance of a cover letter in job applications..mp4',
            description: 'Discover how cover letters complement your resume and boost your applications.'
        },
        {
            title: 'How to write a compelling cover letter',
            type: 'local',
            url: '/videos/How to write a compelling cover letter.mp4',
            description: 'Step-by-step guidance on writing cover letters that capture attention.'
        }
    ];

    const renderVideo = (video) => {
        if (video.type === 'youtube') {
            return (
                <iframe
                    width="100%"
                    height="315"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        } else if (video.type === 'local') {
            return (
                <video
                    width="100%"
                    height="315"
                    controls
                    preload="metadata"
                >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }
        return null;
    };

    return (
        <div className="video-tutorials">
            <header className="tutorials-header">
                <h1>Video Tutorials</h1>
                <p>Watch our tutorials to master resume building and job searching.</p>
            </header>
            <div className="videos-grid">
                {videos.map((video, index) => (
                    <div key={index} className="video-card">
                        <h3>{video.title}</h3>
                        {renderVideo(video)}
                        <p>{video.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoTutorials;
