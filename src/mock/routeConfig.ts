import * as React from 'react'

const RouteConfig: IGloabalSpace.IRouteData[] = [
  {
    title: "首页",
    icon: "home",
    path: "/app",
    component: React.lazy(() => import('@/pages/dashboard'))
  },
  {
    title: "基础表单",
    icon: "home",
    path: "/app/formboard",
    component: React.lazy(() => import('@/pages/form'))
  },
  {
    title: "基础表格",
    icon: "home",
    path: "/app/tableboard",
    component: React.lazy(() => import('@/pages/table'))
  },
  {
    title: "伸缩表格",
    icon: 'home',
    path: '/app/resizetableboard',
    component: React.lazy(() => import('@/pages/table/ResizableTable'))
  }
]

export default RouteConfig
