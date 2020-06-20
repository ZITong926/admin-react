import * as React from "react"
import asynComponent from "@/components/asynComponent"
import { Route, Switch, Redirect } from "react-router-dom"
import { history, MyBrowserRouter } from "@/components/myBrowserRouter"

const AppLayout = React.lazy(() => import("@/layouts"))
const Login = React.lazy(() => import("@/pages/login"))
const Loading = asynComponent(() => import("@/components/Loading"))

const App = () => {
  return (
    <MyBrowserRouter history={history}>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact={true} render={() => <Redirect to="/app" />} />
          <Route path="/app" component={AppLayout} />
          <Route exact={true} path="/login" component={Login} />
        </Switch>
      </React.Suspense>
    </MyBrowserRouter>
  )
}

export default App
