import * as React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'

export const history = createBrowserHistory()

export class MyBrowserRouter extends React.Component<{ history: History<History.PoorMansUnknown> }> {
  public render() {
    return (
      <Router history={this.props.history} children={this.props.children} />
    )
  }
}