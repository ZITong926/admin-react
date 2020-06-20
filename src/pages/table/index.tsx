import * as React from 'react'
import { Table, Tag, Button } from "antd"
import { ColumnProps } from 'antd/lib/table'
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

import './index.less'

interface TableDataSourceProps{
  age: number
  name: string
  tags: string[]
  address: string
}

const columns:Array<ColumnProps<TableDataSourceProps>> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (text) => (
      <span>
        {text.map((tag: string) => {
          let color = tag.length > 5 ? "geekblue" : "green"
          if (tag === "loser") {
            color = "volcano"
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record, index) => (
      <span>
        <a style={{ marginRight: 16 }}><EditOutlined /></a>
        <a><DeleteOutlined /></a>
      </span>
    ),
  },
]

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "8",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
    {
    key: "10",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "11",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
]

const BTable = () => (
  <div className="table-page">
    <Button icon={<PlusOutlined />} type="primary">Add</Button>
    <Table 
      bordered={true} 
      columns={columns} 
      dataSource={data}
      pagination={{
        pageSize: 10,
        total: data.length,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`
      }}
    />
  </div>
)

export default BTable