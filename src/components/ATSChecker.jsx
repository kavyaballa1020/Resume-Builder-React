import React, { useState } from "react";
import './ATSChecker.css'; 

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const getATSScore = (resumeText, jobDescription) => {
    const stopWords = ['the', 'and', 'for', 'with', 'you', 'your', 'are', 'that', 'this'];

    const jdWords = jobDescription
      .toLowerCase()
      .match(/\b(\w+)\b/g)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    const resumeWords = resumeText.toLowerCase();

    let matchedKeywords = [];
    let missingKeywords = [];

    jdWords.forEach(word => {
      if (resumeWords.includes(word)) {
        matchedKeywords.push(word);
      } else {
        missingKeywords.push(word);
      }
    });

    const score = Math.round((matchedKeywords.length / jdWords.length) * 100);

    return { score, matchedKeywords, missingKeywords };
  };

  const handleCheck = () => {
    const analysis = getATSScore(resumeText, jobDesc);
    setResult(analysis);
  };

  return (
    <div className="ats-checker-container">
      <h2>ATS Checker</h2>

      <textarea
        placeholder="Paste your RESUME here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
      />

      <textarea
        placeholder="Paste JOB DESCRIPTION here..."
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
    </div>
  );
};

export default ATSChecker;
