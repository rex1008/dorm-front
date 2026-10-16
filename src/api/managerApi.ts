import { doGet, appJsonPost } from "../network/request";

/**
 * 登录
 * @param data
 */
export function loginApi(data: object) {
  return appJsonPost({
    url: "/manager/login",
    data
  })
}

/**
 * 登录
 * @param data
 */
export function queryByIdApi(id: string) {
  return doGet({
    url: "/manager/queryById",
    params: {id}
  })
}

/**
 * 登录
 * @param data
 */
export function modifyByIdApi(data: object) {
  return appJsonPost({
    url: "/manager/modifyById",
    data
  })
}