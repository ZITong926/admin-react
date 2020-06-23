import * as React from "react"
import { FormProps } from "antd/lib/form/Form"
import { DataNode } from "rc-tree-select/lib/interface"
import { Form, Select, Input, Spin, TreeSelect } from "antd"
import { CheckedStrategy } from "rc-tree-select/lib/utils/strategyUtil"

export interface FormFieldsProps {
  name: string
  label: string
  type?: string
  multiple?: boolean
  disabled?: boolean
  fetching?: boolean
  required?: boolean
  allowClear?: boolean
  placeholder?: string
  showSearch?: boolean
  initialValue?: any
  treeData?: DataNode[]
  filterOption?: boolean
  labelInValue?: boolean
  treeCheckable?: boolean
  onSearch?: (value: string) => void
  showCheckedStrategy?: CheckedStrategy
  selectValue?: Array<{ text: string; value: string }>
}

interface SimpleFormProps extends FormProps {
  fields: FormFieldsProps[]
  handleFinished: (values: any) => void
}

const SimpleForm: React.FC<SimpleFormProps> = ({ fields, handleFinished, form }) => {
  
  const renderType = (item: FormFieldsProps) => {
    switch (item.type) {
      case "select": // 有数据、可进行选择和搜索
        return (
          <Select
            optionFilterProp="children"
            allowClear={!!item.allowClear}
            showSearch={!!item.showSearch}
            labelInValue={!!item.labelInValue}
            placeholder={item.placeholder ? item.placeholder : "请选择"}
            disabled={
              !!item.disabled ||
              !item.selectValue ||
              item.selectValue!.length === 0
            }
          >
            {item.selectValue!.map((t) => (
              <Select.Option key={t.value} value={t.value}>
                {t.text}
              </Select.Option>
            ))}
          </Select>
        )
      case "search_select": // 无数据 根据输入的数据搜索
        return (
          <Select
            onSearch={item.onSearch}
            disabled={!!item.disabled}
            allowClear={!!item.allowClear}
            showSearch={!!item.showSearch}
            filterOption={!!item.filterOption}
            labelInValue={!!item.labelInValue}
            placeholder={item.placeholder ? item.placeholder : "请检索"}
            notFoundContent={item.fetching ? <Spin size="small" /> : null}
          >
            {item.selectValue!.map((t) => (
              <Select.Option key={t.value} value={t.value}>
                {t.text}
              </Select.Option>
            ))}
          </Select>
        )
      case "tree_select":
        return (
          <TreeSelect
            treeData={item.treeData}
            onSearch={item.onSearch}
            multiple={!!item.multiple}
            showSearch={!!item.showSearch}
            allowClear={!!item.allowClear}
            treeCheckable={!!item.treeCheckable}
            notFoundContent={item.fetching ? <Spin size="small" /> : null}
            placeholder={item.placeholder ? item.placeholder : "请选择树节点"}
            showCheckedStrategy={
              item.showCheckedStrategy ? item.showCheckedStrategy : "SHOW_CHILD"
            }
          />
        )
      default:
        return (
          <Input placeholder={item.placeholder ? item.placeholder : "请输入"} />
        )
    }
  }

  return (
    <Form form={form} onFinish={handleFinished}>
      {fields.map((t) => (
        <Form.Item
          key={t.name}
          name={t.name}
          label={t.label}
          required={!!t.required}
        >
          {renderType(t)}
        </Form.Item>
      ))}
    </Form>
  )
}

export default SimpleForm
