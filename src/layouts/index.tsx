import * as React from "react"
import { Layout } from "antd"
import store from "@/stores/global"
import { observer } from "mobx-react"
import SiderBar from "@/layouts/SiderBar"
import HeaderBar from "@/layouts/HeaderBar"
import RouteConfig from "@/mock/routeConfig"
import TagsNavBar from "@/components/TagsNavBar"
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom"

import "./index.less"

const Loading = React.lazy(() => import("@/components/Loading"))

const PrivateRoute = (
  Comp: React.ComponentType,
  item: IGloabalSpace.IRouteData
) => {
  if (!store.isLogin) {
    return (
      <Redirect to="/login" />
    )
  }
  store.setTagsNavData({
    path: item.path,
    title: item.title
  })
  return <Comp />
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
        <TagsNavBar
          tagsNavData={store.tagsNavData}
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
              {RouteConfig.map((d) => (
                <Route
                  exact={true}
                  path={d.path}
                  render={() => PrivateRoute(d.component, d)}
                />
              ))}
            </Switch>
          </React.Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

export default withRouter(PageLayout)
