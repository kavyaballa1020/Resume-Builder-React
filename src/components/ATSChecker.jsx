import React, { useState, useEffect, useRef } from "react";
import './ATSChecker.css';

const ATSChecker = () => {
  console.log('ATSChecker component mounted');
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingJob, setIsRecordingJob] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en-US');
  const recognitionRef = useRef(null);

  // States for animated inspirational messages
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const messages = [
    { text: "Optimize your resume to beat ATS filters and reach human recruiters.", author: "Career Insight" },
    { text: "Keywords are key – match the job description to stand out.", author: "Job Strategy" },
    { text: "A perfect score means your resume is ready to impress.", author: "Success Tip" },
    { text: "Unlock your career potential with ATS-friendly formatting.", author: "Professional Advice" },
    { text: "Every word counts – craft your resume for success.", author: "Resume Wisdom" }
  ];

  const intervalRef = useRef(null);

  // Typewriter effect for messages
  useEffect(() => {
    const message = messages[currentMessageIndex];
    setDisplayedText('');
    setIsTyping(true);
    setIsFading(true); // Start fade in

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < message.text.length) {
        setDisplayedText(prev => prev + message.text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setIsFading(false); // End fade
      }
    }, 50); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex]);

  // Auto-rotate messages every 5 seconds, nonstop
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [messages.length]);

  // Show author after typing completes
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setShowAuthor(true);
      }, 300); // Delay for fade-in
      return () => clearTimeout(timer);
    } else {
      setShowAuthor(false);
    }
  }, [isTyping]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const getATSScore = (resumeText, jobDescription) => {
    const stopWords = ['the', 'and', 'for', 'with', 'you', 'your', 'are', 'that', 'this', 'will', 'have', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were'];
    if (!jobDescription || !jobDescription.toString().trim()) {
      return { score: 0, matchedKeywords: [], missingKeywords: [] };
    }

    // Extract unique words from job description, clean and filter
    const jdWords = [...new Set(
      jobDescription.toLowerCase()
        .match(/\b(\w+)\b/g) || []
        .map(word => word.replace(/[^\w]/g, ''))
        .filter(word => word.length > 3 && !stopWords.includes(word))
    )];

    // Extract unique words from resume
    const resumeWords = [...new Set(
      (resumeText || '').toLowerCase()
        .match(/\b(\w+)\b/g) || []
        .map(word => word.replace(/[^\w]/g, ''))
    )];

    const matchedKeywords = jdWords.filter(word => resumeWords.includes(word));
    const missingKeywords = jdWords.filter(word => !resumeWords.includes(word));

    const score = jdWords.length ? Math.round((matchedKeywords.length / jdWords.length) * 100) : 0;

    return { score, matchedKeywords, missingKeywords };
  };

  const handleCheck = () => {
    const analysis = getATSScore(resumeText, jobDesc);
    setResult(analysis);
  };

  const handleRecord = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported in this browser.');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setError(null);
      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setResumeText(prev => prev + transcript + ' ');
      };
      recognitionRef.current.onerror = (event) => {
        setError('Speech recognition error: ' + event.error);
        setIsRecording(false);
      };
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleRecordJob = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported in this browser.');
      return;
    }
    if (isRecordingJob) {
      recognitionRef.current.stop();
      setIsRecordingJob(false);
    } else {
      setError(null);
      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setJobDesc(prev => prev + transcript + ' ');
      };
      recognitionRef.current.onerror = (event) => {
        setError('Speech recognition error: ' + event.error);
        setIsRecordingJob(false);
      };
      recognitionRef.current.onend = () => {
        setIsRecordingJob(false);
      };
      recognitionRef.current.start();
      setIsRecordingJob(true);
    }
  };
  return (
    <div className="ats-checker-container">
      <h2>ATS Checker</h2>

      <div style={{marginBottom:10}}>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-US">English</option>
          <option value="id-ID">Indonesian</option>
        </select>
      </div>

      {/* Animated Inspirational Message */}
      <div
        className={`message-card ${isFading ? 'fade' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <blockquote className={`message-text ${isTyping ? 'typing' : ''}`}>
          "{displayedText}"
          {isTyping && <span className="cursor">|</span>}
        </blockquote>
        <cite className={`message-author ${showAuthor ? 'fade-in' : ''}`}>
          — {messages[currentMessageIndex].author}
        </cite>
      </div>

      <div style={{marginBottom:10}}>
        <button onClick={handleRecord} style={{backgroundColor: isRecording ? 'red' : 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 4}}>
          {isRecording ? 'Stop Recording' : '🎤 Record Resume'}
        </button>
        {error && <div style={{color:'red', marginTop:5}}>{error}</div>}
      </div>

      <textarea
        placeholder="Paste your RESUME here or use voice recording..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
      />

      <div style={{marginBottom:10}}>
        <button onClick={handleRecordJob} style={{backgroundColor: isRecordingJob ? 'red' : 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 4}}>
          {isRecordingJob ? 'Stop Recording' : '🎤 Record Job Description'}
        </button>
      </div>

      <textarea
        placeholder="Paste JOB DESCRIPTION here or use voice recording..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={8}
      />

      <button onClick={handleCheck}>Check ATS Score</button>

      {result && (
        <div className="ats-result">
          <h3>ATS Score: {result.score}%</h3>
          <p><strong>Matched Keywords:</strong> {result.matchedKeywords.join(", ")}</p>
          <p><strong>Missing Keywords:</strong> {result.missingKeywords.join(", ")}</p>
        </div>
      )}

      {/* small help text */}
      <div style={{marginTop:12,fontSize:13,color:'#555'}}>
        Tip: Use voice recording to input your resume and job description text automatically. Speech recognition is powered by the Web Speech API.
      </div>
    </div>
  );
};

export default ATSChecker;
