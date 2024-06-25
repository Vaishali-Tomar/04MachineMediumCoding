import React, { useState, useEffect } from 'react';
import './App.css';

const generatePuzzle = () => {
  let numbers = Array.from({ length: 15 }, (_, i) => i + 1).concat(null);
  let shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
  return Array.from({ length: 4 }, (_, row) =>
    shuffledNumbers.slice(row * 4, row * 4 + 4)
  );
};

const findEmptyTile = (grid) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === null) {
        return { row, col };
      }
    }
  }
};

const isSolved = (grid) => {
  let count = 1;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (row === 3 && col === 3) {
        return grid[row][col] === null;
      }
      if (grid[row][col] !== count) {
        return false;
      }
      count++;
    }
  }
  return true;
};

const App = () => {
  const [grid, setGrid] = useState(generatePuzzle());
  const [history, setHistory] = useState([]);

  const handleTileClick = (row, col) => {
    const { row: emptyRow, col: emptyCol } = findEmptyTile(grid);
    if (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    ) {
      const newGrid = grid.map(row => [...row]);
      newGrid[emptyRow][emptyCol] = grid[row][col];
      newGrid[row][col] = null;

      setHistory([...history, grid]);
      setGrid(newGrid);
    }
  };

  const handleReset = () => {
    setGrid(generatePuzzle());
    setHistory([]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setGrid(lastState);
      setHistory([...history]);
    }
  };

  return (
    <div className="App">
      <h1>15 Puzzle</h1>
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`tile ${tile === null ? 'empty' : ''}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            >
              {tile}
            </div>
          ))
        )}
      </div>
      <div className="controls">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleUndo}>Undo</button>
      </div>
      {isSolved(grid) && <p>Congratulations! You solved the puzzle!</p>}
    </div>
  );
};

export default App;
