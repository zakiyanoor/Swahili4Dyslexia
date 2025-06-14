import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import StartLearning from "./pages/StartLearning";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import { FontSizeProvider } from "./context/FontSizeContext";
import Alphabet from "./pages/Alphabet";
import Word from "./pages/Word";
import Sentences from './pages/Sentences';

function App() {
  return (
    <FontSizeProvider>
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start-learning" element={<StartLearning />} />
          <Route path="/my-progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/lesson/Alphabet" element={<Alphabet />} />
          <Route path="/lesson/words" element={<Word/>}/>
          <Route path="/lesson/sentences" element={<Sentences />} />
        </Routes>
      </>
    </FontSizeProvider>
  );
}

export default App;
