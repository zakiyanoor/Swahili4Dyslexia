import React, { useEffect, useState } from "react"
import "../styles/Word.css";

function Word() {
    const [words, setWords] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/lessons/words/all")
            .then((res) => res.json())
            .then((data) => {
                setWords(data);
                // Filter out "Basic" category and set the first available category as selected
                const categories = Object.keys(data).filter(category => category !== "Basic");
                if (categories.length > 0) {
                    setSelectedCategory(categories[0]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch words:", err);
                setLoading(false);
            });
    }, []);

    // Filter out "Basic" category from the list
    const categoryList = Object.keys(words).filter(category => category !== "Basic");

    // If no category is selected, default to the first non-Basic category
    useEffect(() => {
        if (!selectedCategory && categoryList.length > 0) {
            setSelectedCategory(categoryList[0]);
        }
    }, [categoryList, selectedCategory]);

    if (loading) return <p>Loading....</p>;
    if (!Object.keys(words).length) return <p>No words found.</p>;

    return (
        <div className="word-page">
            {/* Left Sidebar */}
            <div className="categories-sidebar">
                <h2>Categories</h2>
                <ul>
                    {categoryList.map((category) => (
                        <li
                            key={category}
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => setSelectedCategory(category)}
                            style={{ cursor: 'pointer' }}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                <h2>{selectedCategory}</h2>
                <div className="words-grid">
                    {selectedCategory && words[selectedCategory] &&
                        words[selectedCategory].map((word) => (
                            <div className="word-card" key={word.id}>
                                <img
                                    src={word.image_url}
                                    alt={word.content}
                                    className="word-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/static/images/placeholder.jpeg";
                                    }}
                                />
                                <div className="word-content">
                                    <div className="word-title">{word.content}</div>
                                    <button
                                        className="audio-button"
                                        onClick={() => new Audio(`http://localhost:5000/api/lesson/audio/${word.id}`).play()}
                                    >
                                        🔊
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Word;