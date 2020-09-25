import React, { Component } from 'react'
import { Button } from 'antd'
import './style.less'
import './style.css'

class HelloWorld extends Component {
  constructor (props) {
    super(props)
    this.ws = null
    this.connect = this.connect.bind(this)
    this.close = this.close.bind(this)
  }
  componentDidMount () {

  }

  connect () {
    const ws = new WebSocket('ws://localhost:8080/')
    this.ws = ws

    ws.onerror = function (e) {
      console.log('Connection Error', e)
    }

    // 当链接打开的时候，即连上服务器
    ws.onopen = function () {
      console.log('socket open')
      function sendNumber () {
        if (ws.readyState === ws.OPEN) {
          var number = Math.round(Math.random() * 0xFFFFFF)
          ws.send(number.toString())
          setTimeout(sendNumber, 3000)
        }
      }
      sendNumber()
    }

    // 无论是前端还是后端断开，都会触发该事件
    ws.onclose = function (e) {
      console.log('socket close', e)
    }

    ws.onmessage = function (e) {
      console.log('socket onmessage', e.data)
    }
  }
  close () {
    this.ws.close()
  }
  render = () => {
    return (
      <React.Fragment>
        <div className='title'>
            Hello, express-react-dev-template
        </div>
        <div>
          <Button onClick={this.connect}>
              点击链接 socket
          </Button>
        </div>
        <div>
          <Button type='danger' onClick={this.close}>
              点击关闭 socket
          </Button>
        </div>
        {/* <Icon type='android' /> */}
      </React.Fragment>
    )
  }
}

export default HelloWorld
