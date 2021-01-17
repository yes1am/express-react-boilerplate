import React, { Component, useRef } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

import Test from './test'

import { Toast } from 'antd-mobile'

import { useScroll } from 'ahooks'

// function A () {
//   const ref = useRef(null)
//   const scroll = useScroll(ref)
//   return <div>
//     <div>
//       {JSON.stringify(scroll)}
//     </div>
//     <textarea style={{ maxHeight: 200 }} ref={ref} />
//   </div>
// }

class HelloWorld extends Component {
  componentDidMount () {
    this.hello()
  }
  hello = () => {
  };
  render = () => {
    return (
      <React.Fragment>
        {/* <div className='title'>
            Hello, express-react-dev-template
        </div>
        <div onClick={() => Toast.info('123123')}>
          toast
        </div> */}
        {/* <A /> */}
        {/* <Icon type='android' /> */}
        <Test />
      </React.Fragment>
    )
  }
}

export default HelloWorld
