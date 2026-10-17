<template>
  <div>
    <section>
      <el-row>
        <el-col :span="2">
          <el-button @click="addDiaVisible = true" type="primary" :icon="Plus">
            新增
          </el-button>
        </el-col>
        <el-col :span="22">
          <el-form :model="searchData" :inline="true">
            <el-form-item>
              <el-input type="text" placeholder="系别名称" v-model="searchData.deptName" clearble style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="loadTable" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </section>

    <!-- 新增对话框 -->
    <AddDept :visible="addDiaVisible" 
      @update:visible="addDiaVisible = false" 
      @addSuccess="handleAddSuccess"></AddDept>
    <!-- 更新对话框 -->
  </div>
</template>

<script setup name="DeptManage" lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import AddDept from './AddDept.vue';
import UpdateDept from './UpdateDept.vue';


let addDiaVisible = ref(false)
let searchData = reactive({
  deptName: ""
})

function loadTable() {

}

function handleAddSuccess() {
  addDiaVisible.value = false
  loadTable()
}

</script>

<style scoped>

</style>