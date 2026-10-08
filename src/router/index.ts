import { createWebHashHistory, createRouter } from 'vue-router'
import Nprogress from 'nprogress'

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

const WHITE_URL_LIST = ["/login"]

// 前置守卫进行权限控制
router.beforeEach((toRoute, fromRoute, next) => {
  Nprogress.start()
  // 获取token
  let token = null
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