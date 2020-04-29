import * as React from "react"
import { Layout } from "antd"
import store from "@/stores/global"
import { observer } from "mobx-react"
import MenuList from "@/mock/menu"
import SiderBar from "@/layouts/SiderBar"
import HeaderBar from "@/layouts/HeaderBar"
import { Route, Switch, withRouter, RouteProps, Redirect } from "react-router-dom"

import "./index.less"

const Loading = React.lazy(() => import("@/components/Loading"))

const PrivateRoute = ({ component, title, path, ...rest }: RouteProps & { title: string } ) => {
  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        store.isLogin ? (
          store.setTagsNavData({ title, path! }) && React.createElement(component!, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  )
}

const PageLayout = observer(() => {
  return (
    <Layout className="layout">
      <SiderBar collapsed={store.collapsed} handleMenu={store.handleMenu} />
      <Layout className="site-layout">
        <HeaderBar
          collapsed={store.collapsed}
          breadcrumbList={store.breadcrumbList}
          toggleCollapsed={store.toggleCollapsed}
        />
        <Layout.Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <React.Suspense fallback={<Loading />}>
            <Switch>
              {MenuList.map((d) => (
                <PrivateRoute exact={true} path={d.path!} title={d.title} component={d.component} />
              ))}
            </Switch>
          </React.Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

export default withRouter(PageLayout)
