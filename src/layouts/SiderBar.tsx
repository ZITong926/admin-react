import * as React from "react"
import { Layout, Menu } from "antd"
import { ClickParam } from "antd/lib/menu"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Icon as LegacyIcon } from "@ant-design/compatible"

interface ISiderBarProps extends RouteComponentProps {
  collapsed: boolean
  handleMenu: (value: ClickParam) => void
}

interface IMenuList {
  icon: string
  title: string
  path?: string
  children?: IMenuList[]
}

const allMenus: IMenuList[] = [
  {
    title: "首页",
    icon: "home",
    path: "/app",
  },
  {
    title: "Form",
    icon: "home",
    path: "/app/formboard",
  },
  {
    title: "table",
    icon: "bars",
    path: "/app/tableboard",
  },
  {
    title: "compass",
    icon: "bars",
    children: [
      {
        title: "Form",
        icon: "home",
        path: "/app/loading",
      },
    ],
  },
  {
    title: "compass",
    icon: "bars",
    children: [
      {
        title: "Form",
        icon: "home",
        children: [
          {
            title: 'aa',
            icon: 'home',
            path: '/app/compoents'
          }
        ]
      },
    ],
  }
]

const injectMenu = (allMenus: Array<IMenuList>) => {
  return allMenus.map((item) => {
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
        {injectMenu(allMenus)}
      </Menu>
    </Layout.Sider>
  )
}

export default withRouter(SiderBar)
