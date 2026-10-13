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