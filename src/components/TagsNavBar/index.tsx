import { Tag } from "antd"
import * as React from "react"

interface ITagsNavBarProps {
  tagsNavData: IGloabalSpace.ITagsNavData[]
}

const TagsNavBar = (props: ITagsNavBarProps) => (
  <div className="tags-bar">
    {props.tagsNavData.map((d) => (
      <Tag>
        <span className="tag-bar-circle" />
        <span className="tag-bar=title">{d.title}</span>
      </Tag>
    ))}
  </div>
)

export default TagsNavBar
