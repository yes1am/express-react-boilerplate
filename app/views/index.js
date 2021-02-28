import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import Editor from './components/editor'

function EditorDemo () {
  const [value, setValue] = useState(`12312321
  12312321
  12312321
  12312321
  12312321
  123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  12312321
  123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  12312321
  123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  12312321
  12312321123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  12312321
  12312321123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  123123211231232112312321
  12312321
  12312321
  12312321
  12312321
  12312321
  123123211231232112312321`)
  const ref = useRef(null)
  return (
    <div>
      <h1>富文本</h1>
      <Button onClick={() => {
        // console.log(ref)
        ref.current.modules.toolbar.handlers.link()
      }} className='custom'>
        链接
      </Button>
      <Editor ref={ref} value={value} onChange={(value) => setValue(value)} />
    </div>
  )
}

ReactDOM.render(
  <EditorDemo />,
  document.getElementById('root')
)
