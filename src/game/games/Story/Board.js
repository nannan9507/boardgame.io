import './Board.less'
import React from 'react'
import { Tabs } from 'antd-mobile'

const tabs = [
  { title: '游戏' },
  { title: '记录' },
]

let desk = [
  {
    keyword: '巨人',
    active: false
  },
  {
    keyword: '动物会飞',
    active: false
  },
  {
    keyword: '动物会飞',
    active: false
  },
  {
    keyword: '动物会飞',
    active: false
  },
  {
    keyword: '动物会飞',
    active: false
  },
  {
    keyword: '动物会飞',
    active: false
  },
]

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      desk
    }
  }

  render() {
    const choiced = (card) => {
      this.state.desk.map(_card => {
        _card.active = false
      })
      console.log(card)
      card.active = !card.active
      this.setState({ desk })
    }

    const cards = []
    desk.forEach(function (card, index) {
      cards.push(<div className={['card']} onClick={() => choiced(card)} key={index}>{card.keyword}</div>)
    })

    return <div className={['sg-main']}>
      <Tabs tabs={tabs} initialPage={0} animated={false}>
        {/* tab1 */}
        <div className={['tabs-content']}>
          <div className={['sg-main__board']}>
            { this.state.desk.map((card, index) => (<div key={index} className={card.active ? 'choiced-card': ''}></div>)) }
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
