/*** examples/src/app.js ***/
import React from 'react'
import { render } from 'react-dom'
import ReactDemo from '../../src' // 引入组件

const App = () => <ReactDemo onChange={e => console.log(e, 123)} />
render(<App />, document.getElementById('root'))
