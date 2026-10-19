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
            <el-form-item label="系别:">
              <el-select v-model="searchData.deptId" style="width: 150px">
                <el-option v-for="one in formCfg.deptList" :key="one.id" :label="one.deptName" :value="one.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input type="text" placeholder="班级编号" v-model="searchData.clazzNo" clearble style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="text" placeholder="班级名称" v-model="searchData.clazzName" clearble style="width: 150px"></el-input>
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
          prop="clazzNo"
          label="编辑编号">
        </el-table-column>
        <el-table-column
          prop="clazzName"
          label="班级名称">
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
    <AddClazz :visible="addDiaVisible" 
      @update:visible="addDiaVisible = $event" 
      @success="handleAddSuccess"></AddClazz>
    <!-- 更新对话框 -->
    <UpdateClazz :visible="updateDiaVisible" 
      @update:visible="updateDiaVisible = $event" 
      :idToUpdate="idToUpdate"
      @success="handleUpdateSuccess"></UpdateClazz>
  </div>
</template>

<script setup name="ClazzManage" lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import AddClazz from './AddClazz.vue';
import UpdateClazz from './UpdateClazz.vue';
import { useTable } from '../../hooks/useTable.ts';
import { deleteByIdApi, loadTableApi } from '../../api/clazzApi.ts';
import { queryAllApi as listDept } from '../../api/deptApi.ts';
import { AnyObjsDefine } from '../../types/common';


let addDiaVisible = ref(false)
let updateDiaVisible = ref(false)
let idToUpdate = ref("")
let searchFormData = reactive({
  deptId: "",
  clazzNo: "",
  clazzName: ""
})

let formCfg = reactive({
  deptList: [] as AnyObjsDefine
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

// 查询系别下拉框
function listDeptDropdown() {
  listDept().then(result => {
    formCfg.deptList = result.data
    formCfg.deptList.unshift({id: "", deptName: "全部"})
  })
}

onMounted(() => {
  listDeptDropdown()
  loadTable()
})
</script>

<style scoped>

</style>