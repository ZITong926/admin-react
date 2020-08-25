import * as React from 'react'
import BaseTree from '@/components/BaseTree'
import { Form, Input, Button, Checkbox } from 'antd'

import './index.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const x = 3
const y = 2
const z = 1
const gData: any[] = []

const generateData = (_level: number, _preKey?: string, _tns?: any[]) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key })
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}

generateData(z)

const dataList: { key: any; title: any }[] = []

const generateList = (data: string | any[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const { key } = node
    dataList.push({ key, title: key })
    if (node.children) {
      generateList(node.children)
    }
  }
}

generateList(gData)

const getParentKey = (key: any, tree: any): any => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item: { key: any }) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

class BForm extends React.Component<any, any> {
  public constructor(props: any) {
    super(props)
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true
    }
  }

  public onFinish = (values: any) => {
    console.log('Success:', values)
  }

  public onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  public onExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  public handleOnChange = (e: any) => {
    const { value } = e.target
    const expandedKeys = dataList
      .map((t: { title: string | any[]; key: any }) => {
        if (t.title.indexOf(value) > -1) {
          return getParentKey(t.key, gData)
        }
        return null
      })
      .filter(
        (item: any, index: any, self: string | any[]) =>
          item && self.indexOf(item) === index
      )
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
  }

  public render() {
    return (
      <div className="form-page">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <BaseTree
          showLine={true}
          hasSearch={true}
          treeData={gData}
          autoExpandParent={true}
          onChange={this.handleOnChange}
          searchValue={this.state.searchValue}
          expandedKeys={this.state.expandedKeys}
        />
      </div>
    )
  }
}

export default BForm
