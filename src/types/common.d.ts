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

// 用户信息
export interface UserInfoDefine {
  id: string,
  username: string,
  avatarPath: string,
  userRoutes: UserRoutesDefine
}
