import { useState, useCallback } from 'react';
import Questions from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    // old comment from when question wasn't it's own component outside of quiz component: 
    // if question has been answered (answerState != ''), remain on current question for a bit by falling to the latter ternary option
    const activeQuestionIndex = userAnswers.length; //deriving active question index rather than managing it as state is better practice (less state to manage)

    const quizIsComplete = activeQuestionIndex === Questions.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
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
        return (
            <Summary userAnswers={userAnswers} />
        )
    }

    return (
    <div id="quiz">
        {/* key is a prop reserved for react so even though we're passing exact same thing to questionIndex, duplication is necessary */}
        <Question 
            key={activeQuestionIndex}
            questionIndex={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer} 
            onSkipAnswer={handleSkipAnswer}
            />
    </div>
    )
}