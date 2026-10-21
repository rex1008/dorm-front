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
  },
  {
    path: "clazz",
    name: "ClazzHome",
    componentPath: "clazz/ClazzHome",
    children: [
      {
        path: "manage",
        name: "ClazzManage",
        componentPath: "clazz/ClazzManage",
        meta: {
          title: "班级管理",
          menuName: "班级管理",
          showInMenu: true,
          icon: "Collection"
        }
      }
    ]
  },
  {
    path: "student",
    name: "StudentHome",
    componentPath: "student/StudentHome",
    children: [
      {
        path: "manage",
        name: "StudentManage",
        componentPath: "student/StudentManage",
        meta: {
          title: "学生管理",
          menuName: "学生管理",
          showInMenu: true,
          icon: "User"
        }
      }
    ]
  },
  {
    path: "dormBuilding",
    name: "DormBuildingHome",
    componentPath: "dormBuilding/DormBuildingHome",
    children: [
      {
        path: "manage",
        name: "DormBuildingManage",
        componentPath: "dormBuilding/DormBuildingManage",
        meta: {
          title: "宿舍楼管理",
          menuName: "宿舍楼管理",
          showInMenu: true,
          icon: "OfficeBuilding"
        }
      }
    ]
  },
  {
    path: "dorm",
    name: "DormHome",
    componentPath: "dorm/DormHome",
    children: [
      {
        path: "manage",
        name: "DormManage",
        componentPath: "dorm/DormManage",
        meta: {
          title: "宿舍管理",
          menuName: "宿舍管理",
          showInMenu: true,
          icon: "HomeFilled"
        }
      },
      {
        path: "toAdd",
        name: "AddDorm",
        componentPath: "dorm/AddDorm",
        meta: {
          title: "添加宿舍",
        }
      },
      {
        path: "toUpdate",
        name: "UpdateDorm",
        componentPath: "dorm/UpdateDorm",
        meta: {
          title: "修改宿舍",
        }
      }
    ]
  },
  {
    path: "statistic",
    name: "Statistic",
    componentPath: "statistic/Statistic",
    meta: {
      title: "统计",
      menuName: "统计",
      showInMenu: true,
      icon: "PieChart"
    }
  }
]

export default userRoutes