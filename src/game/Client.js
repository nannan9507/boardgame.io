import { Client } from 'boardgame.io/react'
import Board from './games/Story/Board'
import Story from './games/Story'

const gameConf = {
  game: Story,
  board: Board,
}

let u = navigator.userAgent
let isMobile = !!u.match(/AppleWebKit.*Mobile.*/)
gameConf.debug = !isMobile

if (process.env.NODE_ENV === 'development') {
  window.onresize = () => {
    window.location.reload()
  }
} else {
  gameConf.debug = false
}

const App = Client(gameConf)

export default App
