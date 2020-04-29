import * as React from "react"
import { Breadcrumb, Layout } from "antd"
import { Icon } from "@ant-design/compatible"
import { history } from "@/components/myBrowserRouter"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"

interface IHeaderProps {
  collapsed: boolean
  toggleCollapsed: () => void
  breadcrumbList: Array<{ title: string; path: string; icon: string }>
}

const HeaderBar = (props: IHeaderProps) => {
  const handleClick = (path?: string) => {
    if (!path) return
    if (history.location.pathname !== path) {
      history.push(path)
    }
  }

  const BreadcrumbElement = (
    <Breadcrumb className="admin-breadcrumb">
      <Breadcrumb.Item onClick={() => handleClick("/app")}>
        <Icon type="home" />
        <span>首页</span>
      </Breadcrumb.Item>
      {props.breadcrumbList.map((item, index) => {
        return (
          <Breadcrumb.Item
            key={item.title + index}
            onClick={() => handleClick(item.path)}
          >
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )

  return (
    <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="pull-left">
        {React.createElement(
          props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: props.toggleCollapsed,
          }
        )}
      </div>
      <div className="breadcrumb pull-left">{BreadcrumbElement}</div>
    </Layout.Header>
  )
}

export default HeaderBar
