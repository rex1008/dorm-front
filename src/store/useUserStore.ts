import { defineStore } from 'pinia'
import type { UserInfoDefine } from '../types/common'
import { getItem } from '../util/storageUtil'
import { STORAGE_USER_INFO_KEY } from '../config/constants'

// 命名一般为hook的方式，即userXXX
export const useUserStore = defineStore("user", {
  // 定义动作的地方
  actions: {},
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