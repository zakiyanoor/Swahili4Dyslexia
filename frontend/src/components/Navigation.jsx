// src/components/Navigation.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function Navigation() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Optional server sign-out
      await axios.post(
        "http://localhost:5000/api/signout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    }
    // Clear client-side auth flags
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");

    // Redirect to sign-in
    navigate("/signin");

    // Then reload the page to reset all state
    window.location.reload();
  };

  return (
    <nav className="navigation">
      <div className="logo">
        Swahili<span>4Dyslexia</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/start-learning">Start Learning</Link>
        </li>
        <li>
          <Link to="/my-progress">My Progress</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <div className="nav-actions">
        <Link to="/help" className="help-icon">
          ?
        </Link>
        {isAuth ? (
          <button className="sign-out" onClick={handleLogout}>
            Sign Out
          </button>
        ) : (
          <Link to="/signin">
            <button className="sign-in">Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
