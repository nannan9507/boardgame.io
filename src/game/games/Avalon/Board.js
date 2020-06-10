import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import './Board.less'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      choice: []
    }
  }

  chioceRole(role) {
    const list = this.state.choice
    list.push(role.index)
    this.setState({
      choice: list
    })
  }

  render() {
    const roles = this.props.G.roles
    let lines = []
    for (let role of roles) {
      lines.push(
        <div key={role.index} className="line">
          <div className="little-avatar" onClick={() => this.chioceRole(role)}>
          </div>
          <CheckCircleOutlined />
        </div>
      )
    }

    const commonBoard = <div className="common-board">
      {lines}
    </div>

    // const my = <div className="my">
    //   <div className={['sg-main__hand']}>
    //     <div className={['avatar']}>{Witch.name}</div>
    //     <div className={['introduce']}>{Witch.introduce}</div>
    //   </div>
    // </div>

    const voteBoard = <div className="vote">
      <div className="tips">请选择【{3 - this.state.choice.length}】名玩家头像</div>
    </div>

    return <div>
      {commonBoard}
      {voteBoard}
      {/* {my} */}
    </div>
  }
}

export default Board
