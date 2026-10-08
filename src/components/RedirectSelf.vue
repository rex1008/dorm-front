<template>
  <div>

  </div>
</template>

<script setup name="RedirectSelf" lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

  /*
    一个临时中转页面，用于实现刷新的功能，流程：从原始路由页面（或者说当前页面）-> RedirectSelf页面 -> 原始路由页面，
    即从要刷新的页面先跳转到RedirectSelf页面，再从RedirectSelf页面跳回到要刷新的页面，从而实现页面刷新
  */
 let router = useRouter()
  onMounted(() => {
    const { params, query } = useRoute()
    const { originalPath } = params
    console.log(originalPath)
    router.replace({
      path: "/" + originalPath,
      query
    })
  })

</script>

<style scoped>

</style>