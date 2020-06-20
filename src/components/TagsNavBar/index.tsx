import { Tag } from "antd"
import * as React from "react"

import "./index.less"

interface ITagsNavBarProps {
  currentTag: string
  tagsNavData: IGloabalSpace.ITagsNavData[]
  delOneTag: (item: IGloabalSpace.ITagsNavData) => void
}

const TagsNavBar = (props: ITagsNavBarProps) => (
  <div className="tags-bar">
    {props.tagsNavData.map((d, i) => (
      <Tag
        key={d.path}
        className="tag-bar-item"
        closable={i > 0 ? true : false}
        onClose={() => props.delOneTag(d)}
      >
        <span className={`tag-bar-circle-${d.color}`} />
        <span className="tag-bar-title">{d.title}</span>
      </Tag>
    ))}
  </div>
)

export default TagsNavBar
