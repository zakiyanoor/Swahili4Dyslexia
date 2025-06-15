import React from "react";
import {Link} from "react-router-dom";
import '../styles/Navigation.css';
import Home from "../pages/Home";
import StartLearning from "../pages/StartLearning";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navigation(){

    const {isAuth,username,isLoading}=useAuth();
    const navigate=useNavigate()
    const handleLogout = async () => {
    try {
    await axios.post('http://localhost:5000/api/signout', {}, {
      withCredentials: true, 
    });

    localStorage.removeItem('isAuthenticated');

    

   
    navigate('/signin');
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Something went wrong during logout.');
  }
};
    return(
     <>
      <nav className="navigation">
      <div className="logo">Swahili<span>4Dyslexia</span></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/start-learning">Start Learning</Link></li>
        <li><Link to="/my-progress">My Progress</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/lesson/sentences" className="nav-link">Sentences</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/help" className="help-icon">?</Link>
        { isAuth ==="true"? (<button onClick={handleLogout}>Sign Out</button>)
        :(
        <Link to="/signin">
             <button className="sign-in">Sign in</button>
        </Link>
       ) }
      </div>
    </nav>
  

     </>
    );
}
export default Navigation;