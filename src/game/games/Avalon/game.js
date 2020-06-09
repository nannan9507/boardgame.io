import { TurnOrder } from 'boardgame.io/core'

const isOver = (missions) => {
  const successTimes = missions.filter(mission => {
    return mission.status === 'success'
  })

  const failTimes = missions.filter(mission => {
    return mission.status === 'fail'
  })

  if (successTimes.length === 3) {
    return 'good'
  }

  if (failTimes.length === 3) {
    return 'bad'
  }

  return 'game'
}

const gamer = {
  6: [
    { number: 2, status: 'await' },
    { number: 3, status: 'await' },
    { number: 3, status: 'await' },
    { number: 4, status: 'await' },
    { number: 4, status: 'await' },
  ]
}

const Avalon = {
  name: 'Avalon',

  // roles => current

  setup: (G) => ({
    missions: gamer[G.numPlayers],
    roles: new Array(G.numPlayers).fill({}),
    team: {
      goods: [],
      bads: []
    },
    cars: [],
    currentMission: 0,
    miss: 0
  }),

  turn: {
    order: TurnOrder.ONCE,
  },

  phases: {
    pick: {
      start: true,
      endIf: (G, ctx) => {
        console.log(ctx)
        // (G.cars.length === G.missions[G.currentMission].number)
      },
      next: 'talk',
    },
    talk: {
      // endIf: (G, ctx) => true,
    },
    vote: {
      endIf: (G, ctx) => {
      }
    },
    mission: {}
  },

  moves: {
  },

  endIf: (G, ctx) => {
    if (isOver(G.missions) === 'bad') {
      return { winner: G.team.bads };
    }

    if (isOver(G.missions) === 'good') {
      return { winner: G.team.goods }
    }
  },
};

export default Avalon;
