

import React, { useEffect, useState } from "react";
import "../styles/Alphabet.css";

function Alphabet() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
  
    function fetchCategory(category) {
      return fetch(`http://127.0.0.1:5000/api/lessons/${category}`)
        .then((res) => res.json())
        .catch((err) => {
          console.error(`Error fetching ${category}:`, err);
          return []; 
        });
    }

    Promise.all([fetchCategory("Vowels"), fetchCategory("Alphabets")])
      .then(([vowels, alphabets]) => {
        const combined = [...vowels, ...alphabets].sort((a, b) =>
  a.content.localeCompare(b.content, 'en', { sensitivity: 'base' })
);

        setLetters(combined);
      });
  }, []);

  return (
    <div className="alphabet-page">
      <h1 className="title">Swahili Alphabet</h1>
      <div className="letters-grid">
        {letters.map((letter) => (
          <div className="letter-card" key={letter.id}>
            <h2>{letter.content}</h2>
            <img src={letter.image_url} alt={letter.example_word} />
            <p>{letter.example_word}</p>
            <p className="syllables">{letter.syllables}</p>
            <audio controls src={`http://127.0.0.1:5000/api/${letter.audio_url}`}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alphabet;

