import * as React from 'react'
import { Tree, Input } from 'antd'
import { TreeProps, DataNode } from 'antd/lib/tree'

interface BaseTreeProps extends TreeProps {
  hasSearch?: boolean
  searchValue?: string
  placeholder?: string
  style?: React.CSSProperties
  inputSearchStyle?: React.CSSProperties
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const loop = (treeData: DataNode[], searchValue: string): DataNode[] => {
  return treeData.map(item => {
    const index = item.title!.toString().indexOf(searchValue)
    const beforeStr = item.title!.toString().substr(0, index)
    const afterStr = item.title!.toString().substr(index + searchValue.length)
    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      )
    if (item.children) {
      return {
        title,
        key: item.key,
        children: loop(item.children, searchValue)
      }
    }
    return {
      title,
      key: item.key
    }
  })
}

const BaseTree = ({
  style,
  treeData,
  onChange,
  hasSearch,
  searchValue,
  placeholder,
  inputSearchStyle,
  ...rest
}: BaseTreeProps) => (
  <div style={style}>
    {hasSearch ? (
      <Input.Search
        value={searchValue}
        onChange={onChange}
        style={inputSearchStyle}
        placeholder={placeholder ? placeholder : '请输入'}
      />
    ) : null}
    <Tree
      {...rest}
      treeData={hasSearch ? loop(treeData!, searchValue!) : treeData!}
    />
  </div>
)

export default BaseTree
