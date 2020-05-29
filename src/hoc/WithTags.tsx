import * as React from 'react'

export default function withTags(WrappedComponent: React.ComponentType){
  return class extends React.Component{
    public componentDidMount(){
      console.log('aa', this.props)
    }

    public render(){
      return <WrappedComponent />
    }
  }
}