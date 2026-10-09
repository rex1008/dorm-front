import { createWebHashHistory, createRouter } from 'vue-router'
import Nprogress from 'nprogress'
import { useUserStoreExternal } from '../store/useUserStore'
import { buildDynamicRoutes } from '../permission/permission.ts'
import { getItem } from '../util/storageUtil.ts'
import { STORAGE_USER_TOKEN_KEY } from '../config/constants.ts'

const staticRoutes = [
  {
    path: '/login',
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: '/',
    name: "Layout",
    component: () => import("../views/Layout.vue"),
    children: [
      {
        path: '/:catchAll(.*)',
        component: () => import("../components/NotFound.vue"),
        meta: {
          title: "找不到此页面"
        }
      }
    ],
    meta: {
      title: "首页"
    }
  },
  {
    path: '/redirect/:originalPath(.*)',
    component: () => import("../components/RedirectSelf.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes
})

const userStore = useUserStoreExternal()
const WHITE_URL_LIST = ["/login"]

// 前置守卫进行权限控制
router.beforeEach((toRoute, fromRoute, next) => {
  Nprogress.start()

  // 动态路由加载。这个if的进入时机：登录后第一次访问，或者是页面刷新
  if(userStore.userInfo.userRoutes.length > 0 && !userStore.userRoutesAttached) {

    // 执行加载动态路由
    let dynamicRoutes = buildDynamicRoutes(userStore.userInfo.userRoutes)
    dynamicRoutes.forEach(route => router.addRoute("Layout", route))

    // 加载完成后修改状态为已加载
    userStore.updateUserRoutesAttached(true)

    // 重新触发导航，因为之前访问的时候还没有这个路径
    return next({...toRoute, replace: true})
  }


  // 获取token
  let token = getItem(STORAGE_USER_TOKEN_KEY)
  if(WHITE_URL_LIST.includes(toRoute.path)) {
    // 访问的路径在白名单中
    return next()
  }else {
    if(token) {
      return next()
    }
    // 没有token跳转到登录页
    return next({path: "/login"})
  }
})

// 后置守卫
router.afterEach((toRoute, fromRoute) => {
  Nprogress.done()
  document.title = toRoute.meta.title as string
})

export default router