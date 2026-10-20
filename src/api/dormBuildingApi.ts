import { doGet, appJsonPost } from "../network/request";

/**
 * @param data
 */
export function addApi(data: object) {
  return appJsonPost({
    url: "/dormBuilding/add",
    data
  })
}

export function loadTableApi(searchData: object) {
  return appJsonPost({
    url: "/dormBuilding/queryPage",
    data: searchData
  })
}

export function deleteByIdApi(id: string) {
  return doGet({
    url: "/dormBuilding/deleteById",
    params: { id }
  })
}

export function queryByIdApi(id: string) {
  return doGet({
    url: "/dormBuilding/queryById",
    params: { id }
  })
}

export function modifyByIdApi(data: object) {
  return appJsonPost({
    url: "/dormBuilding/modifyById",
    data
  })
}

export function queryAllApi() {
  return doGet({
    url: "/dormBuilding/queryAll"
  })
}