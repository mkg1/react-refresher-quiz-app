import { useState } from 'react';
import Questions from '../questions.js';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length; //deriving active question index rather than managing it as state is better practice (less state to manage)

    const shuffledAnswers = [...Questions[activeQuestionIndex].answers]; //create new array to enure og array stays as is (unshuffled)
    shuffledAnswers.sort((a, b) => Math.random() - 0.5 );

    function handleSelectAnswers(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }



    return (
    <div id="quiz">
        <div id="questions">
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