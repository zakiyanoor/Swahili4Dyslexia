import React, { useState } from 'react';
import '../styles/Settings.css';
import { Link } from 'react-router-dom';
import { useFontSize } from '../context/FontSizeContext';

function Settings() {
    const [ttsEnabled, setTtsEnabled] = useState(true);
    const [ttsSpeed, setTtsSpeed] = useState(50);
    const [dyslexiaFont, setDyslexiaFont] = useState(true);
    const { fontSize, changeFontSize } = useFontSize();
    const [highContrast, setHighContrast] = useState(true);
    const [audioFeedback, setAudioFeedback] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [wordSpacing, setWordSpacing] = useState(true);
    const [lineGuides, setLineGuides] = useState(true);

    const fontSizes = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
    ];

    const handleFontSizeChange = (size) => {
        changeFontSize(size);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Add delete account logic here
            console.log('Delete account confirmed');
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-section">
                <h2 className="settings-subtitle">Text-to-Speech</h2>
                <div className="toggle-switch">
                    <label htmlFor="tts-toggle" className="toggle-label">Text-to-Speech</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={ttsEnabled}
                            onChange={() => setTtsEnabled(!ttsEnabled)}
                            id="tts-toggle"
                        />
                        <label className="toggle-slider" htmlFor="tts-toggle"></label>
                    </div>
                </div>
                <div className="slider-container">
                    <div className="slider-label">
                        <span>Speed</span>
                        <span>{ttsSpeed}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={ttsSpeed}
                        className="slider"
                        onChange={(e) => setTtsSpeed(e.target.value)}
                    />
                </div>
            </div>

            <div className="settings-section">
                <h2 className="settings-subtitle">Dyslexia Support</h2>
                <div className="toggle-switch">
                    <label htmlFor="dyslexia-font-toggle" className="toggle-label">Dyslexia-Friendly Font</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={dyslexiaFont}
                            onChange={() => setDyslexiaFont(!dyslexiaFont)}
                            id="dyslexia-font-toggle"
                        />
                        <label className="toggle-slider" htmlFor="dyslexia-font-toggle"></label>
                    </div>
                </div>
                <div className="font-size-selector">
                    <div className={`font-size-option ${fontSize === 'small' ? 'selected' : ''}`} onClick={() => handleFontSizeChange('small')}>
                        <span>Small Text</span>
                        <span className="example-text">Sample Text</span>
                    </div>
                    <div className={`font-size-option ${fontSize === 'medium' ? 'selected' : ''}`} onClick={() => handleFontSizeChange('medium')}>
                        <span>Medium Text</span>
                        <span className="example-text">Sample Text</span>
                    </div>
                    <div className={`font-size-option ${fontSize === 'large' ? 'selected' : ''}`} onClick={() => handleFontSizeChange('large')}>
                        <span>Large Text</span>
                        <span className="example-text">Sample Text</span>
                    </div>
                </div>
                <div className="toggle-switch">
                    <label htmlFor="high-contrast-toggle" className="toggle-label">High Contrast Mode</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={highContrast}
                            onChange={() => setHighContrast(!highContrast)}
                            id="high-contrast-toggle"
                        />
                        <label className="toggle-slider" htmlFor="high-contrast-toggle"></label>
                    </div>
                </div>
                <div className="toggle-switch">
                    <label htmlFor="audio-feedback-toggle" className="toggle-label">Word-by-Word Audio</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={audioFeedback}
                            onChange={() => setAudioFeedback(!audioFeedback)}
                            id="audio-feedback-toggle"
                        />
                        <label className="toggle-slider" htmlFor="audio-feedback-toggle"></label>
                    </div>
                </div>
                <div className="toggle-switch">
                    <label htmlFor="word-spacing-toggle" className="toggle-label">Increased Word Spacing</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={wordSpacing}
                            onChange={() => setWordSpacing(!wordSpacing)}
                            id="word-spacing-toggle"
                        />
                        <label className="toggle-slider" htmlFor="word-spacing-toggle"></label>
                    </div>
                </div>
                <div className="toggle-switch">
                    <label htmlFor="line-guides-toggle" className="toggle-label">Reading Line Guides</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={lineGuides}
                            onChange={() => setLineGuides(!lineGuides)}
                            id="line-guides-toggle"
                        />
                        <label className="toggle-slider" htmlFor="line-guides-toggle"></label>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2 className="settings-subtitle">Privacy & Security</h2>
                <div className="settings-button">
                    <a href="#" className="primary-button">Terms of Service</a>
                </div>
                <div className="settings-button">
                    <a href="#" className="primary-button">Privacy Policy</a>
                </div>
                <button 
                    className="danger-button"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </button>
            </div>

            <div className="settings-section">
                <h2 className="settings-subtitle">Notifications</h2>
                <div className="toggle-switch">
                    <label htmlFor="email-notifications-toggle" className="toggle-label">Email Notifications</label>
                    <div className="toggle-container">
                        <input 
                            type="checkbox" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            id="email-notifications-toggle"
                        />
                        <label className="toggle-slider" htmlFor="email-notifications-toggle"></label>
                    </div>
                </div>
            </div>

            <button className="save-changes">Save Changes</button>
        </div>
    );
}

export default Settings;
