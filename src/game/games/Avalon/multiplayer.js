import React from 'react';
import { Client } from 'boardgame.io/react';
import { setDebug } from '../../../utils'
// import { SocketIO } from 'boardgame.io/multiplayer';
import Game from './game';
import Board from './board';
// import request from 'superagent';

// const hostname = window.location.hostname;
const App = Client(setDebug({
  game: Game,
  board: Board,
  numPlayers: 6
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
        <App></App>
      </div>
    );
  }
}

export default GameClient;
