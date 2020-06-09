import React from 'react'
import { Witch } from './cards'
import './Board.less'

class Board extends React.Component {
  render() {
    let lines = []
    for (let i = 0; i < this.props.ctx.numPlayers; i++) {
      lines.push(
        <div key={i} className="line">
          <div className="number">{i + 1}</div>
          <div className="little-avatar">
          </div>
          <div className="content"></div>
        </div>
      )
    }
    const commonBoard = <div className="common-board">
      { lines }
    </div>

    const my = <div className="my">
      <div className={['sg-main__hand']}>
        <div className={['avatar']}>{Witch.name}</div>
        <div className={['introduce']}>{Witch.introduce}</div>
      </div>
    </div>

    const voteBoard = <div className="vote">
      <div className="tips">请选择【3】名玩家头像</div>
    </div>

    return <div>
      {commonBoard}
      {voteBoard}
      {my}
    </div>
  }
}

export default Board
