<template>
  <div>
    这是登录页
    <el-button @click="refresh">刷新</el-button>
  </div>
</template>

<script setup name="Login" lang="ts">
import { useRoute, useRouter } from 'vue-router';
let router = useRouter()
  function refresh() {
    router.replace({
      path: "/redirect" + "/login",
      query: {a: 1}
    })
  }
</script>

<style scoped>

</style>