import * as React from "react"
import { Layout, Menu } from "antd"
import { ClickParam } from "antd/lib/menu"
import { MenuList } from '@/mock/menu'
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Icon as LegacyIcon } from "@ant-design/compatible"

interface ISiderBarProps extends RouteComponentProps {
  collapsed: boolean
  handleMenu: (value: ClickParam) => void
}

const injectMenu = (MenuList: IMenuSpace.IMenuList[]) => {
  return MenuList.map((item) => {
    if (item.children && item.children.length) {
      return (
        <Menu.SubMenu
          key={item.path}
          title={
            <span>
              <LegacyIcon type={item.icon} />
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
        <LegacyIcon type={item.icon} />
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
