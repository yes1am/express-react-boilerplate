import EventEmitter from 'eventemitter3'
import logger from './logger'

let debug = logger('quill:events')

const EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click']

EVENTS.forEach(function (eventName) {
  document.addEventListener(eventName, (...args) => {
    [].slice.call(document.querySelectorAll('.ql-container')).forEach((node) => {
      if (eventName === 'mouseup') {
        // console.log(node.__quill, node.__quill.emitter)
      }
      // TODO use WeakMap
      if (node.__quill && node.__quill.emitter) {
        node.__quill.emitter.handleDOM(...args)
      }
    })
  })
})

class Emitter extends EventEmitter {
  constructor () {
    super()
    this.listeners = {}
    this.on('error', debug.error)
  }

  emit () {
    debug.log.apply(debug, arguments)
    super.emit.apply(this, arguments)
  }

  handleDOM (event, ...args) {
    if (event.type === 'mouseup') {
      // console.log('444', this.listeners[event.type])
    }
    (this.listeners[event.type] || []).forEach(function ({ node, handler }) {
      if (event.target === node || node.contains(event.target)) {
        // console.log(event.type, 'event.type')
        handler(event, ...args)
      }
    })
  }

  listenDOM (eventName, node, handler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push({ node, handler })
  }
}

Emitter.events = {
  EDITOR_CHANGE: 'editor-change',
  SCROLL_BEFORE_UPDATE: 'scroll-before-update',
  SCROLL_OPTIMIZE: 'scroll-optimize',
  SCROLL_UPDATE: 'scroll-update',
  SELECTION_CHANGE: 'selection-change',
  TEXT_CHANGE: 'text-change'
}
Emitter.sources = {
  API: 'api',
  SILENT: 'silent',
  USER: 'user'
}

export default Emitter
