import { TurnOrder } from 'boardgame.io/core'

const Avalon = {
  name: 'Avalon',
  setup() {
    return {
      desk: []
    }
  },
  turn: {
    order: TurnOrder.ONCE,
    endIf: (G, ctx) => ({ next: '' }),
  }
}

export default Avalon
