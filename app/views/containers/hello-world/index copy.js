import React, { Component } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

class HelloWorld extends Component {
  componentDidMount () {
    var ws = new WebSocket('xxxxxx')

    ws.onopen = function (evt) {
      console.log('Connection open ...')
    }

    ws.onmessage = function (evt) {
      console.log('Received Message: ' + evt.data)
    }

    ws.onclose = function (evt) {
      console.log('close')
    }

    ws.onerror = function (evt) {
      console.log('error')
    }
  }
  render = () => {
    return (
      <React.Fragment>
        <div className='title'>
            Hello, express-react-dev-template
        </div>
        {/* <Icon type='android' /> */}
      </React.Fragment>
    )
  }
}

export default HelloWorld
