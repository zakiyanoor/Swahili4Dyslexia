import React, { useState, useEffect, useContext } from 'react';
import '../styles/Settings.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';

function Settings({ setDyslexiaFont, setHighContrast }) {
  const { isAuth } = useAuth();
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaults = {
    dyslexiaFont: true,
    wordSpacing: true,
    highContrast: true,
    textSize: 16,
    textWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0.05,
    emailNotifications: true,
  };


  const [dyslexiaFont, setDyslexiaFontLocal]    = useState(defaults.dyslexiaFont);
  const [wordSpacing, setWordSpacing]           = useState(defaults.wordSpacing);
  const [highContrast, setHighContrastLocal]    = useState(defaults.highContrast);
  const [textSize, setTextSize]                 = useState(defaults.textSize);
  const [textWeight, setTextWeight]             = useState(defaults.textWeight);
  const [lineHeight, setLineHeight]             = useState(defaults.lineHeight);
  const [letterSpacing, setLetterSpacing]       = useState(defaults.letterSpacing);
  const [emailNotifications, setEmailNotifications] = useState(defaults.emailNotifications);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('settings')) || {};
    setDyslexiaFontLocal(saved.dyslexiaFont    ?? defaults.dyslexiaFont);
    setWordSpacing(saved.wordSpacing          ?? defaults.wordSpacing);
    setHighContrastLocal(saved.highContrast    ?? defaults.highContrast);
    setTextSize(saved.textSize                ?? defaults.textSize);
    setTextWeight(saved.textWeight            ?? defaults.textWeight);
    setLineHeight(saved.lineHeight            ?? defaults.lineHeight);
    setLetterSpacing(saved.letterSpacing      ?? defaults.letterSpacing);
    setEmailNotifications(saved.emailNotifications ?? defaults.emailNotifications);
  }, []);


  useEffect(() => {
    setDyslexiaFont?.(dyslexiaFont);
  }, [dyslexiaFont, setDyslexiaFont]);

  useEffect(() => {
    setHighContrast?.(highContrast);
  }, [highContrast, setHighContrast]);

  const handleSave = () => {
    const settings = { dyslexiaFont, wordSpacing, highContrast, textSize, textWeight, lineHeight, letterSpacing, emailNotifications };
    localStorage.setItem('settings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    try {
      await axios.delete('http://localhost:5000/api/user', { withCredentials: true });
     
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      setIsAuth(false);
      navigate('/signin');
    } catch (err) {
      console.error(err);
      alert('Failed to delete account.');
    }
  };

  const renderSwitch = (id, label, checked, toggleFn) => (
    <div className="toggle-switch">
      <label htmlFor={id} className="toggle-label">{label}</label>
      <div className="toggle-container">
        <input id={id} type="checkbox" role="switch" aria-checked={checked} checked={checked} onChange={toggleFn} />
        <label className="toggle-slider" htmlFor={id} />
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      {/* Typography & Dyslexia */}
      <fieldset className="settings-section" aria-labelledby="typo-legend">
        <legend id="typo-legend" className="settings-subtitle">Typography & Dyslexia Support</legend>
        {renderSwitch('dyslexia-font-toggle','Dyslexia-Friendly Font', dyslexiaFont, () => setDyslexiaFontLocal(!dyslexiaFont))}
        {renderSwitch('word-spacing-toggle','Increased Word Spacing', wordSpacing, () => setWordSpacing(!wordSpacing))}
        {renderSwitch('high-contrast-toggle','High Contrast Mode', highContrast, () => setHighContrastLocal(!highContrast))}

        {/* Text Size */}
        <div className="slider-container">
          <div className="slider-label"><span>Text Size</span><span>{textSize}px</span></div>
          <input id="text-size-slider" type="range" min="12" max="24" step="1" value={textSize} className="slider" onChange={e => setTextSize(Number(e.target.value))} />
        </div>

        {/* Text Weight */}
        <div className="slider-container">
          <div className="slider-label"><span>Text Weight</span><span>{textWeight}</span></div>
          <input id="text-weight-slider" type="range" min="400" max="900" step="100" value={textWeight} className="slider" onChange={e => setTextWeight(Number(e.target.value))} />
        </div>

        {/* Line Height */}
        <div className="slider-container">
          <div className="slider-label"><span>Line Height</span><span>{lineHeight.toFixed(1)}</span></div>
          <input id="line-height-slider" type="range" min="1.2" max="2.0" step="0.1" value={lineHeight} className="slider" onChange={e => setLineHeight(parseFloat(e.target.value))} />
        </div>

        {/* Letter Spacing */}
        <div className="slider-container">
          <div className="slider-label"><span>Letter Spacing</span><span>{letterSpacing.toFixed(2)}em</span></div>
          <input id="letter-spacing-slider" type="range" min="0" max="0.3" step="0.02" value={letterSpacing} className="slider" onChange={e => setLetterSpacing(parseFloat(e.target.value))} />
        </div>
      </fieldset>

      {/* Notifications */}
      <fieldset className="settings-section" aria-labelledby="notify-legend">
        <legend id="notify-legend" className="settings-subtitle">Notifications</legend>
        {renderSwitch('email-notifications-toggle','Email Notifications', emailNotifications, () => setEmailNotifications(!emailNotifications))}
      </fieldset>

      {/* Privacy & Security */}
      <fieldset className="settings-section" aria-labelledby="privacy-legend">
        <legend id="privacy-legend" className="settings-subtitle">Privacy & Security</legend>
        <Link to="/terms" className="primary-button settings-button">Terms of Service</Link>
        <Link to="/privacy" className="primary-button settings-button">Privacy Policy</Link>
        {isAuth && (
          <button className="danger-button settings-button" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        )}
      </fieldset>

      <button className="save-changes" onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default Settings;
