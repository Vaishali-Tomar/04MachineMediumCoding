import React from 'react';
//import './DropTarget.css';

const DropTarget = ({ id, children }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text/plain');
    const droppedItem = document.getElementById(droppedItemId);
    e.target.appendChild(droppedItem);
  };

  return (
    <div
      id={id}
      className="drop-target"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DropTarget;