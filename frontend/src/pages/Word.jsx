import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Word.css";

function Word() {
    const [words, setWords] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/lessons/words/all")
            .then((res) => res.json())
            .then((data) => {
                // Remove "Basic" and "Sentences" from the dataset
                const filteredData = {};
                Object.entries(data).forEach(([category, items]) => {
                    if (category.toLowerCase() !== "basic" && category.toLowerCase() !== "sentences") {
                        filteredData[category] = items;
                    }
                });

                setWords(filteredData);

                const categories = Object.keys(filteredData);
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

    const categoryList = Object.keys(words);

    useEffect(() => {
        if (!selectedCategory && categoryList.length > 0) {
            setSelectedCategory(categoryList[0]);
        }
    }, [categoryList, selectedCategory]);

    if (loading) return <p>Loading...</p>;
    if (!Object.keys(words).length) return <p>No words found.</p>;

    async function handleAudioPlay(wordId) {
        const audio = new Audio(`http://localhost:5000/api/lesson/audio/${wordId}`);
        audio.play().catch((err) => console.error("Error playing audio:", err));

        const res = await fetch("http://localhost:5000/api/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lesson_id: wordId, user_id: user.user_id }),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to update progress");
        }

        console.log("Progress updated successfully");
    }

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
                            style={{ cursor: "pointer" }}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="main-content">
                <h2>{selectedCategory}</h2>
                <div className="words-grid">
                    {selectedCategory &&
                        words[selectedCategory]?.map((word) => (
                            <div className="word-card" key={word.id}>
                                <img
                                    src={`http://localhost:5000/static/images/${word.image_url}`}
                                    alt={word.content}
                                    className="word-image"
                                    onError={(e) => {
                                        if (e.target.src.endsWith(".jpg")) {
                                            e.target.src = e.target.src.replace(".jpg", ".jpeg");
                                        } else if (e.target.src.endsWith(".jpeg")) {
                                            e.target.src = e.target.src.replace(".jpeg", ".png");
                                        } else {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "http://localhost:5000/static/images/placeholder.jpeg";
                                        }
                                    }}
                                />
                                <div className="word-content">
                                    <div className="word-title">{word.content}</div>
                                    <button className="audio-button" onClick={() => handleAudioPlay(word.id)}>
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
