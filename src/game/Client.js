import React from 'react'
import { Client } from 'boardgame.io/react'
// import Board from './Board'
// import Avalon from './games/Avalon'

// const App = Client({ game: Avalon, board: Board })
const game = {
  name: 'shuffle',

  setup: () => ({
    deck: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  }),

  moves: {
    shuffle: (G, ctx) => ({ ...G, deck: ctx.random.Shuffle(G.deck) }),
    rollDie: (G, ctx, value) => ({ ...G, dice: ctx.random.Die(value) }),
    rollD6: (G, ctx) => ({ ...G, dice: ctx.random.D6() }),
  },
}

class Board extends React.Component {
  render() {
    return (
      // eslint-disable-next-line
      <div>hello</div>
    )
  }
}

const App = Client({
  game,
  board: Board,
  debug: false
})

export default App
