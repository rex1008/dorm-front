import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, STORAGE_USER_TOKEN_KEY } from "../config/constants";
import nProgress from "nprogress";
import { clearAll, getItem } from "../util/storageUtil";
import { ElMessageBox } from "element-plus";
import { ResultDefine } from "../types/common";

// 对axios的全局设置
axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 1000 * 60 * 10 // 单位ms
axios.defaults.headers["Content-Type"] = "application/json"

// 用来发送get请求的axios实例
const instance: AxiosInstance = axios.create()

// 请求拦截器
instance.interceptors.request.use(config => {
  nProgress.start()

  // 获取token并加入到请求头中
  const userToken = getItem(STORAGE_USER_TOKEN_KEY)
  if(userToken) {
    config.headers["Authorization"] = userToken
  }
  return config
}, error => {
  console.log("请求发送失败", error)
  ElMessageBox.alert("请求发送失败", "错误提示")
  return Promise.reject("请求发送失败")
})


// 响应拦截器
instance.interceptors.response.use((resultWrapper: AxiosResponse<any, any>) => {
  nProgress.done()

  // resultWrapper.data才是真正的服务器返回的数据
  const result = resultWrapper.data
  if(result.success) {
    return result
  }else {
    if(result.code && result.code === 30001) {
      // 没有权限或者token过期
      clearAll()
      // 通过刷新页面触发路由守卫中的控制，强制跳转到登录页
      window.location.reload()
    } else {
      // 其他业务异常，进行统一提示
      ElMessageBox.alert(result.msg, "错误提示")
      return Promise.reject(result)
    }
  }
}, error => {
  nProgress.done()
  console.log("服务器响应失败", error)
  ElMessageBox({message: "服务器响应失败", type: "error"})
  return Promise.reject("服务器响应失败")
})


// 发送get请求
export function doGet(config: AxiosRequestConfig): Promise<ResultDefine> {
  return instance(config)
}

// 用来发送body为json格式的post请求
export function appJsonPost(config: AxiosRequestConfig): Promise<ResultDefine> {
  return instance({
    ...config,
    method: "post"
  })
}