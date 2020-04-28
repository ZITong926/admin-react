import * as React from 'react'

export default function asynComponent(importComponent: any) {
  class AsynComponent extends React.Component<any, any> {
    public constructor(props: any) {
      super(props)
      this.state = {
        component: null
      }
    }

    public componentDidMount() {
      importComponent().then((mod: any) => {
        this.setState({
          component: mod.default ? mod.default : mod
        })
      })
    }

    public render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }
  return AsynComponent
}