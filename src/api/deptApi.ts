import { doGet, appJsonPost } from "../network/request";

/**
 * @param data
 */
export function addApi(data: object) {
  return appJsonPost({
    url: "/dept/add",
    data
  })
}