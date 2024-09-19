import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(1);
    const intervalRef = useRef(null);

   useEffect(() => {
    if(isRunning){
        intervalRef.current = setInterval(() => {
            setProgress((prev) =>{
                if(prev >= 100){
                    clearInterval(intervalRef.current);
                    return 100;
                }
                return prev + speed;
            })
        }, 1000)
    }else {
        clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
   }, [isRunning, speed])

   const handleStart = () => setIsRunning(true);
   const handlePause = () => setIsRunning(false);
   const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
   }
    return (
        <div className="App">
            <h1>Progress Bar</h1>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="buttons">
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="speed-control">
                <label>
                    Speed:
                    <input
                        type="number"
                        value={speed}
                        min="1"
                        onChange={(e) => setSpeed(Number(e.target.value))}
                    />
                </label>
            </div>
        </div>
    );
}

export default App;
