import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Editor from './components/editor'

function EditorDemo () {
  const [value, setValue] = useState('')
  return (
    <div>
      <h1>富文本</h1>
      <Editor value={value} onChange={(value) => setValue(value)} />
    </div>
  )
}

ReactDOM.render(
  <EditorDemo />,
  document.getElementById('root')
)
