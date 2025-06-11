import React, { useState, useEffect } from 'react';
import '../styles/Alphabet.css';

function Alphabet() {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [audioCache, setAudioCache] = useState({});

    useEffect(() => {
        fetchLetters();
    }, []);

    const fetchLetters = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/lessons/alphabet');
            if (!response.ok) {
                throw new Error('Failed to fetch letters');
            }
            const data = await response.json();
            console.log('Fetched data:', data); // Debug log
            setLetters(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching letters:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    const playAudio = async (letterId) => {
        try {
            const audioUrl = `http://localhost:5000/api/lesson/audio/${letterId}`;
            if (!audioCache[audioUrl]) {
                const response = await fetch(audioUrl);
                if (!response.ok) throw new Error('Failed to fetch audio');
                const blob = await response.blob();
                const audio = new Audio(URL.createObjectURL(blob));
                setAudioCache(prev => ({ ...prev, [audioUrl]: audio }));
                await audio.play();
            } else {
                await audioCache[audioUrl].play();
            }
        } catch (err) {
            console.error('Error playing audio:', err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    // Separate vowels and consonants
    const vowels = letters.filter(letter => letter.category === 'Vowels');
    const consonants = letters.filter(letter => letter.category === 'Alphabets');

    return (
        <div className="alphabet-page">
            <h1 className="title">Swahili Alphabet</h1>
            
            {/* Vowels Section */}
            <div className="section">
                <h2 className="section-title">Vowels (Irabu)</h2>
                <div className="letters-grid">
                    {vowels.map((letter) => (
                        <div key={letter.id} className="letter-card">
                            <div className="letter">{letter.content}</div>
                            {letter.image_url && (
                                <img 
                                    src={letter.image_url} 
                                    alt={letter.content} 
                                    className="letter-image"
                                />
                            )}
                            <div className="example-word">{letter.title}</div>
                            <button 
                                className="audio-button"
                                onClick={() => playAudio(letter.id)}
                            >
                                🔊
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Consonants Section */}
            <div className="section">
                <h2 className="section-title">Consonants (Herufi)</h2>
                <div className="letters-grid">
                    {consonants.map((letter) => (
                        <div key={letter.id} className="letter-card">
                            <div className="letter">{letter.content}</div>
                            {letter.image_url && (
                                <img 
                                    src={letter.image_url} 
                                    alt={letter.content} 
                                    className="letter-image"
                                />
                            )}
                            <div className="example-word">{letter.title}</div>
                            <button 
                                className="audio-button"
                                onClick={() => playAudio(letter.id)}
                            >
                                🔊
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Alphabet;
