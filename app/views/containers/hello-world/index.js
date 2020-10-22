import React, { Component, useRef, useState } from 'react'
import { Button } from 'antd'
import './style.less'
import './style.css'
const axios = require('axios')
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const source1 = CancelToken.source()

// function useStateWithLabel (initialValue, name) {
//   const [value, setValue] = useState(initialValue)
//   useDebugValue(`${name}: ${value}`)
//   return [value, setValue]
// }

// function World () {
//   const inputEl = React.useRef(0)
//   const [count, setCount] = useStateWithLabel(0, 'count')
//   console.log(inputEl.current, 'xx')
//   return <div onClick={() => {
//     setCount(count => count + 1)
//     inputEl.current = inputEl.current + 2
//   }}>
//     add
//   </div>
// }

// class HelloWorld extends Component {
//   componentDidMount () {
//     this.hello()
//   }
//   hello = () => {
//     console.log(123)
//   };
//   render = () => {
//     return (
//       <React.Fragment>
//         <div className='title'>
//             Hello, express-react-dev-template
//         </div>
//         <Icon onClick={() => { console.log('123123') }} type='android' />
//       </React.Fragment>
//     )
//   }
// }

function HelloWorld () {
  const ref = useRef(null)
  // const fetch = () => {
  //   ref.current = new XMLHttpRequest()
  //   ref.current.open('GET', 'http://localhost:3004/json')
  //   ref.current.send()
  //   ref.current.onload = () => {
  //     console.log('success', ref.current.response)
  //   }
  //   ref.current.onerror = (e) => {
  //     console.log('error', e)
  //   }
  //   ref.current.onabort = (e) => {
  //     console.log('abort', e)
  //     console.log(ref.current.status)
  //   }
  //   setTimeout(() => {
  //     ref.current.abort()
  //   }, 500)
  // }

  const fetch = () => {
    axios.get('http://localhost:3004/json', {
      cancelToken: source.token
    })
      .then((response) => {
        console.log('success', response)
      }).catch((err) => {
        console.log('err', err)
      })

    setTimeout(() => {
      source.cancel('我要取消了')
    }, 500)
  }
  const fetch1 = () => {
    axios.get('http://localhost:3004/json', {
      cancelToken: source1.token
    })
      .then((response) => {
        console.log('success', response)
      }).catch((err) => {
        console.log('err', err)
      })

    setTimeout(() => {
      source1.cancel('我要取消了1')
    }, 500)
  }
  return <div >
    <Button onClick={() => {
      fetch()

      setTimeout(() => {
        fetch1()
      }, 500)
    }} >
      触发请求
    </Button>
    <Button onClick={() => fetch()} >
      终止
    </Button>
  </div>
}

export default HelloWorld
