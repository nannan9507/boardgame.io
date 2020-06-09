import { Server } from 'boardgame.io/server';
// import Story from '../src/game/games/Story';
import TicTacToe from '../src/game/games/TicTacToe/game';

const PORT = process.env.PORT || 8000;
const server = Server({ games: [TicTacToe] });
// const server = Server({ games: [Story, TicTacToe] });
server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
