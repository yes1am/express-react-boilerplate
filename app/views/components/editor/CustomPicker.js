import Quill from '../quill'
import DropdownSvg from './assets/arrow-down-s.svg'

const Picker = Quill.import('ui/picker')

// 为了自定义 dropdown icon
class CustomPicker extends Picker {
  buildLabel () {
    const label = document.createElement('span')
    label.classList.add('ql-picker-label')
    label.classList.add('ql-picker-label-dropdown')
    label.innerHTML = DropdownSvg
    label.tabIndex = 0
    label.setAttribute('role', 'button')
    label.setAttribute('aria-expanded', 'false')
    this.container.appendChild(label)
    return label
  }
}

export default CustomPicker
