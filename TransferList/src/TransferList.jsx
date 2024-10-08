import React, { useState } from 'react';
import './App.css';

const TransferList = () => {
  const [leftList, setLeftList] = useState(['USA', 'UAE', 'India', 'Australia', 'Canada']);
  const [rightList, setRightList] = useState([]);

  const moveRight = () => {
    setRightList(rightList.concat(leftList))
    setLeftList([]);
  }

  const moveLeft = () => {
   setLeftList(leftList.concat(rightList));
   setRightList([]);
  }

  const moveSelectedToRight = (item) => {
    setRightList([...rightList, item]);
    setLeftList(leftList.filter(i => i !== item));
  } 
  const moveSelectedToLeft = (item) => {
    setLeftList([...leftList, item]);
    setRightList(rightList.filter(i => i !== item));
  } 


  
  return (
    <div className="transfer-list">
      <div>
        <h3>Left List</h3>
        <ul>
          {leftList.map(item => 
            <li key={item} onClick={() =>moveSelectedToRight(item)}>{item}</li>
          )}
        </ul>
      </div>
      <div>
        <button onClick={moveLeft}>&gt;&gt;</button>
        <button onClick={moveRight}>&lt;&lt;</button>
      </div>
      <div>
        <h3>Right List</h3>
        <ul>
          {rightList.map(item => (
            <li key={item} onClick={() => moveSelectedToLeft}>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransferList;
