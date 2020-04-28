import * as React from "react"
import store from "@/stores/global"
import { observer } from "mobx-react"
import { Form, Input, Button } from "antd"
import { history } from '@/components/myBrowserRouter'
import { UserOutlined, LockOutlined } from "@ant-design/icons"

import "./index.less"

const Login = observer(() => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    store.loginIn()
    history.push('/app')
  }

  return (
    <div className="login">
      <div className="login-wrapper">
        <Form
          onFinish={onFinish}
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default Login
