const MenuList: IGloabalSpace.IMenuData[] = [
  {
    title: "首页",
    icon: "home",
    path: "/app",
  },
  {
    title: "Form",
    icon: "home",
    path: "/app/formboard",
  },
  {
    title: "compass",
    icon: "bars",
    children: [
      {
        title: "Table",
        icon: "home",
        path: "/app/tableboard",
      },
    ],
  },
]

export default MenuList