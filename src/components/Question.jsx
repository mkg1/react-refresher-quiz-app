import ProgressTimer from "./Progress";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions";

export default function Question({questionIndex, onSelectAnswer, onSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000)
    
        }, 1000)
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="questions">
        {/* old comment from when timer and answers were not wrapped in separate question component and just rendered as part of quiz component */}
        {/* Now they're separate, key is no longer needed */}
        {/* whenever key prop changes, react will destroy old component instance and create a new one */}
        {/* since we want to recreate the timer when switching to a new question, we need the key compoonent here to trigger render of the timer */}
        <ProgressTimer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState}/>
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <Answers 
            answers={QUESTIONS[questionIndex].answers} 
            selectedAnswer={answer.selectedAnswer} 
            answerState={answerState} 
            onSelect={handleSelectAnswer} />
    </div>

    )
}