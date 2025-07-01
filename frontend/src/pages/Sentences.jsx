import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Sentences.css';

const Sentences = () => {
    const [sentences, setSentences] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchSentences = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/lessons/Sentences');
                const data = await response.json();
                setSentences({ 'Basic': data });
                setSelectedCategory('Basic');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sentences:', error);
                setLoading(false);
            }
        };

        fetchSentences();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleAudioClick = async (sentenceId) => {
        try {
            const audio = new Audio(`http://localhost:5000/api/lesson/audio/${sentenceId}`);
            await audio.play();

            const res = await fetch('http://localhost:5000/api/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify({ lesson_id: sentenceId, user_id: user.user_id }),
                credentials: 'include',
            });
            if (!res.ok) {
                throw new Error('Failed to update progress');
            }
            console.log('Progress updated successfully')
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    if (loading) {
        return <div className="sentences-page">Loading...</div>;
    }

    return (
        <div className="sentences-page">
            <div className="sentences-sidebar">
                <h2>Categories</h2>
                <ul>
                    {Object.keys(sentences).map((category) => (
                        <li
                            key={category}
                            className={selectedCategory === category ? 'active' : ''}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main-content">
                <h2>{selectedCategory} Sentences</h2>
                {selectedCategory && sentences[selectedCategory] ? (
                    <div className="sentences-grid">
                        {sentences[selectedCategory].map((sentence) => (
                            <div key={sentence.id} className="sentence-card">
                                <div className="sentence-content">
                                    <div className="english-text">{sentence.title}</div>
                                    <div className="swahili-text">{sentence.content}</div>
                                </div>
                                <button
                                    className="audio-button"
                                    onClick={() => handleAudioClick(sentence.id)}
                                >
                                    🔊
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No sentences found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Sentences; 