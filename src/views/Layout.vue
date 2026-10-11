<template>
  <div class="layout">
    <el-container class="outer-container">
      <el-header>
        <NavHeader></NavHeader>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <SideBar @update:asideWidth="updateAsideWidth"></SideBar>
        </el-aside>
        <el-main>
          <Tabs></Tabs>
          <el-config-provider :value-on-clear="null" :empty-values="[undefined, null]">
            <router-view :key="currentRoute.fullPath"></router-view>
          </el-config-provider>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup name="Layout" lang="ts">
import { ref } from 'vue';
import NavHeader from '../components/NavHeader.vue';
import SideBar from '../components/SideBar.vue';
import Tabs from '../components/Tabs.vue';
import { useRoute } from 'vue-router';

let asideWidth = ref("200px")
let currentRoute = useRoute()

function updateAsideWidth(width: string) {
  asideWidth.value = width
}

</script>

<style scoped>
  .el-header {
    background-color: #0a366b;
    color: #fff;
    padding-left: 0;
  }

  .layout, .outer-container {
    height: 100%;
  }

  .el-aside {
    background-color: #003c7f;
  }

  .el-main {
    padding: 10px;
  }
</style>