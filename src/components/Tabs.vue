<template>
  <div>
    <el-tabs :model-value="activeTabName" @tab-click="tabClick" @contextmenu.prevent.native="openContextMenu"
      @tab-remove="closeTab">
      <el-tab-pane :name="item.path" v-for="item in tabStore.openedTabInfo.tabs" :key="item.path" :label="item.text" :closable="true">

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
  router.replace("")
}

// 打开右键菜单
function openContextMenu(e: PointerEvent) {
  
}

function closeTab() {

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