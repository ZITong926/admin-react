import * as React from "react"
import { Input, Form, InputNumber, Select } from "antd"

interface EditTableCellProps extends React.HtmlHTMLAttributes<HTMLElement> {
  type?: string
  editing: boolean
}

const EditFormComponent: React.FC<any> = ({ type, ...rest }) => {
  const renderType = (type?: string) => {
    switch (type) {
      case "input":
        return <Input />
      case "inputNumber":
        return <InputNumber />
      case "select":
        return <Select>{}</Select>
    }
  }

  return <Form.Item>{renderType(type)}</Form.Item>
}

export const EditTableCell: React.FC<EditTableCellProps> = ({
  type,
  children,
  editing,
  ...rest
}) => {
  return (
    <td {...rest}>
      {editing ? (
        <EditFormComponent type={type} {...rest} />
      ) : (
        <NormalCell {...rest} />
      )}
    </td>
  )
}

const NormalCell: React.FC<any> = ({ children, ...rest }) => (
  <td {...rest}>
    <div>{children[1]}</div>
  </td>
)
