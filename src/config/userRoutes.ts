import type { UserRoutesDefine } from "../types/common"

// 模拟从后端返回的用户权限范围内可访问的菜单资源。用户登录获取到token后，再获取动态路由信息并存入到pinia中
const userRoutes: UserRoutesDefine = [
  {
    path: "dept",
    name: "DeptHome",
    componentPath: "dept/DeptHome",
    children: [
      {
        path: "manage",
        name: "DeptManage",
        componentPath: "dept/DeptManage",
        meta: {
          title: "系别管理",
          menuName: "系别管理",
          showInMenu: true,
          icon: "School"
        }
      }
    ]
  }
]

export default userRoutes