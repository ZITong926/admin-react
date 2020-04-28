import * as React from "react"
import store from '@/stores/global'
import { observer } from "mobx-react"
import asynComponent from "@/components/asynComponent"
import { Route, Switch, Redirect, RouteProps } from "react-router-dom"
import { history, MyBrowserRouter } from "@/components/myBrowserRouter"

const AppLayout = React.lazy(() => import("@/layouts"))
const Login = React.lazy(() => import("@/pages/login"))
const Loading = asynComponent(() => import("@/components/Loading"))

const App = observer(() => {
  
  const PrivateRoute = ({ component, ...rest }: RouteProps) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          store.isLogin ? (
            React.createElement(component!, props)
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

  const PublicRoute = ({ component, ...rest }: RouteProps) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          store.isLogin ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component!, props)
          )
        }
      />
    )
  }

  return (
    <MyBrowserRouter history={history}>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Redirect to="/app/dashboard" />}
          />
          <Route
            path="/app"
            exact={true}
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PublicRoute exact={true} path="/login" component={Login} />
          <PrivateRoute path="/app" component={AppLayout} />
        </Switch>
      </React.Suspense>
    </MyBrowserRouter>
  )
})

export default App
