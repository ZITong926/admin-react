import * as React from "react"
import { Layout } from "antd"
import store from "@/stores/global"
import { observer } from "mobx-react"
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom"
import SiderBar from "@/layouts/SiderBar"
import HeaderBar from "@/layouts/HeaderBar"

import "./index.less"

const Dashboard = React.lazy(() => import("@/pages/login"))
const Formboard = React.lazy(() => import("@/pages/form"))
const Tableboard = React.lazy(() => import("@/pages/table"))
const Loading = React.lazy(() => import("@/components/Loading"))

const PageLayout = observer((props: RouteComponentProps) => {
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
              <Route exact={true} path="/app/dashboard" component={Dashboard} />
              <Route exact={true} path="/app/formboard" component={Formboard} />
              <Route
                exact={true}
                path="/app/tableboard"
                component={Tableboard}
              />
            </Switch>
          </React.Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

export default withRouter(PageLayout)
