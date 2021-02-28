// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Component, RefObject } from 'react'
import ReactQuill from '../react-quill'
import '../quill/assets/quill.snow.css'
import './editor.css'
import Quill from '../quill'
import Delta from 'quill-delta'
import Emitter from '../quill/core/emitter'
import ImageResize from 'quill-image-resize-module-react'
import { message as antMessage, Input, Modal } from 'antd'

// ================== 自定义主题 ==================
// import { uploadImages } from './utils/upload'
import emitter from './utils/emitter'
import CustomSnowTheme from './custom-theme'

// ================== 自定义 format ==================
import Video from './formats/video'
import IndentStyle from './formats/indent'

const LinkBlot = Quill.import('formats/link')

Quill.register('modules/imageResize', ImageResize)

const block = Quill.import('blots/block')
block.tagName = 'PRE'
Quill.register(block, true)

// Config style attributors 通过行内样式控制，而不是通过添加 class
const sizeStyle = Quill.import('attributors/style/size')
const alignStyle = Quill.import('attributors/style/align')
const fontStyle = Quill.import('attributors/style/font')
fontStyle.whitelist = ['sans-serif', 'serif', 'monospace']
Quill.register(sizeStyle, true)
Quill.register(fontStyle, true)
Quill.register(IndentStyle, true)
Quill.register(alignStyle, true)
Quill.register('themes/custom-theme', CustomSnowTheme, true)

Quill.register('formats/local-video', Video, true)

class Editor extends Component {
  modules = {
    imageResize: {
      modules: ['Resize', 'DisplaySize']
    },
    toolbar: {
      container: [
        ['undo', 'redo'],
        [{ font: [false, 'sans-serif', 'serif', 'monospace'] }],
        [{ size: ['10px', false, '18px', '32px'] }],
        ['bold', 'italic', 'underline', 'strike', { color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }, { indent: '-1' }, { indent: '+1' }],
        ['clean'],
        ['link', 'image', 'video'],
        [{ script: 'sub' }, { script: 'super' }]
      ],
      handlers: {
        redo () {
          (this).quill.history.redo()
        },
        undo () {
          (this).quill.history.undo()
        },
        video: () => {
          this.setState({
            linkModalVisible: false,
            videoModalVisible: true
          })
        },
        link: (value) => {
          console.log('value', value)
          // 添加 link 时，value 为 true，删除 link 时，value 为 false
          const range = this.quill.getSelection(true)
          const [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index)

          // 隐藏 edit
          this.quill.theme.tooltip.edit('link')

          if (link != null) {
            // 如果点击链接区域，则进入编辑框
            const preview = LinkBlot.formats(link.domNode)
            const text = link.domNode.innerText
            this.handleEditLinkConfirm(preview, text)
          } else {
            const preview = this.quill.getText(range)
            this.setState({
              linkModalVisible: true,
              videoModalVisible: false,
              linkValue: 'http://',
              linkTitle: preview
            })
          }
        },
        image: () => {
          const { container } = this.quill.theme.modules.toolbar
          let fileInput = container.querySelector('input.ql-image[type=file]')
          if (fileInput == null) {
            fileInput = document.createElement('input')
            fileInput.setAttribute('type', 'file')
            fileInput.setAttribute(
              'accept',
              'image/png, image/jpeg'
            )
            fileInput.classList.add('ql-image')
            fileInput.addEventListener('change', () => {
              if (fileInput.files != null && fileInput.files[0] != null) {
                const image = fileInput.files[0]
                const formData = new FormData()
                formData.append('images', image)

                // TODO: 替换为上传图片  uploadImages(formData)

                Promise
                  .resolve('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg')
                  .then(res => {
                    const link = res
                    const length = (this.quill.getSelection() || {}).index || this.quill.getLength()
                    this.quill.insertEmbed(length, 'image', link, 'user')
                    this.quill.setSelection(length + 1)
                  }).catch(err => {
                    antMessage.error(this.t('helpcenter_image_upload_failed', 'Image upload failed'))
                  })
              }
            })
            container.appendChild(fileInput)
          }
          fileInput.click()
        }
      }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      videoModalVisible: false,
      linkModalVisible: false,
      videoValue: '',
      linkValue: '',
      linkTitle: '',
      modalVisible: false
    }
    this.quill = null
    this.reactQuillRef = React.createRef()
    this.rootRef = React.createRef()

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.restoreFocus = this.restoreFocus.bind(this)
    this.handleModalCancel = this.handleModalCancel.bind(this)
    this.handleModalConfirm = this.handleModalConfirm.bind(this)
    this.handleVideoModalCancel = this.handleVideoModalCancel.bind(this)
    this.handleVideoModalConfirm = this.handleVideoModalConfirm.bind(this)
    this.handleLinkModalCancel = this.handleLinkModalCancel.bind(this)
    this.handleLinkModalConfirm = this.handleLinkModalConfirm.bind(this)
    this.handleEditLinkConfirm = this.handleEditLinkConfirm.bind(this)
  }

