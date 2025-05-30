import React  from "react";
import '../styles/Home.css';
import Navigation from '../components/Navigation';
import HeroImage from '../assets/hero-image.jpeg';
import StartLearning from "./StartLearning";
import { Link } from 'react-router-dom';

function Home(){
    return(
        <section className="hero">
            <div className="hero-content">
                <h1>Learn <span>Swahili</span> With Ease</h1>
                <p className="tagline">A language learning experience tailored for learners with dyslexia.</p>
                <Link to="/start-learning">
                <button className="cta-button">Start Learning</button>
                </Link>
                <div className="metrics">
                   <div><strong>1K+</strong><br />Learners</div>
                   <div><strong>250+</strong><br />Lessons</div>
                   <div><strong>4.8⭐</strong><br />User Rating</div>
                   </div>
                </div>

                <div className="hero-image">
                <img src={HeroImage} alt="Swahili learning illustration" />

                </div>
          
            
        </section>

    )
}
export default Home;








