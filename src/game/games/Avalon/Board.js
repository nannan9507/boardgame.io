import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd-mobile'
import './Board.less'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      choice: []
    }
  }

  chioceRole(role) {
    const currentMission = this.props.G.currentMission

    const index = this.state.choice.findIndex(_role => _role.index === role.index)
    if (index > -1) {
      this.state.choice.splice(index, 1)
    } else {
      if (this.props.G.missions[currentMission].number === this.state.choice.length) {
        return
      }
      this.state.choice.push(role)
    }
    role.active = !role.active

    this.setState({
      choice: this.state.choice
    })
  }

  endPick() {
    this.props.events.endPhase()
  }

  endTalk() {
  }

  resetChoice() {
    this.state.choice.forEach(role => {
      role.active = false
    })

    this.setState({
      choice: []
    })
  }

  render() {
    console.log(this.props)
    const roles = this.props.G.roles
    let lines = []
    roles.forEach((role, index) => {
      lines.push(
        <div key={index} className="line">
          <div className="little-avatar" onClick={() => this.chioceRole(role)}>
          </div>
          { role.active && <CheckCircleOutlined /> }
        </div>
      )
    })

    const commonBoard = <div className="common-board">
      {lines}
    </div>

    // const my = <div className="my">
    //   <div className={['sg-main__hand']}>
    //     <div className={['avatar']}>{Witch.name}</div>
    //     <div className={['introduce']}>{Witch.introduce}</div>
    //   </div>
    // </div>

    const currentMission = this.props.G.currentMission
    const count = this.props.G.missions[currentMission].number - this.state.choice.length
    const isPick = this.props.ctx.phase === 'pick'
    const isTalk = this.props.ctx.phase === 'talk'

    const voteBoard = <div className="vote">
      {
        isPick && count > 0 ? <div className="tips">请选择【{this.props.G.missions[currentMission].number - this.state.choice.length}】名玩家头像</div>
        : <div className="center"><Button onClick={() => this.endPick()} className="btn" size="small" type="primary">组队</Button></div>
      }
    </div>

    const talkBoard = <div className="vote">
    {
      isTalk && <div className="tips">
        <Button onClick={() => this.endTalk()} className="btn" size="small" type="primary">组队</Button>
      </div>
    }
    </div>

    return <div>
      {commonBoard}
      {voteBoard}
      {talkBoard}
      {/* {my} */}
    </div>
  }
}

export default Board
