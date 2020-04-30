import Store from './store'
import { action } from 'mobx'
import MenuList from '@/mock/menuConfig'
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

  @action public setTagsNavData = (obj: { title: string, path: string }) => {
    const flag = this.tagsNavData.find(d => d.path === obj.path)
    if(!flag){
      this.tagsNavData.push(obj)
    }
    this.tagsNavData.forEach(d => {
      if(d.path === obj.path){
        d.color = 'primary'
      }else{
        d.color = 'default'
      }
    })
  }
}

export default new GlobalStore()