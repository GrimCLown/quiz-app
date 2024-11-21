import React, { useEffect, useState } from "react";
// import Choices from "./Choices";
import { fetchQuestions } from "../utils/game";
import Choices from "./Choices";

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // Store the fetched questions
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadQuestions(); // Call the async function to fetch questions
  }, []);

  console.log("question", questions);
  return (
    <>
      <div className="flex flex-col h-screen justify-center">
        {questions.map((q, index) => (
          <div className="">
            <h2 key={index} className="text-2xl">
              {q.question}
            </h2>
            {[q.correct_answer, ...q.incorrect_answers].map((answer, i) => (
              <div className="flex items-center px-4">
                <p
                  key={index}
                  className="bg-[#EB5E28] w-12 h-12 flex items-center justify-center"
                >
                  {q.Choices}
                </p>
                <p
                  key={index}
                  className="bg-[#FFFCF2] w-12 h-12 flex items-center  w-screen p-2"
                >
                  {answer}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Quiz;
