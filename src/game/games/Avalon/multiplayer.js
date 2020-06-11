import React from 'react';
import { Client } from 'boardgame.io/react';
import { setDebug } from '../../../utils'
import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from 'boardgame.io/multiplayer';
import Game from './game';
import Board from './board';
// import request from 'superagent';

// const hostname = window.location.hostname;
const App = Client(setDebug({
  game: Game,
  board: Board,
  numPlayers: 6,
  multiplayer: Local()
}));

class GameClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <App playerID="0"></App>
        {/* <App playerID="1"></App>
        <App playerID="2"></App> */}
      </div>
    );
  }
}

export default GameClient;
