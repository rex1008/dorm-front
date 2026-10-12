import { defineStore } from 'pinia'
import type { TabArrayDefine, TabDefine } from '../types/common'

// 命名一般为hook的方式，即userXXX
export const useTabStore = defineStore("tab", {
  // 定义动作的地方
  actions: {
    addTabIfNotExist(tabToAdd: TabDefine) {
      // 判断state里面是否已存在
      let existFlag = this.openedTabInfo.tabs.some(obj => obj.path === tabToAdd.path)
      if(existFlag) {
        return
      }
      this.addTab(tabToAdd)
    },
    addTab(tabToAdd: TabDefine) {
      this.openedTabInfo.tabs.push(tabToAdd)
    },
    closeTab(tabName: string) {
      this.openedTabInfo.tabs = this.openedTabInfo.tabs.filter(val => val.path !== tabName)
    },
    closeOthers(locatedTab: TabDefine) {
      this.openedTabInfo.tabs = this.openedTabInfo.tabs.filter(val => val.path === locatedTab.path)
    },
    closeLeft(locatedTab: TabDefine) {
      // 先计算出locatedTab索引
      let locatedTabIndex = this.openedTabInfo.tabs.findIndex(obj => obj.path === locatedTab.path)
      // 遍历tabs，从locatedTabIndex下标开始都保留
      let remainTabs = this.openedTabInfo.tabs.filter((obj, index) => index >= locatedTabIndex)
      this.openedTabInfo.tabs = remainTabs
    },
    closeRight(locatedTab: TabDefine) {
      // 先计算出locatedTab索引
      let locatedTabIndex = this.openedTabInfo.tabs.findIndex(obj => obj.path === locatedTab.path)
      // 遍历tabs，从下标0到locatedTabIndex下标保留，大于locatedTabIndex的全部移除
      let remainTabs = this.openedTabInfo.tabs.filter((obj, index) => index <= locatedTabIndex)
      this.openedTabInfo.tabs = remainTabs
    },
    closeAll() {
      this.openedTabInfo.tabs = []
    }
  },
  // 存储数据的地方
  state() {
    return {
      openedTabInfo: {
        // 要打开的tab数据
        tabs: [] as TabArrayDefine
      }
    }
  }
})