import { TurnOrder } from 'boardgame.io/core'

const Story = {
  name: 'Story',
  setup() {
    return {
      desk: []
    }
  },
  turn: {
    order: TurnOrder.DEFAULT,
    // endIf: (G, ctx) => ({ next: '' }),
  }
}

export default Story
