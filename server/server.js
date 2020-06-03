import { Server } from 'boardgame.io/server';
import Story from '../src/game/games/Story';

const PORT = process.env.PORT || 8000;
const server = Server({ games: [Story] });
server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
