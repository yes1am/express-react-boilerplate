import React, { Component, useState } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

function HelloWorld () {
  const [value, setValue] = useState('')
  return (
    <React.Fragment>
      <div className='title'>
            Hello, express-react-dev-template
      </div>
      <input
        type='text'
        // value={value}
        onInput={(e) => {
          // console.log('input', e.nativeEvent.inputType)
          // if (e.nativeEvent.inputType === 'deleteCompositionText') {
          //   console.log('input1', e.target.value)
          // }
          // console.log('设置 value', e.target.value)
          console.log('input')
          // setValue(e.target.value)
        }}
        // onCompositionStart={e => {
        //   console.log('Start')
        // }}
        // onCompositionEnd={() => {
        //   console.log('End')
        // }}
        // onCompositionUpdate={() => {
        //   console.log('Update')
        // }}
        onChange={(e) => {
          // if (e.nativeEvent.inputType === 'deleteCompositionText') {
          //   console.log('change', e.nativeEvent.inputType)
          // }
          console.log('change')
        }} />
      {/* <Icon type='android' /> */}
    </React.Fragment>
  )
}

export default HelloWorld
