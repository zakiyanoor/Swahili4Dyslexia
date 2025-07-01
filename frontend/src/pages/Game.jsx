import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/Game.css";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
  const { user } = useContext(AuthContext);

  // Fetch multiple questions from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/game/questions", { withCredentials: true })
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
          chosen_answer: chosen,
          user_id: user.user_id, // ✅ added to fix backend crash
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const isCorrect = res.data.correct;
        setResults((prev) => ({
          ...prev,
          [questionId]: isCorrect ? "✅ Correct!" : "❌ Try Again!",
        }));

        if (isCorrect) {
          axios
            .post(
              "http://localhost:5000/api/progress",
              {
                lesson_id: questionId,
                user_id: user.user_id,
              },
              { withCredentials: true }
            )
            .then(() => console.log("🎉 Game progress updated"))
            .catch((err) =>
              console.error("❌ Error updating game progress:", err)
            );
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
          <p className="question">
            {index + 1}. {q.question}
          </p>
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
          <button
            onClick={() => submit(q.id)}
            disabled={!selectedAnswers[q.id]}
          >
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
