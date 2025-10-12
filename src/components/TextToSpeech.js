import React, { useState } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    React.useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [selectedVoice]);

    const handleSpeak = () => {
        if (text.trim() === '') return;

        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const handleVoiceChange = (e) => {
        const voice = voices.find(v => v.name === e.target.value);
        setSelectedVoice(voice);
    };

    return (
        <div className="tts-container">
            <h2>Text-to-Speech Generator</h2>
            <p>Enter text below and click "Speak" to hear it aloud. Perfect for practicing interviews or reviewing your resume content.</p>

            <div className="tts-input-section">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to speech..."
                    rows={6}
                    maxLength={2000}
                />
                <div className="char-count">{text.length}/2000</div>
            </div>

            <div className="tts-controls">
                <div className="voice-selector">
                    <label htmlFor="voice-select">Voice:</label>
                    <select
                        id="voice-select"
                        value={selectedVoice ? selectedVoice.name : ''}
                        onChange={handleVoiceChange}
                    >
                        {voices.map((voice, index) => (
                            <option key={index} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="tts-buttons">
                    <button
                        onClick={handleSpeak}
                        disabled={isSpeaking || text.trim() === ''}
                        className="speak-btn"
                    >
                        {isSpeaking ? '🔊 Speaking...' : '🔊 Speak'}
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isSpeaking}
                        className="stop-btn"
                    >
                        ⏹️ Stop
                    </button>
                </div>
            </div>

            <div className="tts-tips">
                <h3>Tips:</h3>
                <ul>
                    <li>Select different voices to find one that suits your needs</li>
                    <li>Use this to practice reading your resume aloud</li>
                    <li>Test how your cover letter sounds when spoken</li>
                    <li>Practice interview responses with confidence</li>
                </ul>
            </div>
        </div>
    );
};

export default TextToSpeech;
