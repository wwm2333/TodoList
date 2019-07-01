import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/component/app'
import * as serviceWorker from './serviceWorker';

let data = [
 {id: 1, text: '天气不错哦!!!', completed: false},
 {id: 2, text: 'balabala!!!', completed: false},
 {id: 3, text: '出去玩啊!!!', completed: false},
]

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('todoapp')
)

serviceWorker.register();

