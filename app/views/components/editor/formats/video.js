import Quill from '../../quill'

const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class Video extends BlockEmbed {
  static create (value) {
    // eslint-disable-next-line no-unused-vars
    const node = super.create(value)
    // 创建 div
    const div = document.createElement('div')
    div.innerHTML = value.trim()
    return div
  }

  static formats (domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static sanitize (url) {
    return Link.sanitize(url) // eslint-disable-line import/no-named-as-default-member
  }

  // 复制粘贴的时候会用到 Video.value(粘贴的dom)，比如粘贴的 dom 是  <iframe src="xx" width="xx" />
  // 那么此时需要从中获取到对应的 html 字符串，再传给 statia create 方法
  static value (domNode) {
    return domNode.outerHTML
  }

  format (name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }

  html () {
    const { video } = this.value()
    return `<a href="${video}">${video}</a>`
  }
}
Video.blotName = 'local-video'
// ATTENTION: 不能设置 className，否则 Parchment.query 找不到这个 Video 类
// Video.className = 'ql-local-video-container';
Video.tagName = 'IFRAME'

export default Video
