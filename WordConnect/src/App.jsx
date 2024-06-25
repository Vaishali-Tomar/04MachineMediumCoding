import React, { useState } from 'react';
import './App.css';

const words = [
  { id: 1, word: "Laos", pair: "Vientiane" },
  { id: 2, word: "Dublin", pair: "Ireland" },
  { id: 3, word: "Bamako", pair: "Mali" },
  { id: 4, word: "Port Louis", pair: "Mauritius" },
  { id: 5, word: "New Delhi", pair: "India" },
  { id: 6, word: "Kuwait", pair: "Kuwait City" },
  { id: 7, word: "Vilnius", pair: "Lithuania" },
  { id: 8, word: "Rome", pair: "Italy" },
];

const shuffledWords = [...words.map(w => w.word), ...words.map(w => w.pair)].sort(() => Math.random() - 0.5);

const App = () => {
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const handleWordClick = (word) => {
    if (selected.length === 0) {
      setSelected([word]);
    } else {
      setAttempts(attempts + 1);
      const [firstSelected] = selected;
      const pair = words.find(w => (w.word === firstSelected && w.pair === word) || (w.pair === firstSelected && w.word === word));
      if (pair) {
        setMatchedPairs([...matchedPairs, firstSelected, word]);
      }
      setSelected([]);
    }
  };

  return (
    <div className="App">
      <h1>Word Connect Game</h1>
      <p>Attempts: {attempts}</p>
      <div className="words-container">
        {shuffledWords.map(word => (
          <button
            key={word}
            onClick={() => handleWordClick(word)}
            disabled={matchedPairs.includes(word)}
            className={selected.includes(word) ? 'selected' : ''}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
