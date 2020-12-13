import Quill from '../../quill'

const Parchment = Quill.import('parchment')

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9]
class IndentAttributor extends Parchment.Attributor.Style {
  add (node, originValue) {
    let value = originValue
    if (value === '+1' || value === '-1') {
      const indent = this.value(node) || 0
      value = (value === '+1' ? (indent + 1) : (indent - 1))
    }
    if (value === 0) {
      this.remove(node)
      return true
    }
    return super.add(node, `${value}em`)
  }

  value (node) {
    return parseFloat(super.value(node)) || undefined
  }
}

const IndentStyle = new IndentAttributor('indent', 'margin-left', {
  scope: Parchment.Scope.BLOCK,
  whitelist: levels.map(tmp => `${tmp}em`)
})

export default IndentStyle
