<template>
  <div class="side-bar">
    <div class="collapse">
      <span v-show="isCollapsed" @click="toggleCollapse">
        <el-icon><Expand/></el-icon>
      </span>
      <span v-show="!isCollapsed" @click="toggleCollapse">
        <el-icon><Fold/></el-icon>
      </span>
    </div>
    <!-- 菜单列表 -->
    <el-scrollbar>
      <el-menu @select="handleSelect" :default-active="defaultActivePath" :collapse="isCollapsed"
        :collapse-trasition="true" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="menu in menuList" :key="menu.path">
          <MenuItem :item="menu"></MenuItem>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup name="SideBar" lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/useUserStore.ts';
import MenuItem from './MenuItem.vue';
import type { MenuItemDefine, MenuItemsDefine, UserRoutesDefine } from '../types/common';

let router = useRouter()
let currentRoute = useRoute()
let userStore = useUserStore()
let isCollapsed = ref(false)
// 控制刷新页面或者路由变更时应该渲染哪个菜单为选中状态
let defaultActivePath = ref("")

// 菜单列表
let menuList = reactive<MenuItemsDefine>([])

// 监听
watch(() => currentRoute.path, (newValue, oldValue) => {
  defaultActivePath.value = newValue
}, {
  immediate: true
})

let emitter = defineEmits(["update:asideWidth"])
function toggleCollapse() {
  // 修改父组件el-aside的宽度，采用声明式
  if(isCollapsed.value) {
    // 当前是折叠状态，展开的话，侧边栏宽度设置为200px
    emitter("update:asideWidth", "200px")
  }else {
    // 当前是展开状态，折叠的话，侧边栏宽度设置为65px
    emitter("update:asideWidth", "65px")
  }

  isCollapsed.value = !isCollapsed.value
}

// 点击菜单事件，带参数index，index会配置成菜单对应的路由路径
function handleSelect(index: string) {
  router.replace(index)
}

// 计算菜单列表
function calcMenuList() {
  doCalcMenuList(userStore.userInfo.userRoutes, "/")
}

function doCalcMenuList(rawRoutes: UserRoutesDefine, ancestorPath: string, parentMenu?: MenuItemDefine) {
  rawRoutes.forEach(rawRoute => {
    let isMenu = rawRoute.meta && rawRoute.meta.showInMenu
    let hasChildren = rawRoute.children && rawRoute.children.length > 0

    if(!ancestorPath.endsWith("/")) {
      // 连接多级路由
      ancestorPath += "/"
    }
    // 拼接路由的全路径
    let routePath = `${ancestorPath}${rawRoute.path}`
    if(isMenu) {
      let menu: MenuItemDefine = {
        path: routePath,
        name: rawRoute.name,
        menuName: rawRoute.meta?.menuName || "",
        icon: rawRoute.meta?.icon || "",
      }
      if(hasChildren) {
        doCalcMenuList(rawRoute.children as UserRoutesDefine, routePath, menu)
      }

      if(parentMenu) {
        // 有父级菜单就放到父级的children中
        if(parentMenu.children) {
          parentMenu.children.push(menu)
        }else {
          parentMenu.children = [menu]
        }
      }else {
        menuList.push(menu)
      }
    }else {
      if(hasChildren) {
        doCalcMenuList(rawRoute.children as UserRoutesDefine, routePath)
      }
    }
  })
}

// 生命周期钩子
onMounted(() => {
  calcMenuList()
})

</script>

<style scoped>
.collapse {
  background-color: rgb(110, 170, 220);
  padding: 10px 5px 5px 5px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  line-height: 1.5;
}

/* 避免 el-menu-item 选中时多1px */
.el-menu {
  border-right-width: 0;
}

/* 侧边栏背景 */
.side-bar ul, .side-bar li, :deep(.el-menu) {
  background-color: #003c7f;
}

/* 多级菜单悬浮/激活时的背景 */
:deep(.el-sub-menu__title:hover) {
  background-color: rgb(0, 48, 102) !important;
}

:deep(.el-menu-item:focus), :deep(.el-menu-item:hover), :deep(.el-menu-item.is-active) {
  background-color: rgb(0, 48, 102) !important;
}
</style>