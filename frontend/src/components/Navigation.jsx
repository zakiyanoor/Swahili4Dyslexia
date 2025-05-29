import React from "react";
import {Link} from "react-router-dom";
import '../styles/Navigation.css';
import Home from "../pages/Home";
import StartLearning from "../pages/StartLearning";

function Navigation(){
    return(
     <>
      <nav className="navigation">
      <div className="logo">Swahili<span>4Dslexia</span></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/start-learning">Start Learning</Link></li>
        <li><Link to="/my-progress">My Progress</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/help" className="help-icon">?</Link>
        <button className="sign-in">Sign in</button>
      </div>
    </nav>
  

     </>
    );
}
export default Navigation;