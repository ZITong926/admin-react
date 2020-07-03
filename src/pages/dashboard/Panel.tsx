import React from 'react'
import upperFirst from 'lodash/upperFirst'
import { Card, Form, Input } from 'antd'
import { FormProps, FormInstance } from 'antd/lib/form'
import { DetailPanel, withEditorContext } from 'gg-editor'
import { EditorContextProps } from 'gg-editor/lib/components/EditorContext'
import { DetailPanelComponentProps } from 'gg-editor/lib/components/DetailPanel'

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
}

interface PanelProps
  extends FormProps,
    EditorContextProps,
    DetailPanelComponentProps {}

interface PanelState {}

class Panel extends React.Component<PanelProps, PanelState> {
  formRef = React.createRef<FormInstance>()

  handleSubmit = () => {
    this.formRef
      .current!.validateFields()
      .then(values => {
        console.log('validateFields-success', values)
      })
      .catch(err => {
        console.log('validateFields-error', err)
      })
    this.formRef.current!.submit()
  }

  handleFinished = (values: any) => {
    const { type, nodes, edges, executeCommand } = this.props
    const item = type === 'node' ? nodes[0] : edges[0]
    if (!item) {
      return
    }
    executeCommand('update', {
      id: item.get('id'),
      updateModel: {
        ...values
      }
    })
  }

  renderNodeDetail = () => {
    const { type, nodes } = this.props
    return (
      <Form
        ref={this.formRef}
        onFinish={this.handleFinished}
        fields={[
          {
            name: 'label',
            value: type === 'node' ? nodes[0].getModel().label : ''
          }
        ]}
      >
        <Form.Item label="Label" name="label" {...formItemLayout}>
          <Input onBlur={this.handleSubmit} />
        </Form.Item>
      </Form>
    )
  }

  renderEdgeDetail = () => {
    return (
      <Form ref={this.formRef} onFinish={this.handleFinished}>
        <Form.Item label="Label" name="label" {...formItemLayout}>
          <Input onBlur={this.handleSubmit} />
        </Form.Item>
      </Form>
    )
  }

  renderMultiDetail = () => {
    return null
  }

  renderCanvasDetail = () => {
    return <p>Select a node or edge :)</p>
  }

  render() {
    const { type } = this.props

    return (
      <Card title={upperFirst(type)} bordered={false}>
        {type === 'node' && this.renderNodeDetail()}
        {/* {type === "edge" && this.renderEdgeDetail()}
        {type === "multi" && this.renderMultiDetail()}
        {type === "canvas" && this.renderCanvasDetail()} */}
      </Card>
    )
  }
}

const WrappedPanel = withEditorContext(Panel)

type WrappedPanelProps = Omit<PanelProps, keyof FormProps>

export const NodePanel = DetailPanel.create<WrappedPanelProps>('node')(
  WrappedPanel
)
// export const EdgePanel = DetailPanel.create<WrappedPanelProps>('edge')(WrappedPanel);
// export const MultiPanel = DetailPanel.create<WrappedPanelProps>('multi')(WrappedPanel);
// export const CanvasPanel = DetailPanel.create<WrappedPanelProps>('canvas')(WrappedPanel);
