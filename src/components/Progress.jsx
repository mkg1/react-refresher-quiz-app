import { useState, useEffect } from 'react';

export default function ProgressTimer({timeout, onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // need to wrap setTimeout in useEffect bc it will re-start a new timer each time component re-renders after setRemainingTime runs
    useEffect(() => {
        setTimeout(onTimeout, timeout) //will call onTimeout fn once the timeout expires; onTimeout fn will be passed back to parent component (quiz) to indicate it should move to next q
    }, [timeout, onTimeout])

    // need useEffect here to avoid an infinite loop of calling setInterval when component is re-rendered
    useEffect(() => {
        setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);
    }, []
    )

    return <progress id="question-time" max={timeout} value={remainingTime}/>
}