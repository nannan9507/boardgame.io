import React from 'react';
import Client from './Client'
import './App.css';

console.log(Client)

function App() {
  return (
    <div className="App">
      hello world
      <Client gameId='1' playerId='2'></Client>
    </div>
  );
}

export default App;
