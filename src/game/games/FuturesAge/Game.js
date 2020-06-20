import { TurnOrder } from 'boardgame.io/core'

const rows = 30
const columns = 6

const boards = []
const line_num = Array(columns).fill(0)
for (let i = 0; i < rows; i++) {
  boards.push(line_num)
}

const FuturesAge = {
  name: '期货时代',
  setup() {
    return {
      boards
    }
  },
  turn: {
    order: TurnOrder.DEFAULT,
    // endIf: (G, ctx) => ({ next: '' }),
  }
}

export default FuturesAge
