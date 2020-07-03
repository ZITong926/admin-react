import * as React from 'react'
import { Layout, Menu } from 'antd'
import MenuList from '@/mock/menuConfig'
import { ClickParam } from 'antd/lib/menu'
import { DesktopOutlined } from '@ant-design/icons'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface ISiderBarProps extends RouteComponentProps {
  collapsed: boolean
  handleMenu: (value: ClickParam) => void
}

const injectMenu = (MenuList: IGloabalSpace.IMenuData[]) => {
  return MenuList.map(item => {
    if (item.children && item.children.length > 0) {
      return (
        <Menu.SubMenu
          key={item.title}
          title={
            <span>
              <DesktopOutlined />
              <span>{item.title}</span>
            </span>
          }
        >
          {injectMenu(item.children)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.path}>
        <DesktopOutlined />
        <span className="nav-text">{item.title}</span>
      </Menu.Item>
    )
  })
}

const SiderBar = (props: ISiderBarProps) => {
  return (
    <Layout.Sider trigger={null} collapsible={true} collapsed={props.collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" onClick={props.handleMenu}>
        {injectMenu(MenuList)}
      </Menu>
    </Layout.Sider>
  )
}

export default withRouter(SiderBar)
