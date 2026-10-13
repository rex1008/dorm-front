import { defineStore } from 'pinia'
import type { UserInfoDefine } from '../types/common'
import { getItem } from '../util/storageUtil'
import { STORAGE_USER_INFO_KEY } from '../config/constants'
import pinia from '.'
import userRoutes from '../config/userRoutes'

// 命名一般为hook的方式，即userXXX
export const useUserStore = defineStore("user", {
  // 定义动作的地方
  actions: {
    updateUserRoutesAttached(attached: boolean) {
      // 
      this.userRoutesAttached = attached
    },
    storeUserInfo(userInfo: UserInfoDefine) {
      // 模拟登录成功获取到token后再从后端获取当前用户拥有的路由
      userInfo.userRoutes = userRoutes
      this.userInfo = userInfo
    }
  },
  // 存储数据的地方
  state() {
    return {
      // 先从storage里取，若不存在，再给默认值
      userInfo: getItem(STORAGE_USER_INFO_KEY) ? JSON.parse(getItem(STORAGE_USER_INFO_KEY) as string) : {
        id: "123",
        username: "",
        avatarPath: "",
        userRoutes: []
      } as UserInfoDefine,
      userRoutesAttached: false,
    }
  }
})

// 在非.vue组件中使用store，需要传入pinia实例
export function useUserStoreExternal() {
  return useUserStore(pinia)
}