import { doGet, appJsonPost } from "../network/request";

/**
 * @param data
 */
export function addApi(data: object) {
  return appJsonPost({
    url: "/clazz/add",
    data
  })
}

export function loadTableApi(searchData: object) {
  return appJsonPost({
    url: "/clazz/queryPage",
    data: searchData
  })
}

export function deleteByIdApi(id: string) {
  return doGet({
    url: "/clazz/deleteById",
    params: { id }
  })
}

export function queryByIdApi(id: string) {
  return doGet({
    url: "/clazz/queryById",
    params: { id }
  })
}

export function modifyByIdApi(data: object) {
  return appJsonPost({
    url: "/clazz/modifyById",
    data
  })
}

export function queryAllApi() {
  return doGet({
    url: "/clazz/queryAll"
  })
}

export function listByDeptIdApi(deptId: string) {
  return doGet({
    url: "/clazz/listByDeptId",
    params: { deptId }
  })
}