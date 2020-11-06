import React, { Component, useState } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'
import MyInput from './my-input'

function HelloWorld () {
  const [value, setValue] = useState('')
  return (
    <React.Fragment>
      <div className='title'>
        Hello, express-react-dev-template
      </div>
      <MyInput />
    </React.Fragment>
  )
}

export default HelloWorld
