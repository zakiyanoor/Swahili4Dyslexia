import React  from "react";
import '../styles/Home.css';
import Navigation from '../components/Navigation';
import HeroImage from '../assets/hero-image.jpeg';
function Home(){
    return(
        <section className="hero">
            <div className="hero-content">
                <h1>Learn <span>Swahili</span> With Ease</h1>
                <p className="tagline">A language learning experience tailored for learners with dyslexia.</p>
                <button className="cta-button">Explore Lessons</button>
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










// import React from 'react';
// import '../styles/Home.css';
// import Navigation from '../components/Navigation';
// import HeroImage from '../assets/hero-image.jpeg'



// function Home(){
//     return(
//         <section className="hero">
//       <div className="hero-content">
//         <h1>
//           Learn <span>Swahili</span> With Ease
//         </h1>
//         <p className="tagline">
//           A language learning experience tailored for learners with dyslexia.
//         </p>
//         <button className="cta-button">Start Learning</button>
//         <div className="metrics">
//           <div><strong>1K+</strong><br />Learners</div>
//           <div><strong>250+</strong><br />Lessons</div>
//           <div><strong>4.8⭐</strong><br />User Rating</div>
//         </div>
//       </div>
//       <div className="hero-image">
//         <img src={HeroImage} alt="Swahili learning illustration" />
//       </div>
//     </section>
//   );
    

// }
// export default Home;