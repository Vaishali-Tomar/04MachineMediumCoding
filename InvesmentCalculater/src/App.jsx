import React, { useState } from 'react';
import './App.css';

function App() {
    const [currentSavings, setCurrentSavings] = useState(10000);
    const [yearlySavings, setYearlySavings] = useState(1200);
    const [interestRate, setInterestRate] = useState(7);
    const [investmentDuration, setInvestmentDuration] = useState(10);
    const [futureValue, setFutureValue] = useState(null);

    const calculateInvestment = () => {
        const rate = interestRate / 100;
        let futureValue = currentSavings;

        for (let year = 1; year <= investmentDuration; year++) {
            futureValue = futureValue * (1 + rate) + yearlySavings;
        }

        setFutureValue(futureValue.toFixed(2));
    };

    const resetForm = () => {
        setCurrentSavings(10000);
        setYearlySavings(1200);
        setInterestRate(7);
        setInvestmentDuration(10);
        setFutureValue(null);
    };

    return (
        <div className="App">
            <h1>Investment Calculator</h1>
            <div>
                <label>
                    Current Savings ($):
                    <input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Yearly Savings ($):
                    <input
                        type="number"
                        value={yearlySavings}
                        onChange={(e) => setYearlySavings(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Expected Interest (%, per year):
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Investment Duration (years):
                    <input
                        type="number"
                        value={investmentDuration}
                        onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <button onClick={calculateInvestment}>Calculate</button>
                <button onClick={resetForm}>Reset</button>
            </div>
            {futureValue !== null && (
                <div>
                    <h2>Future Value: ${futureValue}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
