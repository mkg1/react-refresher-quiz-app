import { useState } from 'react';
import Questions from '../questions.js';
import Complete from '../assets/quiz-complete.png';
import ProgressTimer from './Progress.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length; //deriving active question index rather than managing it as state is better practice (less state to manage)

    const quizIsComplete = activeQuestionIndex === Questions.length;

    function handleSelectAnswers(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    if (quizIsComplete) {
        return <div id="summary">
            <img src={Complete} alt="trophy icon" />
            <h2>Quiz Completed</h2>
        </div>
    }

    const shuffledAnswers = [...Questions[activeQuestionIndex].answers]; //create new array to enure og array stays as is (unshuffled)
    shuffledAnswers.sort((a, b) => Math.random() - 0.5 );

    return (
    <div id="quiz">
        <div id="questions">
            <ProgressTimer timeout={5000} onTimout={() => handleSelectAnswer(null)}/>
            <h2>{Questions[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map((option) => 
                <li key={option} className="answer">
                    <button onClick={() => handleSelectAnswers(option)}>{option}</button>
                </li>    
            )}
            </ul>
        </div>
    </div>
    )
}