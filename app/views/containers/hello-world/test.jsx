import React, { useEffect, useRef, useState } from 'react'

function Mutation () {
  const rootRef = useRef(null)
  const ob = useRef(null)
  const [showChild, setShowChild] = useState(false)
  const [error, setError] = useState(false)
  const [opened, setOpened] = useState(true)
  useEffect(() => {
    // 需要观察的节点
    const el = rootRef.current

    function callback (mutationList, observer) {
      console.log({ mutationList })
      mutationList.forEach((mutation) => {
        switch (mutation.type) {
          case 'childList':
            console.log('新增或移除节点')
            /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
               mutation.removedNodes */
            break
          case 'attributes':
            console.log('改变属性')
            /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
               该属性之前的值为 mutation.oldValue */
            break
          case 'characterData':
            console.log('改变值')
        }
      })
    }

    // 需要观察哪些变化
    const observerOPtions = {
      childList: true, // 观察子树变化
      attributes: true, // 观察属性变化
      subtree: true, // 观察后代节点，，默认为 false
      characterData: true
    }

    const observer = new MutationObserver(callback)

    ob.current = {
      open: () => {
        console.log('开启')
        observer.observe(el, observerOPtions)
      },
      close: () => {
        console.log('关闭')
        observer.disconnect()
      }
    }
    ob.current.open()
    return () => {
      // 停止观察
      ob.current.close()
    }
  }, [])
  return (
    <div className='App' ref={rootRef}>
      <div onClick={() => {
        if (opened) {
          ob.current.close()
        } else {
          ob.current.open()
        }
        setOpened(!opened)
      }}>
        正在监听: {JSON.stringify(opened)}
      </div>
      <h1 style={error ? { color: 'red' } : null}>React 模板, 支持 SCSS</h1>
      <div onClick={() => setShowChild(!showChild)}>点击我改变子树</div>
      <div onClick={() => setError(!error)}>点击我改变子树属性</div>
      {showChild && <div>新增元素</div>}
      <div style={{ resize: 'both', border: '1px solid blue', overflow: 'auto' }}>
        监听宽高变化
      </div>
    </div>
  )
}

function Resize () {
  const rootRef = useRef(null)
  const ob = useRef(null)
  const [opened, setOpened] = useState(true)
  useEffect(() => {
    // 需要观察的节点
    const el = rootRef.current

    const resizeObserver = new ResizeObserver(entries => {
      console.log({ entries })
    })

    ob.current = {
      open: () => {
        console.log('开启')
        resizeObserver.observe(el)
      },
      close: () => {
        console.log('关闭')
        resizeObserver.disconnect()
      }
    }
    ob.current.open()
    return () => {
      // 停止观察
      ob.current.close()
    }
  }, [])
  return (
    <div className='App' style={{ padding: 200 }} ref={rootRef}>
      <div onClick={() => {
        if (opened) {
          ob.current.close()
        } else {
          ob.current.open()
        }
        setOpened(!opened)
      }}>
        正在监听: {JSON.stringify(opened)}
      </div>
      <h1>React 模板, 支持 SCSS</h1>
    </div>
  )
}

export default function App () {
  return <>
    <Mutation />
    <Resize />
  </>
}