  componentDidMount () {
    emitter.on('edit-link', this.handleEditLinkConfirm)
    this.attachQuillRefs()
  }

  componentWillUnmount () {
    emitter.off('edit-link', this.handleEditLinkConfirm)
  }

  handleEditLinkConfirm (linkValue, linkTitle) {
    this.setState({
      linkValue,
      linkTitle,
      linkModalVisible: true
    })
  }

  handleChange (value) {
    const { onChange } = this.props
    if (onChange) {
      onChange(value)
    }
  }

  handleBlur () {
    const { onBlur } = this.props
    if (onBlur) {
      onBlur()
    }
  }

  handleFocus () {
    const { onFocus } = this.props
    if (onFocus) {
      onFocus()
    }
  }

  handleModalCancel () {
    this.setState({
      modalVisible: false
    })
  }

  handleModalConfirm () {
    this.setState({
      modalVisible: false
    })
  }

  handleVideoModalCancel () {
    this.setState({
      videoModalVisible: false,
      videoValue: ''
    })
  }

  handleVideoModalConfirm () {
    // debugger
    let { videoValue } = this.state
    videoValue = videoValue.trim()

    if (!videoValue) {
      antMessage.error(this.t('helpcenter_video_iframe_cant_be_empty', 'Iframe code cannot be empty'))
      return
    }
    if (!videoValue.startsWith('<iframe')) {
      antMessage.error(this.t('helpcenter_video_iframe_foramt', 'Iframe code should be similar to <iframe>'))
      return
    }
    const range = this.quill.getSelection(true)
    this.quill.insertText(range.index, '\n', (Quill).sources.USER)
    this.quill.insertEmbed(range.index + 1, 'local-video', videoValue, Quill.sources.USER)
    this.quill.setSelection(range.index + 2, (Quill).sources.SILENT)
    this.setState({
      videoModalVisible: false,
      videoValue: ''
    })
  }

  handleLinkModalCancel () {
    this.setState({
      linkModalVisible: false,
      linkValue: '',
      linkTitle: ''
    })
  }

  handleLinkModalConfirm () {
    console.log('123')
    let { linkValue, linkTitle } = this.state
    linkValue = linkValue.trim()
    linkTitle = linkTitle.trim()

    if (!linkValue) {
      antMessage.error(this.t('helpcenter_link_cant_be_empty', 'link cannot be empty'))
      return
    }

    // 检查 linkValue 合法性, http 或者 https 开头
    if (!linkValue.startsWith('https://') && !linkValue.startsWith('http://')) {
      antMessage.error(this.t('helpcenter_link_foramt', 'link should startwith http:// or https://'))
      return
    }

    const { scrollTop } = this.quill.root
    const { linkRange } = this.quill.theme.tooltip

    console.log('linkRange', linkRange)

    if (linkRange) {
      // 当点击已有链接的链接时
      this.quill.deleteText(linkRange.index, linkRange.length)
      setTimeout(() => {
        // 必须使用 setTimeout 0, 否则插入会失败
        this.quill.insertText(linkRange.index, linkTitle || linkValue, 'link', linkValue)
        delete this.quill.theme.tooltip.linkRange
      }, 0)
      // this.quill.formatText(linkRange, 'link', linkValue, Emitter.sources.USER);
    } else {
      // 当选中文本，或者空光标直接点开 link modal 的时候

      // true 会触发 focus，导致丢失 linkRange
      const range = this.quill.getSelection(true)
      // 删除选中的文字，插入链接
      this.quill.deleteText(range.index, range.length)
      setTimeout(() => {
        this.quill.insertText(range.index, linkTitle || linkValue, 'link', linkValue)
      }, 0)
      

      // 手动插入空格，先不删除该代码，毕竟挺难写的
      // const currentIndex = range.index + (linkTitle || linkValue).length;
      // this.quill.updateContents(new Delta().retain(currentIndex).insert(' '));
      // this.quill.setSelection(currentIndex + 1);
    }
    this.quill.root.scrollTop = scrollTop

    this.setState({
      linkValue: '',
      linkTitle: '',
      linkModalVisible: false
    })
  }

