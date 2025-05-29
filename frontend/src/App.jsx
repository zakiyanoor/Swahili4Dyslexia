// import React from 'react'; 
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'
// import Navigation from './components/Navigation';
// import StartLearning from './pages/StartLearning';


// function App() {
  

//   return (
//     <>
//     <Navigation/>
//     <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/start-learning" element={<StartLearning />} />
//       </Routes>

     
//     </>
//   )
// }

// export default App
// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import StartLearning from "./pages/StartLearning";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-learning" element={<StartLearning />} />
        {/* Add other routes if needed */}
      </Routes>
    </>
  );
}

export default App;
