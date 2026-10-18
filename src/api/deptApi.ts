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

export function loadTableApi(searchData: object) {
  return appJsonPost({
    url: "/dept/queryPage",
    data: searchData
  })
}

export function deleteByIdApi(id: string) {
  return doGet({
    url: "/dept/deleteById",
    params: { id }
  })
}

export function queryByIdApi(id: string) {
  return doGet({
    url: "/dept/queryById",
    params: { id }
  })
}

export function modifyByIdApi(data: object) {
  return appJsonPost({
    url: "/dept/modifyById",
    data
  })
}

export function queryAllApi() {
  return doGet({
    url: "/dept/queryAll"
  })
}