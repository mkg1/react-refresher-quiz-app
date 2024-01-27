import { useRef } from 'react';

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
       // use refs for managing vals that are stored/managed independently from component lifecycle to which they belong 
       const shuffledAnswers = useRef(); 

    // checks if shuffledAnswers ref exists yet; if so, will not recreate it (if it was recreated, would lead to some whacky side effects after answer was selected)
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]; //create new array to enure og array stays as is (unshuffled)
        shuffledAnswers.current.sort((a, b) => Math.random() - 0.5 );    
    }
    
    return (
        <ul id="answers">
            {shuffledAnswers.current.map((option) => {
                const isSelected = selectedAnswer === option;
                let cssClass = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }

                if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li key={option} className="answer">
                        <button onClick={() => onSelect(option)} className={cssClass}>{option}</button>
                    </li>        
                )
            }
            )}
        </ul>
    )
}