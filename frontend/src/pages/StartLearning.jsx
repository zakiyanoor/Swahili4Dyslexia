import React from 'react';
import "../styles/StartLearning.css";
import {useNavigate} from 'react-router-dom';

import alphabetImg from '../assets/alphabet.jpg';
import wordsImg from '../assets/words.jpg';
import sentencesImg from '../assets/sentences.jpg';
import gamesImg from '../assets/games.jpg';
import Alphabet from './Alphabet';
import Word from './Word';

const categories = [
  { title: 'ALPHABETS', image: alphabetImg, path: '/lesson/alphabet' },
  { title: 'WORDS', image: wordsImg, path: '/lesson/words' },
  { title: 'SENTENCES', image: sentencesImg, path: '/lesson/sentences' },
  { title: 'GAMES', image: gamesImg, path: '/games' }
];

const StartLearning = () => {
  const navigate =useNavigate();
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
            <button className="start-button"
            onClick={()=>navigate(category.path)}
            >Start Lesson</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartLearning;

