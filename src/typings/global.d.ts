declare const _: _.LoDashStatic

declare namespace IGloabalSpace {
  interface IRouteData {
    icon: string
    title: string
    path: string
    // component: any
    component: React.ComponentType
  }

  interface IMenuData {
    title: string
    path?: string
    icon: string
    children?: IMenuData[]
  }

  interface IBreadcrumbData {
    path: string
    icon: string
    title: string
  }

  interface ITagsNavData {
    path: string
    title: string
    color?: 'default' | 'primary'
  }

  interface ISelectValue {
    text: string
    value: string
  }
}
