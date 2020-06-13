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
      // safe 保护轮，需要两张反对票
      { number: 4, status: 'await', safe: true },
      { number: 4, status: 'await' },
    ]
  }
}

const Avalon = {
  name: 'Avalon',

  setup: (G) => {
    let users = []
    for (let i = 0; i < G.numPlayers; i++) {
      users.push({ index: i, active: false, role: {} })
    }

    return {
      missions: gamer[G.numPlayers].missions,
      talks: [],
      users,
      currentStage: 'talk',
      // 当前任务轮数
      currentMission: 0,
      // 任务否决次数
      veto: 0,
    }
  },

  turn: {
    order: TurnOrder.ONCE,
  },

  phases: {
    pick: {
      // start: true,
      endIf: (G, ctx) => {
        const list = G.users.filter(user => user.active === true)
        if (list.length === G.missions[G.currentMission].number) {
          G.currentStage = 'talk'
          return { next: 'talk' }
        }
      }
    },
    talk: {
      start: true,
      endIf: (G, ctx) => {
        if (G.talks.length === G.users.length) {
          return { next: 'vote' }
        }
      }
    },
    vote: {
      // 如果投票成立，去mission，不成立则结束本轮到pick
      endIf: (G, ctx) => {
        // return { next: G.condition ? 'phaseB' : 'phaseC' }
      },
    },
    mission: {
      // endIf: (G, ctx) => {
      // }
      next: 'pick'
    }
  },

  moves: {
    endPick(G, ctx, list) {
      list.forEach(item => {
        G.users[item.index].active = true
      })
    },

    endTalk(G, ctx, id) {
      G.talks.push(id)
    },

    goMission(G, ctx) {
      G.vote = 0
    },

    resetTurn() {

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
