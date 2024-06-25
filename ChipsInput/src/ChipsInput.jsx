import React, { useState } from 'react';
import './ChipsInput.css'; // Assuming you have a separate CSS file

const ChipsInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      addChip(inputValue.trim());
      setInputValue('');
    }
  };

  const addChip = (chipText) => {
    if (chipText && !chips.includes(chipText)) {
      setChips([...chips, chipText]);
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const updatedChips = chips.filter((chip, index) => index !== chipIndex);
    setChips(updatedChips);
  };

  return (
    <div className="chips-input-container">
      <div className="chips-list">
        {chips.map((chip, index) => (
          <div key={index} className="chip">
            {chip}
            <button className="delete-button" onClick={() => handleDeleteChip(index)}>X</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="input-field"
        placeholder="Type something and press Enter"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export default ChipsInput;
