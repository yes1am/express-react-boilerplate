import React, { Component, useState } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

class Editable extends Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
    this.confirmRef = React.createRef()
    this.cancelRef = React.createRef()
    this.state = {
      editing: false,
      value: props.value || ''
    }

    this.enableEditing = this.enableEditing.bind(this)
    this.disableEditing = this.disableEditing.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.stopImmediatePropagation = this.stopImmediatePropagation.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  handleDocumentClick () {
    this.handleCancel()
  }

  enableEditing (cb) {
    const { editing } = this.state
    if (!editing) {
      this.setState({
        editing: true
      }, () => {
        cb && cb()
      })
    }
  }

  disableEditing (cb) {
    const { editing } = this.state
    if (editing) {
      this.setState({
        editing: false
      }, () => {
        cb && cb()
      })
    }
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleCancel () {
    this.disableEditing(() => {
      this.setState({
        value: this.props.value
      })
    })
  }

  stopImmediatePropagation (e) {
    e.nativeEvent.stopImmediatePropagation()
  }

  handleConfirm () {
    const { onChange } = this.props
    const { value } = this.state
    this.disableEditing(() => {
      onChange && onChange(value)
    })
  }

  render () {
    const { placeholder, value: propsValue } = this.props
    const { editing, value } = this.state
    const showValue = propsValue || placeholder

    return (
      <div className='editor-container' onClick={this.stopImmediatePropagation}>
        {
          editing
            ? <div className='input-wrap' >
              <input
                placeholder={placeholder}
                value={value}
                ref={this.inputRef}
                onChange={this.handleChange}
              />
              <button ref={this.confirmRef} className='confirm' onClick={this.handleConfirm}>
                确定
              </button>
              <button ref={this.cancelRef} className='cancel' onClick={this.handleCancel}>
                取消
              </button>
            </div>
            : <div
              className='summary-val'
              onClick={(e) => {
                this.enableEditing(() => {
                  this.inputRef.current.focus()
                })
              }}
            >
              {showValue}
            </div>
        }
      </div>
    )
  }
}

class HelloWorld extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
      placeholder: 'Input your name...'
    }
  }

  handleChange = value => {
    this.setState({
      value
    })
  };

  render = () => {
    const { value, placeholder } = this.state
    return (
      <div>
        <Editable
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange} // handle innerHTML change
        />
        <div>current value: {value}</div>
      </div>
    )
  };
}

export default HelloWorld
