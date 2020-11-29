import React, { Component, useContext } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import lodashGet from 'lodash.get'
import lodashSet from 'lodash.set'
// import { Tree } from 'antd'

let i = 0

const TreeContext = React.createContext({
  selectedKeys: [],
  expandedKeys: [],
  handleClick: () => {},
  onDragEnd: () => {},
  addItem: () => {},
  deleteItem: () => {},
  editPosition: [],
  editValue: '',
  saveItem: () => {},
  cancelEdit: () => {},
  onEditValueChange: () => {}
})

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // userSelect: 'none',
  // // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // 改变被拖拽时的样式
  // background: isDragging ? 'red' : 'grey',

  // 默认的拖拽样式
  ...draggableStyle
})

// 整个列表的样式
const getListStyle = (isDraggingOver) => ({
  // padding: grid,
  // width: 250
})

function TreeNode ({ data, level, position, index }) {
  const hasChildren = !!(data.children && data.children.length)
  const treeContext = useContext(TreeContext)
  const isSelected = treeContext.selectedKeys.includes(data.key)
  const isExpanded = treeContext.expandedKeys.includes(data.key)
  const editValue = treeContext.editValue

  let title = data.title
  console.log(position)
  const isEditing = treeContext.editPosition.join('') === position.join('')
  if (isEditing) {
    title = <input onClick={(e) => e.stopPropagation()} value={editValue} placeholder='输入' onChange={(e) => treeContext.onEditValueChange(e.target.value)} />
  }

  let prefix = null
  if (hasChildren) {
    if (isExpanded) {
      prefix = '-'
    } else {
      prefix = '+'
    }
  }

  return (
    <div
      data-position={position.join('==')}
      className={
        classNames('tree-node', `tree-node-level-${level}`)
      }>
      <div
        className='tree-node-content'
        onClick={() => treeContext.handleClick({
          key: data.key,
          isExpanded,
          hasChildren
        })}
        style={{
          color: isSelected ? 'red' : '#333'
        }}>
        {prefix}
        {title}
        {level > 1 && (
          <>
            <button onClick={(e) => {
              e.stopPropagation()
              treeContext.editItem(position)
            }} style={{ marginLeft: '20px' }}>
            编辑
            </button>
            <button onClick={(e) => {
              e.stopPropagation()
              treeContext.deleteItem(position, index)
            }} style={{ marginLeft: '20px' }}>
            删除
            </button>
            <button onClick={(e) => {
              e.stopPropagation()
              treeContext.saveEdit()
            }} style={{ marginLeft: '20px' }}>
            保存
            </button>
            <button onClick={(e) => {
              e.stopPropagation()
              treeContext.cancelEdit()
            }} style={{ marginLeft: '20px' }}>
            取消
            </button>
          </>
        )}
      </div>
      {
        isExpanded && (
          <DragDropContext onDragEnd={(result) => treeContext.onDragEnd(result, position.concat(['children']))} >
            <Droppable
              // droppableId 必须
              droppableId='droppable'
            >
              {(provided, snapshot) => (
                <div
                  className='tree-node-children'
                  {...provided.droppableProps}
                  // 注意 ref 属性必须指向真正的 dom，而不能是 React 实例
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {(data.children || []).map((childrenTree, childrenIndex) => {
                    return (
                      <Draggable key={childrenTree.key} draggableId={childrenTree.key} index={childrenIndex}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <TreeNode index={childrenIndex} position={position.concat(['children', childrenIndex])} level={level + 1} data={childrenTree} />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                  <button onClick={() => treeContext.addItem(position.concat(['children']))}>
                    我是添加按钮
                  </button>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )
      }
    </div>
  )
}

// 重新排序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class HelloWorld extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedKeys: [],
      selectedKeys: [],
      editPosition: [],
      editValue: '',
      treeData: [
        {
          title: 'Branch 1',
          key: 'Branch 1',
          children: [
            {
              title: 'Branch 1.1',
              key: 'Branch 1.1'
            },
            {
              title: 'Branch 1.2',
              key: 'Branch 1.2'
            }
          ]
        },
        {
          title: 'Branch 2',
          key: 'Branch 2',
          children: [
            {
              title: 'Branch 2.1',
              key: 'Branch 2.1'
            },
            {
              title: 'Branch 2.2',
              key: 'Branch 2.2'
            }
          ]
        },
        {
          title: 'Branch 3',
          key: 'Branch 3',
          children: []
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.onEditValueChange = this.onEditValueChange.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }
  componentDidMount () {
  }
  handleClick ({ key, isExpanded, hasChildren }) {
    const { expandedKeys } = this.state
    this.setState({
      selectedKeys: [key]
    })
    if (hasChildren) {
      if (isExpanded) {
        // 已经展开，那么就关闭
        const newExpandedKeys = expandedKeys.slice()
        const expandIndex = newExpandedKeys.findIndex(item => item === key)
        newExpandedKeys.splice(expandIndex, 1)
        console.log(expandedKeys, newExpandedKeys)
        this.setState({
          expandedKeys: newExpandedKeys
        })
      } else {
        // 关闭状态，就打开
        const newExpandedKeys = expandedKeys.slice()
        newExpandedKeys.push(key)
        this.setState({
          expandedKeys: newExpandedKeys
        })
      }
    }
  }
  onDragEnd (result, position) {
    const { treeData } = this.state
    const newTreeData = [...treeData]
    const items = lodashGet(newTreeData, position)

    if (!result.destination) {
      return
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )
    lodashSet(newTreeData, position, newItems)

    this.setState({
      treeData: newTreeData
    })
  }
  addItem (position) {
    const { treeData } = this.state
    const newTreeData = [...treeData]
    const items = lodashGet(newTreeData, position)

    const newIndex = i++

    items.push({
      title: `Branch 1.1.${newIndex}`,
      key: `Branch 1.1.${newIndex}`
    })

    lodashSet(newTreeData, position, items)
    this.setState({
      treeData: newTreeData
    })
  }
  deleteItem (position, index) {
    const { treeData } = this.state
    const newTreeData = [...treeData]
    // 删除时，是取父级的 position，因此取 position.length - 1
    const finalPosition = position.slice(0, position.length - 1)
    const items = lodashGet(newTreeData, finalPosition)
    items.splice(index, 1)
    lodashSet(newTreeData, finalPosition, items)
    this.setState({
      treeData: newTreeData
    })
  }
  editItem (position) {
    this.setState({
      editPosition: [...position]
    })
  }
  onEditValueChange (value) {
    console.log('editValue', value)
    this.setState({
      editValue: value
    })
  }
  saveEdit () {
    const { editValue, editPosition, treeData } = this.state
    const newValue = editValue.trim()
    if (!newValue) {
      console.log('值不能为空')
      return
    }
    const newTreeData = [...treeData]
    const item = lodashGet(newTreeData, editPosition)
    item.title = newValue
    lodashSet(newTreeData, editPosition, item)
    this.setState({
      treeData: newTreeData,
      editPosition: [],
      editValue: ''
    })
  }
  cancelEdit () {
    this.setState({
      editPosition: [],
      editValue: ''
    })
  }
  render = () => {
    const { treeData, expandedKeys, selectedKeys, editPosition, editValue } = this.state
    return (
      <div className='tree'>
        <TreeContext.Provider
          value={{
            expandedKeys,
            selectedKeys,
            handleClick: this.handleClick,
            onDragEnd: this.onDragEnd,
            addItem: this.addItem,
            deleteItem: this.deleteItem,
            editPosition,
            editItem: this.editItem,
            editValue,
            onEditValueChange: this.onEditValueChange,
            saveEdit: this.saveEdit,
            cancelEdit: this.cancelEdit
          }}
        >
          {
            treeData.map((rootTree, rootIndex) => {
              return <TreeNode key={rootTree.key} data={rootTree} level={1} index={rootIndex} position={[rootIndex]} />
            })
          }
        </TreeContext.Provider>
      </div>
    )
  }
}

export default HelloWorld
