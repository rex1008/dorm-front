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

    <!-- 表格 -->
    <section>
      <el-table
        :data="tableData.rows"
        stripe
        :border="true"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="系统编号">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="系别名称">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-button type="primary" :icon="Edit" @click="openUpdateDia(scope.row.id)">
              编辑
            </el-button>
            <el-button type="danger" :icon="Delete" @click="deleteById(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页栏 -->
    <section style="margin-top: 5px;">
      <el-pagination 
        @size-change="handlePageSizeChange"
        @current-change="handlePageIndexChange"
        :current-page="searchData.pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="searchData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      >

      </el-pagination>
    </section>
     

    <!-- 新增对话框 -->
    <AddDept :visible="addDiaVisible" 
      @update:visible="addDiaVisible = $event" 
      @success="handleAddSuccess"></AddDept>
    <!-- 更新对话框 -->
    <UpdateDept :visible="updateDiaVisible" 
      @update:visible="updateDiaVisible = $event" 
      :idToUpdate="idToUpdate"
      @success="handleUpdateSuccess"></UpdateDept>
  </div>
</template>

<script setup name="DeptManage" lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import AddDept from './AddDept.vue';
import UpdateDept from './UpdateDept.vue';
import { useTable } from '../../hooks/useTable.ts';
import { deleteByIdApi, loadTableApi } from '../../api/deptApi.ts';


let addDiaVisible = ref(false)
let updateDiaVisible = ref(false)
let idToUpdate = ref("")
let searchFormData = reactive({
  deptName: ""
})

let {
  searchData, 
  tableData, 
  loadTable, 
  handlePageSizeChange, 
  handlePageIndexChange, 
  deleteById
} = useTable({ searchFormData, loadTableApi, deleteByIdApi })

function openUpdateDia(id: string) {
  idToUpdate.value = id
  updateDiaVisible.value = true
}

function handleAddSuccess() {
  addDiaVisible.value = false
  loadTable()
}

function handleUpdateSuccess() {
  updateDiaVisible.value = false
  loadTable()
}

onMounted(() => {
  loadTable()
})

</script>

<style scoped>

</style>