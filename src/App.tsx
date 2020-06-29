import React from 'react';
import './App.css';
import { TodoListContainer } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoListContainer />
      </header>
    </div>
  );
}

export default App;
