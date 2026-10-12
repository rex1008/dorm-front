<template>
  <div ref="tabs">
    <el-tabs :model-value="activeTabName" @tab-click="tabClick" @contextmenu.prevent.native="openContextMenu"
      @tab-remove="closeTab">
      <el-tab-pane :name="item.path" v-for="item in openedTabs" :key="item.path" :label="item.text" :closable="true">

      </el-tab-pane>
    </el-tabs>

    <!-- 右键菜单 -->
    <ul v-show="contextMenuVisible" :style="{ left: left + 'px', top: top + 'px' }" class="context-menu">
      <li @click="refreshTab">
        <el-icon><Refresh /></el-icon>
        刷新页面
      </li>
      <li @click="closeCurrent">
        <el-icon><Close /></el-icon>
        关闭当前
      </li>
      <li v-show="otherVisible" @click="closeOthers">
        <el-icon><CircleClose /></el-icon>
        关闭其他
      </li>
      <li v-show="leftVisible" @click="closeLeft">
        <el-icon><DArrowLeft /></el-icon>
        关闭左侧
      </li>
      <li v-show="rightVisible" @click="closeRight">
        <el-icon><DArrowRight /></el-icon>
        关闭右侧
      </li>
      <li @click="closeAll">
        <el-icon><CircleClose /></el-icon>
        全部关闭
      </li>
    </ul>
  </div>
</template>

<script setup name="Tabs" lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTabStore } from '../store/useTab.ts';
import type { TabsPaneContext } from 'element-plus';
import type { TabDefine } from '../types/common';

let tabs = ref()
let activeTabName = ref("")
let contextMenuVisible = ref(false)
let left = ref(0)
let top = ref(0)
let otherVisible = ref(false)
let leftVisible = ref(false)
let rightVisible = ref(false)
// 定义一个变量，用来标记当前打开右键菜单的tab
let locatedTab = reactive<TabDefine>({path: "", text: "", fullPath: ""})
let router = useRouter()
let currentRoute = useRoute()
let tabStore = useTabStore()
let openedTabs = tabStore.openedTabInfo.tabs

// 监听contextMenuVisible.value的变化
watch(contextMenuVisible, () => {
  if(contextMenuVisible.value) {
    document.body.addEventListener("click", closeContextMenu)
  }else {
    document.body.removeEventListener("click", closeContextMenu)
  }
})

// 监听路由变化
watch(currentRoute, (newValue, oldValue) => {
  // 设置激活的tab
  activeTabName.value = newValue.path
  if("/" === newValue.path) return

  // 把路由对象转换成tab存储到pinia种
  let tab: TabDefine = {
    path: newValue.path,
    text: newValue.meta.menuName as string,
    fullPath: newValue.fullPath,
    query: newValue.query
  }
  tabStore.addTabIfNotExist(tab)
}, {
  immediate: true
})

function tabClick(tab: TabsPaneContext) {
  let clickedTab = openedTabs.find(obj => obj.path === tab.paneName) as TabDefine
  router.replace(clickedTab.fullPath)
}

// 打开右键菜单
function openContextMenu(e: PointerEvent) {
  // 判断只有点击的是tab-pane区域才打开右键菜单。id格式：tab-/user/manage
  let tabIndex = (e.target as HTMLElement).id.indexOf("tab-")
  if(tabIndex === -1){
    return
  }

  const contextMenuMinWidth = 105
  // 获取当前组件最外层元素的宽度
  const offsetWidth = tabs.value.offsetWidth
  // 距离左边的最大距离，超过这个距离右键菜单会被遮盖，需要往左边移动一点
  const maxLeft = offsetWidth - contextMenuMinWidth
  const clientX = e.clientX - 15
  if(clientX > maxLeft) {
    left.value = maxLeft
  }else {
    left.value = clientX
  }

  top.value = e.clientY + 20
  // 设置右键菜单可见
  contextMenuVisible.value = true
  let start = tabIndex + "tab-".length
  // 
  let locatedTabPath = (e.target as HTMLElement).id.substring(start)
  // 标记当前点击的tab
  locatedTab = findTabByPath(locatedTabPath) as TabDefine

  // 计算右键菜单中哪些选项需要存在，哪些不需要存在
  decideLeftVisible()
  decideRightVisible()
  decideOtherVisible()
}

function closeContextMenu() {
  contextMenuVisible.value = false
}

function decideLeftVisible() {
  // 当前点击的tab页不是最左边的，右键菜单就可以显示“关闭左边”
  leftVisible.value = locatedTab.path != openedTabs[0].path
}

function decideRightVisible() {
  // 当前点击的tab页不是最右边的，右键菜单就可以显示“关闭右边”
  rightVisible.value = locatedTab.path != openedTabs[openedTabs.length - 1].path
}

function decideOtherVisible() {
  // 只要打开的tab页多于1个，右键菜单就可以显示“关闭其他”
  otherVisible.value = openedTabs.length > 1
}

function findTabByPath(path: string): TabDefine | undefined {
  return openedTabs.find(obj => obj.path === path)
}

function closeTab(tabName: string) {
  // 关闭的是激活的tab
  if(tabName == activeTabName.value) {
    if(openedTabs.length == 1) {
      // 只有1个tab时，关闭后跳转到首页
      router.replace("/")
    }else {
      // 计算当前点击的是哪个tab
      let tabToCloseIndex = openedTabs.findIndex(obj => obj.path === tabName)
      let tabToActive: TabDefine

      if(tabToCloseIndex === 0) {
        // 当前点击的tab是第一个tab，则激活其右边的tab页
        tabToActive = openedTabs[tabToCloseIndex + 1]
      }else {
        // 当前点击的tab不是第一个tab，则激活其左边的tab页
        tabToActive = openedTabs[tabToCloseIndex + 1]
      }

      // 跳转到要激活的tab页
      router.replace(tabToActive.fullPath)
    }
  }

  // 最后统一处理store
  tabStore.closeTab(tabName)
}

function refreshTab() {
  
}

function closeCurrent() {

}

function closeOthers() {

}

function closeLeft() {

}

function closeRight() {

}

function closeAll() {

}
</script>

<style scoped>
.context-menu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgb(0, 0, 0, .3);
}

.context-menu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}

.context-menu li :hover {
  background-color: #eee;
}
</style>