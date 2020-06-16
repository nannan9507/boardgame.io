import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd-mobile'
import './Board.less'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      choice: [],
      isVote: {
        status: true,
        type: '',
      },
      isMission: {
        status: true,
        type: ''
      },
      current: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.G.currentStage !== this.props.G.currentStage) {
      const text = this.getStage(this.props.G.currentStage)
      this.setState({
        current: text
      })
    }
  }

  choiceUser(role) {
    // 如果不是激活的棋盘则取消
    if (!this.props.isActive || !(this.props.G.currentStage === 'pick')) return
    const currentMission = this.props.G.currentMission

    const index = this.state.choice.findIndex(
      (_role) => _role.index === role.index
    )
    if (index > -1) {
      this.state.choice.splice(index, 1)
    } else {
      if (
        this.props.G.missions[currentMission].number ===
        this.state.choice.length
      ) {
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
          choice: [],
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
    this.setState({
      isVote: {
        status: false,
        type: result,
      },
    })

    this.props.moves.voteTo({
      index: this.props.playerID,
      result,
    })
  }

  mission(result) {
    this.setState({
      isMission: {
        status: false,
        type: result,
      },
    })
    this.props.moves.missionTo(result)
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
          <div
            className="little-avatar"
            onClick={() => this.choiceUser(user)}
          ></div>
          {user.active && <CheckCircleOutlined />}
        </div>
      )
    })

    const commonBoard = (
      <div className="common-board">
        {lines}
        <div className="center">{this.state.current}</div>
      </div>
    )

    const filter2User = () => {
      let list = []
      const filter_list = this.props.G.users.filter(user => {
        if (user.active) {
          list.push(`【${user.index}】`)
          if (user.index === Number(this.props.playerID)) {
            return user
          }
        }
      })

      return {
        list,
        isCurrent: filter_list[0],
      }
    }

    // const my = <div className="my">
    //   <div className={['sg-main__hand']}>
    //     <div className={['avatar']}>{Witch.name}</div>
    //     <div className={['introduce']}>{Witch.introduce}</div>
    //   </div>
    // </div>

    const currentMission = this.props.G.currentMission
    const count =
      this.props.G.missions[currentMission].number - this.state.choice.length
    const isPickStage = this.props.ctx.phase === 'pick'
    const isTalkStage = this.props.ctx.phase === 'talk'
    const isVoteStage = this.props.ctx.phase === 'vote'
    const isMissionStage = this.props.ctx.phase === 'mission'

    const pickBoard = (
      <div className="vote">
        {isPickStage && count > 0 ? (
          <div className="tips">
            请选择【
            {this.props.G.missions[currentMission].number -
              this.state.choice.length}
            】名玩家头像
          </div>
        ) : (
          <div className="center">
            <Button
              onClick={() => this.props.moves.endPick(this.state.choice)}
              className="btn"
              size="small"
              type="primary"
            >
              组队
            </Button>
          </div>
        )}
      </div>
    )

    // 用微信语音，所以可以自行控制，如果用系统语音则可以未来打开
    const talkBoard = (
      <div className="vote">
        <div className="tips">
          <div className="center">
            <Button
              onClick={() => this.props.moves.endTalk(this.props.playerID)}
              className="btn"
              size="small"
              type="primary"
            >
              结束发言
            </Button>
          </div>
        </div>
      </div>
    )

    const { isCurrent, list } = filter2User()
    const showbox = <p>{list}</p>

    const voteBoard = (
      <div className="vote">
        <div className="tips">
          <h3>组队</h3>
          <p>{showbox}</p>
          {this.state.isVote.status && (
            <div className="center">
              <Button
                className="btn"
                onClick={() => this.vote('disagree')}
                size="small"
                type="warning"
              >
                拒绝
              </Button>
              <Button
                className="btn"
                onClick={() => this.vote('agree')}
                size="small"
                type="primary"
              >
                同意
              </Button>
            </div>
          )}
        </div>
      </div>
    )

    const missionBoard = (
      <div className="vote">
        <div className="tips">
          <h3>任务</h3>
          {showbox}
          {this.state.isMission.status && isCurrent && (
            <div className="center">
              <Button
                className="btn"
                onClick={() => this.mission(false)}
                size="small"
                type="warning"
              >
                破坏任务
              </Button>
              <Button
                className="btn"
                onClick={() => this.mission(true)}
                size="small"
                type="primary"
              >
                完成任务
              </Button>
            </div>
          )}
        </div>
      </div>
    )

    return (
      <div>
        {commonBoard}
        {this.props.isActive && isPickStage && pickBoard}
        {isTalkStage &&
          this.props.G.talks.indexOf(this.props.playerID) === -1 &&
          talkBoard}
        {isVoteStage && voteBoard}
        {isMissionStage && missionBoard}
      </div>
    )
  }
}

export default Board
