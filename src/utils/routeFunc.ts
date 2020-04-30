export const findRoute = (MenuList: IGloabalSpace.IMenuData[], path: string) => {
  const breadcrumbList: IGloabalSpace.IBreadcrumbData[] = []
  return findRouteTitle(MenuList, path, breadcrumbList)
}

const findRouteTitle = (MenuList: IGloabalSpace.IMenuData[], path: string, breadcrumbList: IGloabalSpace.IBreadcrumbData[]) => {
  MenuList.map(d => {
    if(d.children && d.children.length){
      findRouteTitle(d.children, path, breadcrumbList)
    }else {
      if(d.path === path && path !== '/app'){
        const arrPath: string[] = path.split('/')
        breadcrumbList.push({
          icon: d.icon,
          title: d.title,
          path: arrPath[arrPath.length - 1]
        })
      }
    }
  })
  return breadcrumbList
}