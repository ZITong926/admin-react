import * as React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

import './index.less'
import BaseTree from '@/components/BaseTree'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const BForm = () => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true
            },
            {
              title: 'leaf',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1'
        }
      ]
    }
  ]

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="form-page">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
        treeData={treeData}
        autoExpandParent={true}
        searchValue={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  )
}

export default BForm
