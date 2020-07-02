const MenuList: IGloabalSpace.IMenuData[] = [
  {
    title: '首页',
    icon: 'home',
    path: '/app'
  },
  {
    title: '表单',
    icon: 'home',
    children: [
      {
        title: '基础表单',
        icon: 'home',
        path: '/app/formboard'
      }
    ]
  },
  {
    title: '表格',
    icon: 'bars',
    children: [
      {
        title: '基础表格',
        icon: 'home',
        path: '/app/tableboard'
      },
      {
        title: '伸缩表格',
        icon: 'home',
        path: '/app/resizetableboard'
      },
      {
        title: '编辑表格',
        icon: 'home',
        path: '/app/edittableboard'
      }
    ]
  }
]

export default MenuList
