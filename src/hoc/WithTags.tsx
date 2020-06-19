import * as React from 'react'
import store from '@/stores/global'

export default function withTags(WrappedComponent: React.ComponentType):React.ComponentType{
  return class extends React.Component{
    public componentDidMount(){
      console.log('aa', this.props)
    }

    public render(){
      return <WrappedComponent />
    }
  }
}