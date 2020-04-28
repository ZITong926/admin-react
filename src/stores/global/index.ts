import Store from './store'
import { action } from 'mobx'
import { ClickParam } from "antd/lib/menu"
import { history } from '@/components/myBrowserRouter'

class GlobalStore extends Store{
  // 显示/隐藏侧边菜单栏
  @action public toggleCollapsed = () => {
    this.collapsed = !this.collapsed
  }

  // 切换面包屑 更换路由
  @action public handleMenu = (item: ClickParam) => {
    console.log('zz', item)
    history.push(item.key)
  }

  // 登陆处理
  @action public loginIn = () => {
    this.isLogin = !this.isLogin
  }
}

export default new GlobalStore()