  handleInputChange (valueStateName, value) {
    const newState = {}
    newState[valueStateName] = value
    this.setState(newState)
  }

  restoreFocus () {
    const { scrollTop } = this.quill.scrollingContainer
    this.quill.focus()
    this.quill.scrollingContainer.scrollTop = scrollTop
  }

  attachQuillRefs () {
    if (this.reactQuillRef && this.reactQuillRef.current && typeof this.reactQuillRef.current.getEditor === 'function') {
      this.quill = this.reactQuillRef.current.getEditor()
    }
  }

  t (key, defaultMessage, description) {
    // TODO: 多语言
    // const { intl } = this.props;
    // return intl.formatMessage({ id: key, defaultMessage, description });

    return defaultMessage
  }

  render () {
    const {
      videoModalVisible,
      linkModalVisible,
      modalVisible,
      videoValue,
      linkValue,
      linkTitle
    } = this.state
    const { value } = this.props

    return (
      <div ref={this.rootRef} className='rich-text-editor'>
        <ReactQuill
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={this.reactQuillRef}
          theme='custom-theme'
          modules={this.modules}
          value={value}
          onChange={this.handleChange}
          bounds='.rich-text-editor'
        />
        <Modal
          title={this.t('helpcenter_add_video', 'Add Video')}
          visible={videoModalVisible}
          onCancel={this.handleVideoModalCancel}
          onOk={this.handleVideoModalConfirm}
          className='video-modal'
          confirmText={this.t('helpcenter_btn_confirm', 'Confirm')}
          cancelText={this.t('helpcenter_btn_cancel', 'Cancel')}
        >
          <div className='video-tooltip-title'>
            {this.t('helpcenter_paste_iframe_tip', 'Paste <iframe/> code here to embed video')}
          </div>
          <Input
            type='textarea'
            className='video-edit-textarea'
            rows={6}
            value={videoValue}
            onChange={(e) => this.handleInputChange('videoValue', e.target.value)}
          />
          <div className='video-tooltip-title-desc'>
            {this.t('helpcenter_video_tip', 'Example: <iframe width="560" height="315" src="https://www.youtube.com/embed/KcOm0TNvKBA" frameborder="0" allowfullscreen></iframe>')}
          </div>
        </Modal>
        <Modal
          title={this.t('helpcenter_insert_link', 'Insert link')}
          visible={linkModalVisible}
          onCancel={this.handleLinkModalCancel}
          onOk={this.handleLinkModalConfirm}
          className='link-modal'
          confirmText={this.t('helpcenter_btn_confirm', 'Confirm')}
          cancelText={this.t('helpcenter_btn_cancel', 'Cancel')}
        >
          <div className='link-edit-title'>
            {this.t('helpcenter_insert_link_title', 'Title')}
          </div>
          <Input
            placeholder={linkValue}
            value={linkTitle}
            onChange={(e) => this.handleInputChange('linkTitle', e.target.value)}
          />
          <div className='link-edit-title'>
            {this.t('helpcenter_insert_link_link', 'Link')}
          </div>
          <Input
            placeholder='https://'
            value={linkValue}
            onChange={(e) => this.handleInputChange('linkValue', e.target.value)}
          />
          <div
            className='link-edit-select'
            onClick={() => this.setState({ modalVisible: true })}
          >
            {this.t('helpcenter_select_from_helpcenter', 'Select from Help Center')}
          </div>
        </Modal>
        {/* 从 help center 选择文章 */}
        {/* <ModalWithCategoryAndArticle
          visible={modalVisible}
          onCancel={this.handleModalCancel}
          confirmText={this.t('helpcenter_insert_article', 'Insert article')}
          onOk={items => {
            const item = items[0] || {};
            const { id: linkId, title: articleTitle } = item;
            // FIXME: 文章的链接待 HC 用户端 确定之后再做修改
            const mockLink = `https://www.baidu.com/?id=${linkId}`;
            // const
            this.setState({
              linkValue: mockLink,
              // 如果已经有值了，就不会覆盖已有的值。否则使用文章 title
              linkTitle: linkTitle || articleTitle || 'Default Title',
              modalVisible: false,
            });
          }}
        /> */}
      </div>
    )
  }
}

export default Editor
