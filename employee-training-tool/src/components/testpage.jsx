import axios from 'axios';
import { useState } from 'react';
import IndianOilLogo from '../assets/IndianOilLogo.png';

const questions = [
    {
        question: "When was IndianOil founded?",
        options: ["1956", "1965", "1959", "1947"],
        answer: "1959"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        answer: "Au"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: "Diamond"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the speed of light?",
        options: ["299,792 km/s", "150,000 km/s", "100,000 km/s", "250,000 km/s"],
        answer: "299,792 km/s"
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Pepper"],
        answer: "Avocado"
    },
];

function TestPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    useState(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleOptionChange = (index, option) => {
        const newAnswers = [...answers];
        newAnswers[index] = option;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        let newScore = 0;
        questions.forEach((question, index) => {
            if (question.answer === answers[index]) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setSubmitted(true);

        try {
            await axios.post('http://localhost:5000/send-email', {
                score: newScore,
                totalQuestions: questions.length
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#d0eaff] text-white font-orbitron p-4">
            <header className="bg-[#0D0B49] w-full shadow-md mb-8 py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={IndianOilLogo} alt="Logo" className="w-16 h-16 object-contain" />
                    <h1 className="ml-4 font-bold text-xl">IOCL Internal Onboarding</h1>
                </div>
            </header>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
                {submitted ? (
                    <div>
                        <h1 className="text-3xl font-extrabold mb-6 text-center">Your Score</h1>
                        <p className="text-lg mb-4 text-center">{score} out of {questions.length}</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-extrabold mb-6 text-center">Test</h1>
                        <p className="text-lg mb-4 text-center">Time Left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p>
                        <div className="mb-6">
                            <h2 className="text-2xl mb-4">{questions[currentQuestion].question}</h2>
                            <div className="flex flex-col space-y-2">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <label key={index} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion}`}
                                            value={option}
                                            checked={answers[currentQuestion] === option}
                                            onChange={() => handleOptionChange(currentQuestion, option)}
                                            className="form-radio h-4 w-4 text-blue-600"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                            >
                                Previous
                            </button>
                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestPage;
