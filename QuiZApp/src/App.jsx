
import React, { useState } from 'react';
import './App.css';

const questions = [
    {
        question: "What is the purpose of state in React?",
        options: [
            "To store information that may change over time",
            "To declare static values for components",
            "To define global variables",
            "None of the above"
        ],
        answer: 0
    },
    {
        question: "Which method is used to update the state in React?",
        options: [
            "updateState()",
            "changeState()",
            "setState()",
            "None of the above"
        ],
        answer: 2
    },
    {
        question: "What is JSX?",
        options: [
            "A type of JavaScript",
            "A syntax extension for JavaScript",
            "A new version of HTML",
            "A library for managing state"
        ],
        answer: 1
    },
    {
        question: "What is the use of useEffect in React?",
        options: [
            "To manage component state",
            "To perform side effects in function components",
            "To create components",
            "None of the above"
        ],
        answer: 1
    },
    {
        question: "What is the virtual DOM?",
        options: [
            "A direct representation of the actual DOM",
            "A lightweight copy of the actual DOM",
            "A library for managing DOM",
            "None of the above"
        ],
        answer: 1
    },
    {
        question: "What is a key used for in React lists?",
        options: [
            "To uniquely identify elements",
            "To create a new component",
            "To manage component state",
            "None of the above"
        ],
        answer: 0
    }
];

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
            if (selectedOption === questions[currentQuestion].answer) {
                setScore(score + 1);
            }

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
            }
        }
    };

    const handleResetClick = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setShowResult(false);
    };

    return (
        <div className="App">
            <h1>Quiz App</h1>
            {showResult ? (
                <div className="result">
                    <h2>Your Score: {score}/{questions.length}</h2>
                    <button onClick={handleResetClick}>Restart</button>
                </div>
            ) : (
                <div className="quiz">
                    <div className="question-count">
                        <span>Question {currentQuestion + 1}/{questions.length}</span>
                    </div>
                    <div className="question-text">
                        {questions[currentQuestion].question}
                    </div>
                    <div className="options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-button ${selectedOption === index ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(index)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextClick}>Next</button>
                </div>
            )}
        </div>
    );
}

export default App;
