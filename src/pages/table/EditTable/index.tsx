import * as React from "react"
import { ColumnProps } from "antd/lib/table"
import { ResizeCallbackData } from "react-resizable"
import { components } from '@/components/BaseTable/EditTable'
import { BaseTable } from "@/components/BaseTable/ResizableColTable"

import './index.less'
import IconTools from "@/components/IconTools"
import BaseForm from "@/components/BaseForm"
import BaseFormModal from "@/components/BaseFormModal"

interface TableDataSourceProps {
  id: string
  age: number
  sex: string
  title: string
  address: string
}

interface IIEditColumnsProps {
  type?: string
  editable?: boolean
  selectValue?: string[]
}

const ResiableTable = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [columns, setColumns] = React.useState<
    Array<ColumnProps<TableDataSourceProps> & IIEditColumnsProps>
  >([
    {
      key: "_id",
      dataIndex: "_id",
      title: "序号",
      width: 60,
      align: 'center',
      render: (text, record, index) => `${index + 1}`
    },
    {
      key: "id",
      dataIndex: "id",
      title: "id",
      width: 200,
      align: 'center',
    },
    {
      key: "title",
      dataIndex: "title",
      title: "标题",
      width: 300,
      align: 'center',
      editable: true
    },
    {
      key: 'sex',
      dataIndex: 'sex',
      title: '性别',
      align: 'center',
      width: 100,
      type: 'select',
      editable: true,
      selectValue: ['男', '女']
    },
    {
      key: "age",
      title: "年龄",
      dataIndex: "age",
      width: 200,
      align: 'center',
      editable: true,
      type: 'input-number',
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      key: "address",
      dataIndex: "address",
      title: "地址",
      width: 400,
      editable: true,
      align: 'center',
      type: 'select',
      selectValue: ['湖北', '上海', '北京']
    },
  ])

  const [dataSource, setDataSource] = React.useState<TableDataSourceProps[]>([
    {
      id: "052c",
      title: "aaa",
      address: "河南",
      age: 18,
      sex: '男'
    },
    {
      id: "052d",
      title: "aaa",
      address: "江西",
      age: 20,
      sex: '男'
    }
  ])

  const handleResize = (
    index: number
  ): ((e: React.SyntheticEvent, data: ResizeCallbackData) => void) => (
    e,
    { size }
  ) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      }
      setColumns(nextColumns)
    }

  const handleSave = (record:TableDataSourceProps) => {
    const newDataSource = [...dataSource]
    const index = dataSource.findIndex(t => t.id = record.id)
    const item = dataSource[index]
    newDataSource.splice(index, 1, {
      ...item,
      ...record
    })
    setDataSource(newDataSource)
  }

  React.useEffect(() => {
    const newColumns = columns.map(d => ({
      ...d,
      onCell: (record: TableDataSourceProps) => ({
        record,
        handleSave,
        type: d.type,
        editable: d.editable,
        dataIndex: d.dataIndex,
        selectValue: d.selectValue
      })
    }))
    setColumns(newColumns as any)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const icons = [
    {
      name: 'plus',
      title: '添加',
      disabled: false,
      action: () => {
        setVisible(!visible)
      }
    },
    {
      name: 'edit',
      title: '编辑',
      disabled: false,
      action: () => {}
    },
    {
      name: 'up',
      title: '上一条',
      disabled: false,
      action: () => {}
    },
    {
      name: 'down',
      title: '下一条',
      disabled: false,
      action: () => {}
    },
    {
      name: 'save',
      title: '保存',
      disabled: false,
      action: () => {}
    },
    {
      name: 'delete',
      title: '删除',
      disabled: false,
      action: () => {}
    }
  ]

  const fields=[
    {
      name: 'title',
      label: '标题',
      required: true
    },
    {
      name: 'sex',
      label: '性别'
    },
    {
      name: 'age',
      label: '年龄'
    },
    {
      name: 'address',
      label: '地址'
    },
  ]

  return (
    <div className="edit-table">
      <BaseForm
        reset={true}
        search={true}
        spanWidth={5}
        layout="inline"
        fields={fields}
        className="edit-table-search"
        onFinish={(values) => {
          console.log('values', values)
        }}
      />
      <IconTools gutter={16} style={{ margin: '10px 0 10px -8px' }} icons={icons} />
      <BaseTable
        rowKey="id"
        size="small"
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        components={components}
        rowClassName="editable-row"
        handleResize={handleResize}
      />
      <BaseFormModal
        title="添加数据"
        fields={fields}
        visible={visible}
        onFinish={(values)=>{
          console.log('values', values)
        }}
        onCancel={() => setVisible(!visible)}
      />
    </div>
  )
}

export default ResiableTable
