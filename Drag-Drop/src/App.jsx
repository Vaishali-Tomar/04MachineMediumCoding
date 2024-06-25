import React from 'react';
import './App.css';
import DraggableItem from './DraggableItem';
import DropTarget from './DropTarget';

const App = () => {
  return (
    <div className="app">
      <h1>Drag and Drop Example</h1>
      <div className="container">
        <DraggableItem id="item1" draggable="true">Item 1</DraggableItem>
        <DraggableItem id="item2" draggable="true">Item 2</DraggableItem>
        <DropTarget id="drop-target">Drop here</DropTarget>
      </div>
    </div>
  );
};

export default App;
