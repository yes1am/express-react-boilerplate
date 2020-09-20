import React, { Component } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

class HelloWorld extends Component {
  componentDidMount () {
    this.hello()
    console.log('123')
    window.fetch('http://www.xxxx.com').then(res => {
      console.log('res', res)
    })
  }
  hello = () => {
    console.log(123)
  };
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
