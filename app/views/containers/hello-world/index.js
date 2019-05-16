import React, { Component } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

class HelloWorld extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
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
