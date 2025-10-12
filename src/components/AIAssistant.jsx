import React, { useState } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateResponse = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_API_KEY_HERE'; // Replace with your actual API key or set in .env

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate response. Check your API key.');
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text || 'No response generated.';
      setOutput(generatedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "Help me write a professional summary for my resume.",
    "Suggest keywords for a software developer job description.",
    "How to describe my experience in project management?",
    "Generate a cover letter introduction."
  ];

  return (
    <div className="ai-assistant-container">
      <h2>AI Assistant</h2>
      <p>Get help with wording, job descriptions, resumes, and more using AI.</p>

      <div className="examples">
        <h3>Examples:</h3>
        <ul>
          {examples.map((ex, index) => (
            <li key={index} onClick={() => setPrompt(ex)} style={{cursor: 'pointer', color: 'blue'}}>{ex}</li>
          ))}
        </ul>
      </div>

      <textarea
        placeholder="Enter your prompt here... e.g., Help me write a job description for a marketing manager."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
      />

      <button onClick={generateResponse} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Response'}
      </button>

      {error && <div className="error">{error}</div>}

      {output && (
        <div className="output">
          <h3>AI Response:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
