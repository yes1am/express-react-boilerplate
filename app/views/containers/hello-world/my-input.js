import React, { Component } from 'react'

export default class MyInput extends Component {
  constructor (props) {
    super(props)
    const value = (typeof props.value === 'undefined' ? props.defaultValue : props.value) || ''
    this.state = {
      value
    }
    this.onChange = this.onChange.bind(this)
  }
  // 可以替代 componentWillReceiveProps
  // static getDerivedStateFromProps (props, state) {
  //   console.log('1')
  //   if ('value' in props && props.value !== state.value) {
  //     return {
  //       value: props.value
  //     }
  //   }
  //   return null
  // }
  UNSAFE_componentWillReceiveProps (nextProps) {
    if ('value' in this.props && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }
  onChange (e) {
    const newValue = e.target.value
    const { onChange } = this.props
    if (!('value' in this.props)) {
      this.setState({
        value: newValue
      })
    }

    onChange && onChange(newValue)
  }
  render () {
    const { value } = this.state
    console.log(value)
    return (
      <input
        type='text'
        onChange={this.onChange}
        value={value}
      />
    )
  }
}
