import * as React from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Tag, Button, Form } from 'antd'
import { FormFieldsProps } from '@/components/BaseForm'
import BaseFormModal from '@/components/BaseFormModal'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import './index.less'

interface TableDataSourceProps {
  age: number
  sex: string
  name: string
  tags: string[]
  address: string
}

const columns: Array<ColumnProps<TableDataSourceProps>> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (text) => (
      <span>
        {text.map((tag: string) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
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
    title: 'Action',
    key: 'action',
    render: (text, record, index) => (
      <span>
        <a style={{ marginRight: 16 }}>
          <EditOutlined />
        </a>
        <a>
          <DeleteOutlined />
        </a>
      </span>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    sex: '男',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    sex: '男',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '10',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '11',
    name: 'Joe Black',
    age: 32,
    sex: '男',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const BTable = () => {
  const [form] = Form.useForm()
  const [visible, setVisible] = React.useState(false)
  const [dataSelect, setDataSelect] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
  const handleAddCommit = (values: any) => {
    console.log('handleAddClick', values)
  }

  const handleOnSearch = (value: string) => {
    setFetching(true)
    setTimeout(() => {
      setDataSelect([
        { text: '小王', value: 'xiao wang' },
        { text: '小李', value: 'xiao li' },
      ] as any)
      setFetching(false)
    }, 2000)
  }

  const fields: FormFieldsProps[] = [
    {
      label: '姓名',
      name: 'name',
      fetching,
      showSearch: true,
      type: 'search_select',
      selectValue: dataSelect,
      onSearch: handleOnSearch,
    },
    {
      label: '年龄',
      name: 'age',
    },
    {
      label: '地址',
      name: 'address',
    },
    {
      label: '性别',
      name: 'sex',
      showSearch: true,
      type: 'select',
      selectValue: [
        { text: '男', value: 'man' },
        { text: '女', value: 'woman' },
      ],
    },
  ]

  return (
    <div className="table-page">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(!visible)}
      >
        Add
      </Button>
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          total: data.length,
          showSizeChanger: true,
          showTotal: (total) => `共${total}条`,
        }}
      />
      <BaseFormModal
        form={form}
        title="添加数据"
        fields={fields}
        visible={visible}
        onFinish={handleAddCommit}
        onCancel={() => setVisible(!visible)}
      />
    </div>
  )
}

export default BTable
