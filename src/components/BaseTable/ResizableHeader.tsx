import * as React from 'react'
import { ResizableProps, Resizable } from 'react-resizable'

interface ResizableHeaderCellProps extends ResizableProps {
  title?: string
  colSpan: number
  rowSpan: number
  className: string
  style: React.CSSProperties
  children: Array<undefined | string>
}

export const ResizableHeader: React.FC<ResizableHeaderCellProps> = ({
  children,
  width,
  height,
  onResize,
  ...rest
}) => {
  return (
    <Resizable
      width={width}
      height={height}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => e.stopPropagation()}
        />
      }
    >
      <th {...rest}>
        <div>{children[1]}</div>
      </th>
    </Resizable>
  )
}

export const header = {
  cell: ResizableHeader
}
