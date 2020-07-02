import * as React from 'react'
import { Transition } from 'react-transition-group'

import './index.less'

interface ITransitionProps {
  in: boolean
  name: string
  timeout: number | { appear?: number; enter?: number; exit?: number }
}

const WrapTransition = (props: ITransitionProps) => (
  <Transition in={props.in} timeout={props.timeout}>
    {(state) => (
      <div className={`${props.name} ${props.name}-${state}`}>
        <div style={{ background: '#ddd', width: 500, height: 900 }} />
      </div>
    )}
  </Transition>
)

export default WrapTransition
