import Store from './store'
import { action } from 'mobx'
import MenuList from '@/mock/menu'
import { ClickParam } from "antd/lib/menu"
import { findRoute } from '@/utils/routeFunc'
import { history } from '@/components/myBrowserRouter'

class GlobalStore extends Store {
  // 显示/隐藏侧边菜单栏
  @action public toggleCollapsed = () => {
    this.collapsed = !this.collapsed
  }

  // 切换面包屑 更换路由
  @action public handleMenu = (item: ClickParam) => {
    this.breadcrumbList.replace(findRoute(MenuList, item.key))
    history.push(item.key)
  }

  // 登陆处理
  @action public loginIn = () => {
    this.isLogin = !this.isLogin
  }

  @action public setTagsNavData = (obj: { path: string, title: string } ) => {
    //
  }
}

export default new GlobalStore()