import { useState, useEffect } from 'react';

export default function ProgressTimer({timeout, onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // need to wrap setTimeout in useEffect bc it will re-start a new timer each time component re-renders after setRemainingTime runs
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout) //will call onTimeout fn once the timeout expires; onTimeout fn will be passed back to parent component (quiz) to indicate it should move to next q
        
        // clean up timer
        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout])

    // need useEffect here to avoid an infinite loop of calling setInterval when component is re-rendered
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        // clean up interval; bc strict mode is on in dev, this useEffect will run twice, creating 2 intervals, depleting remainingTime 2x as fast.
        return () => {
            clearInterval(interval);
        };
    }, []
    )

    return <progress id="question-time" max={timeout} value={remainingTime}/>
}