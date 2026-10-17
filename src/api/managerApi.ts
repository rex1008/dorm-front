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
 * 查询个人信息
 * @param data
 */
export function queryByIdApi(id: string) {
  return doGet({
    url: "/manager/queryById",
    params: {id}
  })
}

/**
 * 修改个人信息
 * @param data
 */
export function modifyByIdApi(data: object) {
  return appJsonPost({
    url: "/manager/modifyById",
    data
  })
}

/**
 * 修改密码
 * @param data
 */
export function modifyPwdApi(data: object) {
  return appJsonPost({
    url: "/manager/modifyPwd",
    data
  })
}