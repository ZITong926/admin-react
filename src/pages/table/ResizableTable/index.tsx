import * as React from "react"
import { ColumnsType } from "antd/lib/table"
import { ResizeCallbackData } from "react-resizable"
import { BaseTable } from "@/components/BaseTable/ResizableColTable"

import  './index.less'

interface TableDataSourceProps {
  id: string
  age: number
  title: string
  address: string
}

const ResiableTable = () => {
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
    <div className="resizable-table">
      <BaseTable
        rowKey="id"
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        rowClassName="editable-row"
        handleResize={handleResize}
      />
    </div>
  )
}

export default ResiableTable
