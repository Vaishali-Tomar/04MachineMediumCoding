import React from 'react';
//import './DraggableItem.css';

const DraggableItem = ({ id, draggable, children }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div
      id={id}
      className="draggable-item"
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
