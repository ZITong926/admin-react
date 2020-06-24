import * as React from "react"
import { Table, Input } from "antd"
import { ResizeCallbackData } from "react-resizable"
import { header } from '@/components/BaseTable/ResizableHeader'
import { TableProps, ColumnType, ColumnsType } from "antd/es/table"

import './index.less'

interface TableDataSourceProps {
  id: string
  age: number
  title: string
  address: string
}

interface EditableCellProps extends React.HtmlHTMLAttributes<HTMLElement>{
  type: string
  title: string
  index: number
  record: object
  editing: boolean
  dataIndex: string
  children: Array<undefined | string>
}

interface BaseTableProps<T> extends TableProps<T> {
  handleResize: (
    index: number
  ) => (e: React.SyntheticEvent, data: ResizeCallbackData) => void
}

export function BaseTable<T extends object>({
  columns,
  dataSource,
  components,
  handleResize,
  ...rest
}: BaseTableProps<T>) {
  const newColumns = columns!.map((col, index) => ({
    ...col,
    // onCell: (record: T) => ({
    //   index,
    //   record,
    //   type: record,
    //   title: col.title,
    //   editing: false
    // }),
    onHeaderCell: (column: ColumnType<T>) => ({
      height: 0,
      width: column.width,
      onResize: handleResize(index),
    }),
  }))

  

  return (
    <Table
      dataSource={dataSource}
      columns={newColumns as any}
      components={{ header, ...preComponent }}
      {...rest}
    />
  )
}

export default () => {
  const [columns, setColumns] = React.useState<
    ColumnsType<TableDataSourceProps>
  >([
    {
      key: "id",
      dataIndex: "id",
      title: "id",
      width: 200,
    },
    {
      key: "title",
      dataIndex: "title",
      title: "title",
      width: 300,
    },
    {
      key: "address",
      dataIndex: "address",
      title: "address",
      width: 400,
    },
    {
      key: "age",
      dataIndex: "age",
      title: "age",
      width: 200,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
  ])

  const dataSource: TableDataSourceProps[] = [
    {
      id: "4421213232",
      title: "aaa",
      address: "的苦瓜减肥的管理的风格",
      age: 18,
    },
    {
      id: "4421213232",
      title: "aaa",
      address: "的苦瓜减肥的管理的风格",
      age: 20,
    },
  ]

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

  return (
    <BaseTable
      rowKey="id"
      bordered={true}
      columns={columns}
      dataSource={dataSource}
      rowClassName="editable-row"
      handleResize={handleResize}
    />
  )
}
