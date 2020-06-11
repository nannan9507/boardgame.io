import { TurnOrder } from 'boardgame.io/core'
import {Witch} from './cards'

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
  6: {
    recommend: [
      Witch
    ],
    missions: [
      { number: 2, status: 'await' },
      { number: 3, status: 'await' },
      { number: 3, status: 'await' },
      { number: 4, status: 'await' },
      { number: 4, status: 'await' },
    ]
  }
}

const Avalon = {
  name: 'Avalon',

  setup: (G) => {
    let roles = []
    for (let i = 0; i < G.numPlayers; i++) {
      roles.push({ index: i + 1, active: false })
    }

    return {
      missions: gamer[G.numPlayers].missions,
      roles,
      // 当前任务轮数
      currentMission: 0,
      // 任务否决次数
      veto: 0
    }
  },

  turn: {
    order: TurnOrder.ONCE,
  },

  phases: {
    pick: {
      start: true,
      next: 'talk',
      endIf: (G, ctx) => ctx.turn === 2
    },
    talk: {
      next: 'vote'
    },
    vote: {
      endIf: (G, ctx) => {
      },
      // 如果投票成立，去mission，不成立则结束本轮到pick
      next: ''
    },
    mission: {
      // endIf: (G, ctx) => {
      // }
      next: 'pick'
    }
  },

  moves: {
    endPick(G, ctx) {
      this.props.events.endPhase()
    },

    endTalk() {
    }
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
