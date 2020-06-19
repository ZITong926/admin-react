import React from "react"
import { NodePanel } from "./Panel"
import { Divider, Tooltip } from "antd"
import upperFirst from "lodash/upperFirst"
import { createFromIconfontCN } from "@ant-design/icons"
// import { MindData } from 'gg-editor/lib/common/interfaces'
import GGEditor, {
  Flow,
  Command,
  ContextMenu,
  constants,
  Item,
  ItemPanel,
  RegisterNode
} from "gg-editor"

import "./index.less"

const { EditorCommand, ItemType } = constants

const IconFont = createFromIconfontCN({
  scriptUrl: "https://at.alicdn.com/t/font_1518433_oa5sw7ezue.js",
})

const FLOW_COMMAND_LIST = [
  EditorCommand.Undo,
  EditorCommand.Redo,
  "|",
  EditorCommand.Copy,
  EditorCommand.Paste,
  EditorCommand.Remove,
  "|",
  EditorCommand.ZoomIn,
  EditorCommand.ZoomOut,
]

// const MIND_COMMAND_LIST = [
//   EditorCommand.Undo,
//   EditorCommand.Redo,
//   '|',
//   EditorCommand.Copy,
//   EditorCommand.Paste,
//   EditorCommand.Remove,
//   '|',
//   EditorCommand.Topic,
//   EditorCommand.Subtopic,
//   '|',
//   EditorCommand.Fold,
//   EditorCommand.Unfold,
//   '|',
//   EditorCommand.ZoomIn,
//   EditorCommand.ZoomOut,
// ];

const flowData = {
  nodes: [
    {
      id: "0",
      label: "Node",
      x: 50,
      y: 50,
    },
    {
      id: "1",
      label: "Node",
      x: 50,
      y: 200,
    },
  ],
  edges: [
    {
      source: "0",
      sourceAnchor: 1,
      target: "1",
      targetAnchor: 0,
    },
  ],
}

// const mindData: MindData = {
//   id: '0',
//   label: 'Central Topic',
//   children: [
//     {
//       id: '1',
//       side: 'left',
//       label: 'Main Topic 1',
//     },
//     {
//       id: '2',
//       side: 'right',
//       label: 'Main Topic 2',
//     },
//     {
//       id: '3',
//       side: 'right',
//       label: 'Main Topic 3',
//     },
//   ],
// };

function App() {
  const [width, setWidth] = React.useState(0)

  return (
    <GGEditor>
      <div style={{ display: 'flex'}}>
        <div style={{ width: 170, borderBottom: '1px solid #e8e8e8', borderRight: '1px solid #e8e8e8', textAlign: 'center', paddingTop:10 }}>
          <h3>可拖拽节点</h3>
        </div>
        <div className="toolbar">
          {FLOW_COMMAND_LIST.map((name, index) => {
            if (name === "|") {
              return <Divider key={index} type="vertical" />
            }

            return (
              <Command
                key={name}
                name={name}
                className="command"
                disabledClassName="commandDisabled"
              >
                <Tooltip title={upperFirst(name)}>
                  <IconFont type={`icon-${name}`} />
                </Tooltip>
              </Command>
            )
          })}
        </div>
      </div>
      <div
        className="detailPanel"
        style={{ width, border: width ? "1px solid #e8e8e8" : "none" }}
      >
        <NodePanel />
      </div>
      <ItemPanel className="itemPanel">
        <Item
          className="item"
          type={ItemType.Node}
          model={{
            type: "node",
            size: [120, 60],
            label: "rect",
            shape: 'custom-node'
          }}
        >
          <div className="dragRect">rect</div>
        </Item>
      </ItemPanel>
      <Flow
        onDragEnd={(e) => {
          console.log("onDragEnd", e)
        }}
        onAfterRemoveItem={(e) => {
          console.log("onAfterRemoveItem", e)
        }}
        data={flowData}
        className="graph"
        onCanvasClick={() => {
          setWidth(0)
        }}
        onNodeDoubleClick={(node) => {
          console.log('node', node)
          setWidth(300)
        }}
        graphConfig={{ defaultNode: { type: 'custom-node'} }}
      />
      <RegisterNode
        name="custom-node"
        config={{
          getCustomConfig() {
            return {
              size: [120, 50]
            }
          },
          getAnchorPoints() {
            return [
              [0.5, 0],
              [0.5, 1],
            ]
          },
        }}
        extend="bizFlowNode"
      />
      {/* <Mind className="graph" data={mindData} /> */}
      <ContextMenu
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position

          return (
            <div
              className="contextMenu"
              style={{ position: "absolute", top, left }}
            >
              {[
                EditorCommand.Undo,
                EditorCommand.Redo,
                EditorCommand.PasteHere,
              ].map((name) => (
                <Command
                  key={name}
                  name={name}
                  className="command"
                  disabledClassName="commandDisabled"
                >
                  <div onClick={hide}>
                    <IconFont type={`icon-${name}`} />
                    <span>{upperFirst(name)}</span>
                  </div>
                </Command>
              ))}
            </div>
          )
        }}
      />
    </GGEditor>
  )
}

export default App
