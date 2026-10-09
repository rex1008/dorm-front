import { RouteRecordRaw } from "vue-router";
import type { UserRoutesDefine } from "../types/common";

// 结构：{/src/views/Layout.vue: () => import("/src/views/Layout.vue")}
const moduleObj = import.meta.glob("/src/views/**/*.vue")

export function buildDynamicRoutes(rawRoutes: UserRoutesDefine) {
  console.log(moduleObj)
  let result: RouteRecordRaw[] = []
  rawRoutes.forEach(rawRoute => {
    let route: RouteRecordRaw = {
      path: rawRoute.path,
      name: rawRoute.name,
      // component的格式为：() => import("../views/Login.vue")
      component: null,
      children: [],
      meta: { ...rawRoute.meta }
    }
    route.component = moduleObj[`/src/views/${rawRoute.componentPath}.vue`]
    // 递归调用
    if(rawRoute.children) {
      let children = buildDynamicRoutes(rawRoute.children)
      route.children = children
    }
    result.push(route)
  })

  return result
}