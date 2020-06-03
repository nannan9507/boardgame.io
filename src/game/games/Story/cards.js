// type: event事件, figure人物, place地点, ending结局
// time:

class Card {
  constructor({ keyword = '', type = '' }) {
    this.keyword = keyword
    this.type = type
  }
}

export const cards = [
  new Card({ keyword: '父母', type: '人物' }),
  new Card({ keyword: '国王', type: '人物' }),
  new Card({ keyword: '公主', type: '人物' }),
]

export const endings = [
  new Card({
    keyword: '正义终将战胜邪恶',
    type: '结局'
  }),
]
