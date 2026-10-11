import type { LocationQuery } from "vue-router"

export interface UserRouteMetaDefine {
  title: string,
  // 在菜单中的名字
  menuName?: string,
  // 是否需要在菜单中显示
  showInMenu?: boolean,
  // 图标
  icon?: string
}

export interface UserRouteDefine {
  path: string,
  name: string,
  // 组件文件相对src/views的相对路径（不需要带上src/views）
  componentPath: string,
  meta?: UserRouteMetaDefine,
  children?: UserRouteDefine[]
}

export type UserRoutesDefine = Array<UserRouteDefine>

// 菜单定义
export interface MenuItemDefine {
  // 访问绝对路径，如 /user/manage
  path: string,
  // component组件配置的name
  name: string,
  menuName: string,
  icon: string,
  children?: MenuItemDefine[]
}

export type MenuItemsDefine = Array<MenuItemDefine>

// 用户信息
export interface UserInfoDefine {
  id: string,
  username: string,
  avatarPath: string,
  userRoutes: UserRoutesDefine
}

// 选项卡
export interface TabDefine {
  // 当前tab对应的route路径，如/index
  path: string,
  text: string,
  // 当前tab对应的route全路径，如/index?a=33
  fullPath: string,
  // 查询字符串
  query?: LocationQuery
}

export type TabArrayDefine = Array<TabDefine>

// 后端统一返回的数据结构
export interface ResultDefine {
  data: any,
  code: number,
  msg: string,
  success: boolean,
  total: string
}