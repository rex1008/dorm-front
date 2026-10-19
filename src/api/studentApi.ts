import { doGet, appJsonPost } from "../network/request";

/**
 * @param data
 */
export function addApi(data: object) {
  return appJsonPost({
    url: "/student/add",
    data
  })
}

export function loadTableApi(searchData: object) {
  return appJsonPost({
    url: "/student/queryPage",
    data: searchData
  })
}

export function deleteByIdApi(id: string) {
  return doGet({
    url: "/student/deleteById",
    params: { id }
  })
}

export function queryByIdApi(id: string) {
  return doGet({
    url: "/student/queryById",
    params: { id }
  })
}

export function modifyByIdApi(data: object) {
  return appJsonPost({
    url: "/student/modifyById",
    data
  })
}