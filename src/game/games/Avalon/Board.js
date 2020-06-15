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

  choiceUser(role) {
    // 如果不是激活的棋盘则取消
    if (!this.props.isActive || !(this.props.G.currentStage === 'pick')) return
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
      choice: this.state.choice,
      userInfo: {},
    })
  }

  getStage(stage) {
    switch (stage) {
      case 'pick':
        this.setState({
          choice: []
        })
        return '选择队伍'
      case 'talk':
        return '圆桌会议'
      case 'vote':
        return '投票抉择'
      case 'mission':
        return '执行任务'
      default:
        return ''
    }
  }

  vote(result) {
    this.props.moves.voteTo({
      index: this.props.playerID,
      result
    })
  }

  // resetChoice() {
  //   this.state.choice.forEach(role => {
  //     role.active = false
  //   })

  //   this.setState({
  //     choice: []
  //   })
  // }

  render() {
    const users = this.props.G.users
    let lines = []
    users.forEach((user, index) => {
      lines.push(
        <div key={index} className="line">
          <div className="little-avatar" onClick={() => this.choiceUser(user)}>
          </div>
          {user.active && <CheckCircleOutlined />}
        </div>
      )
    })

    const commonBoard = <div className="common-board">
      {lines}
      <div className="center">{this.getStage(this.props.G.currentStage)}</div>
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
    const isVote = this.props.ctx.phase === 'vote'

    const pickBoard = <div className="vote">
      {
        isPick && count > 0 ? <div className="tips">请选择【{this.props.G.missions[currentMission].number - this.state.choice.length}】名玩家头像</div>
          : <div className="center"><Button onClick={() => this.props.moves.endPick(this.state.choice)} className="btn" size="small" type="primary">组队</Button></div>
      }
    </div>

    // 用微信语音，所以可以自行控制，如果用系统语音则可以未来打开
    const talkBoard = <div className="vote">
      <div className="tips">
        <div className="center"><Button onClick={() => this.props.moves.endTalk(this.props.playerID)} className="btn" size="small" type="primary">结束发言</Button></div>
      </div>
    </div>

    const voteBoard = <div className="vote">
      <div className="tips">
        <h3>组队</h3>
        <p>【1】【3】【5】【6】</p>
        <div className="center">
          <Button className="btn" onClick={() => this.vote('disagree')} size="small" type="warning">拒绝</Button>
          <Button className="btn" onClick={() => this.vote('agree')} size="small" type="primary">同意</Button>
        </div>
      </div>
    </div>

    return <div>
      {commonBoard}
      {this.props.isActive && isPick && pickBoard}
      {isTalk && this.props.G.talks.indexOf(this.props.playerID) === -1 && talkBoard}
      {isVote && voteBoard}
      {/* {my} */}
    </div>
  }
}

export default Board
