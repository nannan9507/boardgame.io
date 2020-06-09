import 'lib-flexible'
import React from 'react'
import Avalon from './game/games/Avalon/multiplayer'
// import Client from './game/Client'
// import TicTacToe from './game/games/TicTacToe/multiplayer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Avalon></Avalon>
      {/* <TicTacToe></TicTacToe> */}
    </div>
  )
}

export default App;
