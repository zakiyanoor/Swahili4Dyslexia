// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Game.css";

// const Game = () => {
//   const [question, setQuestion] = useState(null);
//   const [selected, setSelected] = useState("");
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/game/question")
//       .then(res => {
//         console.log("🎯 Question received:", res.data);
//         setQuestion(res.data);
//       })
//       .catch(err => console.error("❌ Error fetching question:", err));
//   }, []);

//   const submit = () => {
//     axios.post("http://localhost:5000/api/game/submit", {
//       question_id: question.id,
//       chosen_answer: selected
//     }).then(res => {
//       setResult(res.data.correct ? "✅ Correct!" : "❌ Try Again!");
//     }).catch(err => {
//       console.error("❌ Error submitting answer:", err);
//     });
//   };

//   if (!question || !question.options) return <p>Loading game...</p>;

//   return (
//     <div className="game-container">
//       <h2>Game: Fill in the Blank</h2>
//       <p className="question">{question.question}</p>

//       {question.options.map((opt, index) => (
//         <label key={index} className="option">
//           <input
//             type="radio"
//             name="answer"
//             value={opt}
//             onChange={() => setSelected(opt)}
//           />{" "}
//           {opt}
//         </label>
//       ))}

//       <button onClick={submit} disabled={!selected}>Submit</button>
//       {result && <p className="result">{result}</p>}
//     </div>
//   );
// };

// export default Game;
import React, { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/Game.css";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
  const {user}= useContext(AuthContext);

  // Fetch multiple questions from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/game/questions",)
      .then((res) => {
        console.log("🎯 Questions received:", res.data);
        setQuestions(res.data);
      })
      .catch((err) => console.error("❌ Error fetching questions:", err));
  }, []);

  // Handle selecting an option
  const handleSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Submit selected answer
  const submit = (questionId) => {
  const chosen = selectedAnswers[questionId];
  if (!chosen) return;

  axios
    .post(
      "http://localhost:5000/api/game/submit",
      {
        question_id: questionId,
        chosen_answer: chosen
      },
      { withCredentials: true }
    )
    .then((res) => {
      const isCorrect = res.data.correct;
      setResults((prev) => ({
        ...prev,
        [questionId]: isCorrect ? "✅ Correct!" : "❌ Try Again!"
      }));

      if (isCorrect) {
        // Progress update call — use special lesson ID for games
        axios.post(
          "http://localhost:5000/api/progress",
          {
            lesson_id: questionId,        
            user_id: user.user_id  
          },
          { withCredentials: true }
        )
        .then(() => console.log("🎉 Game progress updated"))
        .catch((err) => console.error("❌ Error updating game progress:", err));
      }
    })
    .catch((err) => console.error("❌ Error submitting answer:", err));
};


  // Show loading message
  if (!questions.length) return <p>Loading game questions...</p>;

  return (
    <div className="game-container">
      <h2>Game: Fill in the Blanks</h2>
      {questions.map((q, index) => (
        <div key={q.id} className="question-block">
          <p className="question">{index + 1}. {q.question}</p>
          {q.options.map((opt, idx) => (
            <label key={idx} className="option">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={() => handleSelect(q.id, opt)}
              />{" "}
              {opt}
            </label>
          ))}
          <button onClick={() => submit(q.id)} disabled={!selectedAnswers[q.id]}>
            Submit
          </button>
          {results[q.id] && <p className="result">{results[q.id]}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Game;
