import './Board.less'
import React from 'react'
import { Tabs } from 'antd-mobile'
import Hammer from 'react-hammerjs'

const tabs = [
  { title: '游戏' },
  { title: '故事' },
]

let hand_cards = [
  {
    keyword: '巨人',
    active: false
  },
  {
    keyword: '动物会飞',
    active: false
  },
  {
    keyword: '自由',
    active: false
  },
  {
    keyword: '食物',
    active: false
  },
  {
    keyword: '厨师',
    active: false
  },
  {
    keyword: '野兽',
    active: false
  },
]

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hand_cards,
      choiced: {},
      showModal: false
    }
  }

  choiced(e, card) {
    e.preventDefault()
    this.state.hand_cards.map(_card => {
      _card.active = false
      return _card
    })
    card.active = !card.active
    this.setState({ hand_cards, choiced: card, showModal: true })
  }

  // 双击出牌
  showCard(card) {
    const index = this.state.hand_cards.findIndex(
      _card => _card.keyword === card.keyword
    )

    this.state.hand_cards.splice(index, 1)
    this.setState({ hand_cards: this.state.hand_cards })
  }

  closeModal() {
    this.state.hand_cards.map(_card => {
      _card.active = false
      return _card
    })
    this.setState({ showModal: false })
  }

  render() {
    const cards = []
    hand_cards.forEach((card, index) => {
      // 手牌
      cards.push(
        <Hammer key={index} onDoubleTap={() => this.showCard(card)} onPress={(event) => this.choiced(event, card)} onPressUp={() => this.closeModal()}>
          <div className={`card ${card.active ? 'active' : ''}`}>{card.keyword}</div>
        </Hammer>
      )
    })
    return <div className={['sg-main']}>
      {/* 长按选中的卡牌 */}
      {this.state.showModal && <Hammer onTap={() => this.closeModal()} onPressUp={() => this.closeModal()}>
        <div className={'full'}>
          <div className={'choiced-card'}>{this.state.choiced.keyword}</div>
        </div>
      </Hammer>}
      {/* 倒计时块 */}
      {/* 页面内容 */}
      <Tabs tabs={tabs} initialPage={0} animated={false}>
        {/* tab1 */}
        <div className={['tabs-content']}>
          <div className={['sg-main__board']}>
            {this.choiced.keyword && <div className={'choiced-card'}></div>}
          </div>
          <div className={['sg-main__hand']}>
            <div className={['cards']}>
              {cards}
            </div>
          </div>
        </div>
        {/* tab2 */}
        <div></div>
      </Tabs>
    </div>
  }
}

export default Board
