import * as React from 'react'
import { Button, List } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './index.less'

interface ITransitionGroupProps {
  items: Array<{ id: number; text: string }>
  setItem: React.Dispatch<
    React.SetStateAction<
      {
        id: number
        text: string
      }[]
    >
  >
}

const WrapTransitionGroup = (props: ITransitionGroupProps) => {
  const { items, setItem } = props
  return (
    <List bordered={true}>
      <TransitionGroup>
        {items.map(d => (
          <CSSTransition key={d.id} timeout={500} classNames="fade">
            <List.Item>
              <Button
                icon={<CloseOutlined />}
                // type="danger"
                onClick={() =>
                  setItem(items => items.filter(item => item.id !== d.id))
                }
              />
              {d.text}
            </List.Item>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  )
}

export default WrapTransitionGroup
