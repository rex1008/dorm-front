<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="App">
import { onMounted, onUnmounted } from 'vue';
import { saveItem } from './util/storageUtil';
import { STORAGE_USER_INFO_KEY } from './config/constants';
import { useUserStore } from './store/useUserStore';

let userStore = useUserStore()

function saveUserInfo() {
  saveItem(STORAGE_USER_INFO_KEY, userStore.userInfo)
}

onMounted(() => {
  // 页面销毁（比如刷新）之前会调用指定的回调
  window.addEventListener("beforeunload", saveUserInfo)
})

onUnmounted(() => {
  window.removeEventListener("beforeunload", saveUserInfo)
})

</script>

<style>
  html,body,#app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<style scoped>
  .app-wrapper {
    height: 100%;
  }
</style>