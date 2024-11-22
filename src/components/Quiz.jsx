import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../utils/game";

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // Store the fetched questions
  const [error, setError] = useState(null); // Error state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [answers, setAnswers] = useState([]); // Store shuffled answers for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // Check if the answer is correct
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Track total correct answers

  // Load questions and shuffle answers for the first question
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);

        // Shuffle answers for the first question
        if (data.length > 0) {
          const shuffledAnswers = [
            data[0].correct_answer,
            ...data[0].incorrect_answers,
          ].sort(() => Math.random() - 0.5);
          setAnswers(shuffledAnswers);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadQuestions(); // Fetch questions
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    const isCorrect = answer === correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1); // Increment correct answers count
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);

      // Shuffle answers for the next question
      const shuffledAnswers = [
        questions[nextIndex].correct_answer,
        ...questions[nextIndex].incorrect_answers,
      ].sort(() => Math.random() - 0.5);
      setAnswers(shuffledAnswers);

      // Reset answer state
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      alert(`Quiz completed! You answered ${correctAnswersCount} out of ${questions.length} questions correctly.`);
      window.location.href = '/';
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error if any
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>; // Loading state
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-8 w-full max-w-2xl">
        <h2 className="text-2xl mb-6">{currentQuestion.question}</h2>
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`w-full text-left p-3 rounded mb-2 ${
              selectedAnswer
                ? answer === currentQuestion.correct_answer
                  ? "bg-green-500 text-white"
                  : answer === selectedAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={selectedAnswer !== null} // Disable buttons after an answer is selected
          >
            {String.fromCharCode(65 + index)}. {answer}
          </button>
        ))}

        {selectedAnswer && (
          <div className="mt-4">
            {isAnswerCorrect ? (
              <p className="text-green-600">Correct! 🎉</p>
            ) : (
              <p className="text-red-600">
                Incorrect. 😔 The correct answer was{" "}
                <b>{currentQuestion.correct_answer}</b>.
              </p>
            )}
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mt-4"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
