/*** examples/src/app.js ***/
import React from 'react'
import { render } from 'react-dom'
import ReactDemo from '../../src' // 引入组件
// import ReactDemo from '../../src/index.js';
// import '../../lib/main.min.css'


const App = () => 
<div className="container">e
    <ReactDemo accept="image/*" maxSize={0.1} maxSizeErrorHandle={(e)=>{alert(e)}}  loadingHandle={e=>console.log(e,234)} onChange={e => console.log(e, 123)} />
</div>
render(<App />, document.getElementById('root'))
