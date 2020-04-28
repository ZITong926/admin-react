import * as React from "react"
import { CSSTransition } from "react-transition-group"

import "./index.less"

interface ICssTransitionProps {
  in: boolean
  timeout: number | { appear?: number; enter?: number; exit?: number }
}

const WrapCssTransition = (props: ICssTransitionProps) => (
  <CSSTransition in={props.in} classNames="slide" timeout={props.timeout}>
    <div className="slide">I'll receive my-node-* classes</div>
  </CSSTransition>
)

export default WrapCssTransition
