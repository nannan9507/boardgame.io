import { TurnOrder } from 'boardgame.io/core'
import { Witch } from './cards'

const isOver = (missions) => {
  const successTimes = missions.filter((mission) => {
    return mission.status === 'success'
  })

  const failTimes = missions.filter((mission) => {
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

let gamer = {
  6: {
    recommend: [Witch],
    missions: [
      { number: 2, result: [] },
      { number: 3, result: [] },
      { number: 3, result: [] },
      // safe 保护轮，需要两张反对票
      { number: 4, safe: true, result: [] },
      { number: 4, result: [] },
    ],
  },
}

function endTalk(G, ctx, id) {
  G.talks.push(id)
}

function voteTo(G, ctx, info) {
  G.votes.push(info)
}

function missionTo(G, ctx, result) {
  G.missions[G.currentMission].result.push(result)
}

function resetTurn(G) {
  G.talks = []
  G.votes = []
  G.results = []
  G.users.forEach((user) => {
    user.active = false
  })
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
      currentStage: '',
      // 当前任务轮数
      currentMission: 0,
      // 任务否决次数
      veto: 0,
      // 投票结果
      votes: [],
      // 成功／失败结果
      results: [],
    }
  },

  turn: {
    order: TurnOrder.DEFAULT,
    stages: {
      talking: {
        moves: { endTalk },
      },
      vote: {
        moves: { voteTo },
      },
      mission: {
        moves: { missionTo },
      },
    },
  },

  phases: {
    pick: {
      start: true,
      onBegin: (G, ctx) => {
        G.currentStage = 'pick'
      },
      endIf: (G, ctx) => {
        const list = G.users.filter((user) => user.active === true)
        if (list.length === G.missions[G.currentMission].number) {
          return { next: 'talk' }
        }
      },
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
      },
    },
    vote: {
      onBegin: (G, ctx) => {
        G.currentStage = 'vote'
        ctx.events.setActivePlayers({ all: 'vote', moveLimit: 1 })
      },
      // 如果投票成立，去mission，不成立则结束本轮到pick
      endIf: (G, ctx) => {
        if (G.votes.length === G.users.length) {
          const result = G.votes.filter((vote) => vote.result === 'agree')
          if (result.length > G.users.length / 2) {
            return { next: 'mission' }
          }

          return { next: 'pick' }
        }
      },
      onEnd(G) {
        const result = G.votes.filter((vote) => vote.result === 'agree')
        if (result.length <= G.users.length / 2) {
          G.currentMission = G.currentMission + 1
          console.log(1111)
          console.log('===========')
          console.log(G.currentMission)
          console.log('===========')
          resetTurn(G)
        }
      }
    },
    mission: {
      onBegin: (G, ctx) => {
        G.currentStage = 'mission'
        const value = {}
        G.users.forEach((user) => {
          if (user.active) {
            value[user.index] = 'mission'
          }
        })
        ctx.events.setActivePlayers({ value, moveLimit: 1 })
      },
      onEnd: (G, ctx) => {
        G.currentMission = G.currentMission + 1
        resetTurn(G)
      },
      endIf: (G, ctx) => {
        let currentMission = G.missions[G.currentMission]
        if (currentMission.number === currentMission.result.length) {
          if (currentMission.result.indexOf(false) > -1) {
            G.results.push(false)
          } else {
            G.results.push(true)
          }

          return { next: 'pick' }
        }
      },
    },
  },

  moves: {
    endPick(G, ctx, list) {
      list.forEach((item) => {
        G.users[item.index].active = true
      })
    },

    endTalk,

    goMission(G, ctx) {
      G.vote = 0
    },

    voteTo,

    resetTurn,
  },

  endIf: (G, ctx) => {
    if (isOver(G.missions) === 'bad') {
      return { winner: G.team.bads }
    }

    if (isOver(G.missions) === 'good') {
      return { winner: G.team.goods }
    }
  },
}

export default Avalon
