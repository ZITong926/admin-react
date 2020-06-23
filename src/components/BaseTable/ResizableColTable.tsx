import { Table } from 'antd'
import * as React from "react"
// import { TableComponents } from "rc-table/lib/interface"
import { TableProps, ColumnType, ColumnsType, ColumnProps } from "antd/lib/table"
import { Resizable, ResizableProps, ResizeCallbackData } from "react-resizable"

interface TableDataSourceProps {
  id: string
  age: number
  title: string
  address: string
}

// interface HeaderCellProps extends ResizableProps {
//   title?: string
//   colSpan: number
//   rowSpan: number
//   className: string
//   style: React.CSSProperties
//   children: Array<undefined | string>
// }

interface BaseTableProps<T> extends TableProps<T> {
  handleResize: (index: number) => (e: React.SyntheticEvent, data: ResizeCallbackData) => void
}

// const body: TableComponents<object> = {
//   header: {
//     cell: ({ children, width, height, onResize, ...rest }: HeaderCellProps) => {
//       return (
//         <Resizable
//           width={width}
//           height={height}
//           onResize={onResize}
//           draggableOpts={{ enableUserSelectHack: false }}
//           handle={
//             <span
//               className="react-resizable-handle"
//               onClick={(e) => e.stopPropagation()}
//             />
//           }
//         >
//           <th {...rest}>{children[1]}</th>
//         </Resizable>
//       )
//     }
//   }
// }

export function BaseTable<T extends K, K>({
  columns,
  dataSource,
  handleResize,
  ...rest
}: BaseTableProps<T>) {
  const newColumns = columns!.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnProps<TableDataSourceProps>) => ({
      width: column.width,
      onResize: handleResize(index),
    })
  }))
  return <Table<T> columns={newColumns} dataSource={dataSource} {...rest} />
}

export default () => {
  const [columns, setColumns] = React.useState<ColumnProps<TableDataSourceProps>[]>([
    {
      key: "id",
      dataIndex: "id",
      title: "id",
      width: 200
    },
    {
      key: "title",
      dataIndex: 'title',
      title: "title",
      width: 300
    },
    {
      key: "address",
      dataIndex: "address",
      title: "address",
      width: 400
    },
    {
      key: "age",
      dataIndex: "age",
      title: "age",
      width: 200,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
  ])

  const dataSource: TableDataSourceProps[] = [
    {
      id: '4421213232',
      title: 'aaa',
      address: '的苦瓜减肥的管理的风格',
      age: 18
    },    {
      id: '4421213232',
      title: 'aaa',
      address: '的苦瓜减肥的管理的风格',
      age: 20
    }
  ]

  const handleResize = (index: number): ((e: React.SyntheticEvent, data: ResizeCallbackData) => void) => (e, { size }) => {
    const nextColumns = [...columns]
    nextColumns[index] = {
      ...nextColumns,
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
      handleResize={handleResize}
    />
  )
}