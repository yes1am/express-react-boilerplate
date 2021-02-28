/* eslint-disable max-classes-per-file */
import Quill from '../quill'
import Emitter from '../quill/core/emitter'
// import BaseTheme, { BaseTooltip } from 'quill/themes/base';
import { Range } from '../quill/core/selection'
import extend from 'extend'
import BaseTheme, { BaseTooltip } from './base-theme'
import emitter from './utils/emitter'
// 使用自定义图标
// import icons from './icon'
// 使用默认图标
const icons = Quill.import('ui/icons')

// 只能用 Quill.import，不能使用 import ... from ..., 否则点击已有链接的文字，无法弹出编辑窗
const LinkBlot = Quill.import('formats/link')

const TOOLBAR_CONFIG = [
  [{ header: ['1', '2', '3', false] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean']
]

class SnowTooltip extends BaseTooltip {
  constructor (quill, bounds) {
    super(quill, bounds)
    this.preview = this.root.querySelector('a.ql-preview')
  }

  listen () {
    super.listen()
    this.root.querySelector('a.ql-action').addEventListener('click', event => {
      if (this.root.classList.contains('ql-editing')) {
        this.save()
      } else {
        // 抛出 edit-link 事件
        emitter.emit('edit-link', this.preview.textContent, this.preview.dataset.text)
        this.edit('link', this.preview.textContent)
      }
      event.preventDefault()
    })
    this.root.querySelector('a.ql-remove').addEventListener('click', event => {
      if (this.linkRange != null) {
        const range = this.linkRange
        this.restoreFocus()
        this.quill.formatText(range, 'link', false, Emitter.sources.USER)
        delete this.linkRange
      }
      event.preventDefault()
      this.hide()
    })
    this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
      if (range == null) {
        return
      }

      console.log('SELECTION_CHANGE')

      // 如果不是点击链接区域，就删除 linkRange
      // 否则点击链接中间，出现 tooktip => 点击链接末尾 => 点击 link toolbar， 并确认插入链接，会直接替换了已有的链接
      delete this.linkRange
      if (range.length === 0 && source === Emitter.sources.USER) {
        const [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index)
        if (link != null) {
          console.log('创建 link Range')
          // 如果点击的是链接区域
          this.linkRange = new Range(range.index - offset, link.length())
          const preview = LinkBlot.formats(link.domNode)
          const text = link.domNode.innerText
          this.preview.dataset.text = text
          this.preview.textContent = preview
          this.preview.setAttribute('href', preview)
          this.show()
          this.position(this.quill.getBounds(this.linkRange))
          return
        }
      }
      this.hide()
    })
  }

  show () {
    super.show()
    this.root.removeAttribute('data-mode')
  }
}
SnowTooltip.TEMPLATE = [
  '<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>',
  '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
  '<a class="ql-action"></a>',
  '<a class="ql-remove"></a>'
].join('')

class SnowTheme extends BaseTheme {
  constructor (quill, options) {
    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG
    }
    super(quill, options)
    this.quill.container.classList.add('ql-snow')
  }

  extendToolbar (toolbar) {
    toolbar.container.classList.add('ql-snow')
    this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), icons)
    this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), icons)
    this.tooltip = new SnowTooltip(this.quill, this.options.bounds)
    if (toolbar.container.querySelector('.ql-link')) {
      this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, (range, context) => {
        toolbar.handlers.link.call(toolbar, !context.format.link)
      })
    }
  }
}

SnowTheme.DEFAULTS = extend(true, {}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link (value) {
          // 添加 link 时，value 为 true，删除 link 时， value 为 false
          if (value) {
            const range = this.quill.getSelection()
            if (range == null || range.length === 0) {
              return
            }
            let preview = this.quill.getText(range)
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
              preview = `mailto:${preview}`
            }
            const { tooltip } = this.quill.theme
            tooltip.edit('link', preview)
          } else {
            this.quill.format('link', false)
          }
        }
      }
    }
  }
})

export default SnowTheme
