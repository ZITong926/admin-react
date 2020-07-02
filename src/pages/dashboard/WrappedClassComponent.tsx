import { Button } from 'antd'
import * as React from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { withEditorContext, G6 } from 'gg-editor'
import { EditorContextProps } from 'gg-editor/lib/components/EditorContext'

interface WrappedClassComponentProps extends EditorContextProps {}

class WrappedClassComponent extends React.Component<
  WrappedClassComponentProps
> {
  handleClick = () => {
    const { graph } = this.props
    if (graph) {
      console.log('graph', graph!.save())
      graph.addPlugin(
        new G6.Minimap({
          container: document.getElementById(
            'minimapContainer'
          ) as HTMLDivElement,
          size: [196, 200], // 需设置宽高
          className: 'minimapClass' // 自定义的样式类
        })
      )
      graph.paint()
    }
  }

  render() {
    return (
      <Button
        className="save-canvas"
        type="primary"
        icon={<SaveOutlined />}
        onClick={this.handleClick}
      >
        保存
      </Button>
    )
  }
}

export default withEditorContext<
  WrappedClassComponentProps,
  WrappedClassComponent
>(WrappedClassComponent)
