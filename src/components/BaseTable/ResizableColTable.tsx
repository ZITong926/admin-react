import { Table } from 'antd'
import * as React from 'react'
import { ResizeCallbackData } from 'react-resizable'
import { TableProps, ColumnType } from 'antd/lib/table'
import { header } from '@/components/BaseTable/ResizableHeader'

import './index.less'

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
    onHeaderCell: (column: ColumnType<T>) => ({
      height: 0,
      width: column.width,
      onResize: handleResize(index)
    })
  }))

  return (
    <Table
      dataSource={dataSource}
      columns={newColumns as any}
      components={{ header, ...components }}
      {...rest}
    />
  )
}
