import * as React from "react"
import { FormInstance } from "antd/lib/form"
import { Input, Form, InputNumber, Select } from "antd"

interface EditTableCellProps extends React.HtmlHTMLAttributes<HTMLElement> {
  type?: string
  editing: boolean
  form?: FormInstance
  selectValue?: Array<IGloabalSpace.ISelectValue>
}

const EditFormComponent: React.FC<Omit<EditTableCellProps, 'editing'>> = ({ type, selectValue, form, ...rest }) => {
  const renderType = (type?: string) => {
    switch (type) {
      case "input":
        return <Input />
      case "inputNumber":
        return <InputNumber />
      case "select":
        return <Select>
          {selectValue!.map(t =>
            <Select.Option key={t.value} value={t.value}>{t.text}</Select.Option>
          )}
        </Select>
      default:
        return <div />
    }
  }
  return <Form form={form}>
    <Form.Item>
      {renderType(type)}
    </Form.Item>
  </Form>
}

export const EditTableCell: React.FC<EditTableCellProps> = ({
  editing,
  ...rest
}) => {
  const [form] = Form.useForm()
  return (
    <td {...rest}>
      {editing ? (
        <EditFormComponent form={form} {...rest} />
      ) : (
          <NormalCell {...rest} />
        )}
    </td>
  )
}

const NormalCell: React.FC<any> = ({ children, ...rest }) => (
  <div>{children[1]}</div>
)
