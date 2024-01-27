import ProgressTimer from "./Progress";
import Answers from "./Answers";

export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
    return (
        <div id="questions">
        {/* old comment from when timer and answers were not wrapped in separate question component and just rendered as part of quiz component */}
        {/* Now they're separate, key is no longer needed */}
        {/* whenever key prop changes, react will destroy old component instance and create a new one */}
        {/* since we want to recreate the timer when switching to a new question, we need the key compoonent here to trigger render of the timer */}
        <ProgressTimer timeout={5000} onTimeout={onSkipAnswer}/>
        <h2>{questionText}</h2>
        <Answers 
            answers={answers} 
            selectedAnswer={selectedAnswer} 
            answerState={answerState} 
            onSelect={onSelectAnswer} />
    </div>

    )
}