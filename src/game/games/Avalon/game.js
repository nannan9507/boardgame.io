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

function endTalk(G, ctx, id) {
  G.talks.push(id)
}

function voteTo(G, ctx, info) {
  G.votes.push(info)
}

const Avalon = {
  name: 'Avalon',

  setup: (G) => {
    let users = []
    for (let i = 0; i < G.numPlayers; i++) {
      users.push({ index: i, active: false, role: {} })
    }

    users[0].active = true
    users[3].active = true

    return {
      missions: gamer[G.numPlayers].missions,
      talks: [],
      users,
      currentStage: '',
      // 当前任务轮数
      currentMission: 0,
      // 任务否决次数
      veto: 0,
      // 投票结果
      votes: []
    }
  },

  turn: {
    order: TurnOrder.ONCE,
    stages: {
      talking: {
        moves: { endTalk }
      },
      vote: {
        move: { voteTo }
      }
    }
  },

  phases: {
    pick: {
      // start: true,
      onBegin: (G, ctx) => {
        G.currentStage = 'pick'
      },
      endIf: (G, ctx) => {
        const list = G.users.filter(user => user.active === true)
        if (list.length === G.missions[G.currentMission].number) {
          return { next: 'talk' }
        }
      }
    },
    talk: {
      onBegin: (G, ctx) => {
        G.currentStage = 'talk'
        ctx.events.setActivePlayers({ all: 'talk', moveLimit: 1 })
      },
      endIf: (G, ctx) => {
        if (G.talks.length === G.users.length) {
          return { next: 'vote' }
        }
      }
    },
    vote: {
      start: true,
      onBegin: (G, ctx) => {
        G.currentStage = 'vote'
        ctx.events.setActivePlayers({ all: 'vote', moveLimit: 1 })
      },
      // 如果投票成立，去mission，不成立则结束本轮到pick
      endIf: (G, ctx) => {
        if (G.votes.length === G.users.length) {
          const result = G.votes.filter(vote => vote.result === 'agree')
          return { next: result.length > G.users.length / 2 ? 'mission' : 'pick' }
        }
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

    endTalk,

    goMission(G, ctx) {
      G.vote = 0
    },

    voteTo,

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
