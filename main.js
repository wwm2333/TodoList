import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/component/app'

let data = [
 {id: 0, text: '天气不错哦!!!', completed: false},
 {id: 1, text: '天气不错哦!!!', completed: false},
 {id: 2, text: '出去玩啊!!!', completed: false},
]

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('todoapp')
)
