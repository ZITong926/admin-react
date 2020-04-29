declare namespace IGloabalSpace {
  interface IRouteData {
    icon: string
    title: string
    path?: string
    component?: React.ComponentType
    children?: IRouteData[]
  }

  interface IBreadcrumbData {
    path: string
    icon: string
    title: string
  }
}
