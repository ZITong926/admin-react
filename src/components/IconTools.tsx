import * as React from 'react'
import { Row, Col, Tooltip, Button } from 'antd'
import {
  UpOutlined,
  EditOutlined,
  SaveOutlined,
  DownOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons'

interface IIconToolsProps {
  icons: Array<{
    name: string
    title: string
    disabled: boolean
    action: () => void
  }>
  gutter: number
  className?: string
  style?: React.CSSProperties
}

const renderIcon = (name: string) => {
  switch (name) {
    case 'edit':
      return <EditOutlined />
    case 'delete':
      return <DeleteOutlined />
    case 'plus':
      return <PlusOutlined />
    case 'save':
      return <SaveOutlined />
    case 'up':
      return <UpOutlined />
    case 'down':
      return <DownOutlined />
    default:
      return null
  }
}

const IconTools = ({ icons, gutter, className, style }: IIconToolsProps) => (
  <Row gutter={gutter} className={className} style={style}>
    {icons.map(t => (
      <Col key={t.name}>
        <Tooltip title={t.title}>
          <Button
            size="small"
            type="ghost"
            icon={renderIcon(t.name)}
            onClick={() => t.action()}
          />
        </Tooltip>
      </Col>
    ))}
  </Row>
)

export default IconTools
