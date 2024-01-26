import { useState, useCallback } from 'react';
import Questions from '../questions.js';
import Complete from '../assets/quiz-complete.png';
import ProgressTimer from './Progress.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length; //deriving active question index rather than managing it as state is better practice (less state to manage)

    const quizIsComplete = activeQuestionIndex === Questions.length;

    const handleSelectAnswer =useCallback(function handleSelectAnswers(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, [])

    // need to have a way to ensure a new handleSelectAnswer function isn't created each time component re-renders;
    // in the ProgressTimer component, setTimeout will re-render if timeout or onTimeout changes, but timeout doesn't change since it's a 
    // stable number being passed in; onTimeout, however, will change
    // Every time jsx return code in Quiz component gets re-evaluated, a new fn gets created. Jsx code gets re-evaluated whenever the state changes
    // which happens when the user picks an answer...e.g., from onTimeout, even though it's setting it to null. Enter: useCallback
    // useCallback ensures a function doesn't get recreated unless needed (their dependenciess change)

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

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
            <ProgressTimer timeout={5000} onTimeout={handleSkipAnswer}/>
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