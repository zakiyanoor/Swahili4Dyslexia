import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/StartLearning.css";

import alphabetImg from '../assets/alphabet.jpg';
import wordsImg from '../assets/words.jpg';
import sentencesImg from '../assets/sentences.jpg';
import gamesImg from '../assets/games.jpg';

const categories = [
  { title: 'ALPHABETS', image: alphabetImg, path: '/lesson/Alphabet' },
  { title: 'WORDS', image: wordsImg, path: '/lesson/words' },
  { title: 'SENTENCES', image: sentencesImg, path: '/lesson/sentences' },
  { title: 'GAMES', image: gamesImg, path: '/games' }
];

const StartLearning = () => {
  return (
    <div className="start-learning-container">
      <header className="intro-text">
        Expand your Swahili vocabulary through engaging visuals and interactive exercises.
      </header>

      <div className="card-grid">
        {categories.map((category, index) => (
          <div className="learning-card" key={index}>
            <img src={category.image} alt={category.title} className="card-image" />
            <h2>{category.title}</h2>
            <Link to={category.path}>
              <button className="start-button">Start Lesson</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartLearning;

