import React from 'react'
import './Board.less'

class Board extends React.Component {
  render() {
    return <div className={['sg-main']}>
      <div className={['sg-main__board']}></div>
      <div className={['sg-main__hand']}>
        <div className={['avatar']}>魔女</div>
      </div>
    </div>
  }
}

export default Board
