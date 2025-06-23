// src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import StartLearning from "./pages/StartLearning";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import { FontSizeProvider } from "./context/FontSizeContext";
import Alphabet from "./pages/Alphabet";
import Word from "./pages/Word";
import Sentences from "./pages/Sentences";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  // Theme toggles
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Load *all* settings on mount and apply immediately
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings")) || {};

    // 1) Theme classes
    setDyslexiaFont(!!saved.dyslexiaFont);
    setHighContrast(!!saved.highContrast);

    // 2) All typography vars
    const root = document.documentElement;
    if (typeof saved.textSize === "number")
      root.style.setProperty("--app-base-font-size", `${saved.textSize}px`);
    if (typeof saved.textWeight === "number")
      root.style.setProperty("--app-font-weight", saved.textWeight);
    if (typeof saved.lineHeight === "number")
      root.style.setProperty("--app-line-height", saved.lineHeight);
    if (typeof saved.letterSpacing === "number")
      root.style.setProperty(
        "--app-letter-spacing",
        `${saved.letterSpacing}em`
      );
    root.style.setProperty(
      "--app-word-spacing",
      saved.wordSpacing ? "0.35em" : "normal"
    );
    // (you can also load audioFeedback, emailNotifications etc. here if needed)
  }, []);

  // Apply or remove theme classes to <html>
  useEffect(() => {
    const root = document.documentElement;
    dyslexiaFont
      ? root.classList.add("dyslexic-font")
      : root.classList.remove("dyslexic-font");
    highContrast
      ? root.classList.add("high-contrast")
      : root.classList.remove("high-contrast");
  }, [dyslexiaFont, highContrast]);

  return (
    <AuthProvider>
      <FontSizeProvider>
        <>
          <Navigation />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings dyslexiaFont={dyslexiaFont} highContrast={highContrast} setDyslexiaFont={setDyslexiaFont} setHighContrast={setHighContrast} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route path="/start-learning" element={<ProtectedRoute><StartLearning /></ProtectedRoute>} />
            <Route path="/my-progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/lesson/Alphabet" element={<ProtectedRoute><Alphabet /></ProtectedRoute>} />
            <Route path="/lesson/words" element={<ProtectedRoute><Word /></ProtectedRoute>} />
            <Route path="/lesson/sentences" element={<ProtectedRoute><Sentences /></ProtectedRoute>} />
          </Routes>
        </>
      </FontSizeProvider>
    </AuthProvider>
  );
}

export default App;
