import * as React from 'react'
import { DataNode } from 'rc-tree-select/lib/interface'
import { FormProps, FormInstance } from 'antd/lib/form/Form'
import { CheckedStrategy } from 'rc-tree-select/lib/utils/strategyUtil'
import { Form, Select, Input, Spin, TreeSelect, Col, Row, Button } from 'antd'

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

export interface BaseFormProps extends FormProps {
  reset?: boolean
  search?: boolean
  spanWidth?: number
  className?: string
  multyRowCol?: number
  fields: FormFieldsProps[]
  onFinish: (values: any) => void
}

const BaseForm: React.FC<BaseFormProps> = ({
  fields,
  className,
  size = 'middle',
  layout = 'horizontal',
  spanWidth = 6,
  search,
  reset,
  multyRowCol,
  ...rest
}) => {
  const [form] = Form.useForm()

  const renderType = (item: FormFieldsProps) => {
    switch (item.type) {
      case 'select': // 有数据、可进行选择和搜索
        return (
          <Select
            size={size}
            optionFilterProp="children"
            allowClear={!!item.allowClear}
            showSearch={!!item.showSearch}
            labelInValue={!!item.labelInValue}
            placeholder={item.placeholder ? item.placeholder : '请选择'}
            disabled={
              !!item.disabled ||
              !item.selectValue ||
              item.selectValue!.length === 0
            }
          >
            {item.selectValue!.map(t => (
              <Select.Option key={t.value} value={t.value}>
                {t.text}
              </Select.Option>
            ))}
          </Select>
        )
      case 'search_select': // 无数据 根据输入的数据搜索
        return (
          <Select
            size={size}
            onSearch={item.onSearch}
            disabled={!!item.disabled}
            allowClear={!!item.allowClear}
            showSearch={!!item.showSearch}
            filterOption={!!item.filterOption}
            labelInValue={!!item.labelInValue}
            placeholder={item.placeholder ? item.placeholder : '请检索'}
            notFoundContent={item.fetching ? <Spin size="small" /> : null}
          >
            {item.selectValue!.map(t => (
              <Select.Option key={t.value} value={t.value}>
                {t.text}
              </Select.Option>
            ))}
          </Select>
        )
      case 'tree_select':
        return (
          <TreeSelect
            size={size}
            treeData={item.treeData}
            onSearch={item.onSearch}
            multiple={!!item.multiple}
            showSearch={!!item.showSearch}
            allowClear={!!item.allowClear}
            treeCheckable={!!item.treeCheckable}
            notFoundContent={item.fetching ? <Spin size="small" /> : null}
            placeholder={item.placeholder ? item.placeholder : '请选择树节点'}
            showCheckedStrategy={
              item.showCheckedStrategy ? item.showCheckedStrategy : 'SHOW_CHILD'
            }
          />
        )
      default:
        return (
          <Input
            size={size}
            style={{ width: '100%' }}
            placeholder={item.placeholder ? item.placeholder : '请输入'}
          />
        )
    }
  }

  const formItemLayout =
    layout === 'vertical' && multyRowCol
      ? {
          labelCol: {
            span: 24
          },
          wrapperCol: {
            span: 24
          }
        }
      : {
          labelCol: {
            xs: { span: 8 },
            sm: { span: 6 }
          },
          wrapperCol: {
            xs: { span: 16 },
            sm: { span: 18 }
          }
        }

  const renderLayout = (insForm: FormInstance) => {
    const colSpan = { md: 8, sm: 24, lg: spanWidth }
    if (layout === 'inline') {
      return (
        <Row gutter={{ md: 8, lg: 24, xl: 24 }} style={{ width: '100%' }}>
          {fields.map(d => (
            <Col key={d.name} {...colSpan}>
              <Form.Item
                name={d.name}
                label={d.label}
                {...formItemLayout}
                initialValue={d.initialValue}
                rules={[
                  {
                    required: !!d.required,
                    message: `${d.label}值不为空!`
                  }
                ]}
              >
                {renderType(d)}
              </Form.Item>
            </Col>
          ))}
          {search ? (
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Col>
          ) : null}
          {reset ? (
            <Col>
              <Form.Item>
                <Button onClick={() => insForm.resetFields()}>重置</Button>
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      )
    } else {
      return (
        <React.Fragment>
          {multyRowCol ? (
            <React.Fragment>
              {_.chunk(fields, multyRowCol).map((d, i) => (
                <Row
                  key={i}
                  gutter={{ md: 8, lg: 24, xl: 24 }}
                  style={{ width: '100%' }}
                >
                  {d.map(t => (
                    <Col key={t.name} {...colSpan}>
                      <Form.Item
                        name={t.name}
                        label={t.label}
                        labelAlign="right"
                        {...formItemLayout}
                        initialValue={t.initialValue}
                        rules={[
                          {
                            required: !!t.required,
                            message: `${t.label}值不为空!`
                          }
                        ]}
                      >
                        {renderType(t)}
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              ))}
              <Row
                align="middle"
                gutter={16}
                justify="end"
                style={{ width: '100%', paddingRight: 8 }}
              >
                {search ? (
                  <Col>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                    </Form.Item>
                  </Col>
                ) : null}
                {reset ? (
                  <Col>
                    <Form.Item>
                      <Button onClick={() => insForm.resetFields()}>
                        重置
                      </Button>
                    </Form.Item>
                  </Col>
                ) : null}
              </Row>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {fields.map(d => (
                <Form.Item
                  key={d.name}
                  name={d.name}
                  label={d.label}
                  {...formItemLayout}
                  initialValue={d.initialValue}
                  rules={[
                    {
                      required: !!d.required,
                      message: `${d.label}值不为空!`
                    }
                  ]}
                >
                  {renderType(d)}
                </Form.Item>
              ))}
            </React.Fragment>
          )}
        </React.Fragment>
      )
    }
  }

  return (
    <Form layout={layout} form={form} className={className} {...rest}>
      {renderLayout(rest.form ? rest.form : form)}
    </Form>
  )
}

export default BaseForm
