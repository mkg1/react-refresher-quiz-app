import { useState, useCallback } from 'react';
import Questions from '../questions.js';
import Complete from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    // if question has been answered (answerState != ''), remain on current question for a bit by falling to the latter ternary option
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1; //deriving active question index rather than managing it as state is better practice (less state to manage)

    const quizIsComplete = activeQuestionIndex === Questions.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === Questions[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            // nested timer here allows user to stay on current question for 2 sec before moving on
            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)
    }, [activeQuestionIndex])

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

    return (
    <div id="quiz">
        <Question 
            key={activeQuestionIndex}
            questionText={Questions[activeQuestionIndex].text} 
            answers={Questions[activeQuestionIndex].answers} 
            onSelectAnswer={handleSelectAnswer} 
            answerState={answerState}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            onSkipAnswer={handleSkipAnswer}
            />
    </div>
    )
}