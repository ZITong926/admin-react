import { Table } from "antd"
import * as React from "react"
import { TableProps } from "antd/lib/table"
import { TableComponents } from "rc-table/lib/interface"

interface BaseTableProps extends TableProps<object>{
}

const body: TableComponents<object> = {
  header: {

  },
  body: {

  }
}

const BaseTable: React.FC<BaseTableProps> = ({ columns, dataSource, components, ...rest }) => {
  return <Table 
    columns={columns}
    dataSource={dataSource}
    components={components ? components : body}
    {...rest}
  />
}

export default BaseTable