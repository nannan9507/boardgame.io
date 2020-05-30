import React from 'react'
import './Board.css'

class Board extends React.Component {
  render() {
    return <div className={['sg-main']}>
      <div className={['sg-main__board']}></div>
      <div className={['sg-main__hand']}>
        <div className={['avatar']}></div>
      </div>
    </div>
  }
}

export default Board
