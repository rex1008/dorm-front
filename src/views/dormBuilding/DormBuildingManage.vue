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
              <el-input type="text" placeholder="宿舍楼编号" v-model="searchData.dormBuildingNo" clearble style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="text" placeholder="宿舍楼名称" v-model="searchData.dormBuildingName" clearble style="width: 150px"></el-input>
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
          prop="dormBuildingNo"
          label="宿舍楼编号">
        </el-table-column>
        <el-table-column
          prop="dormBuildingName"
          label="宿舍楼名称">
        </el-table-column>
        <el-table-column
          label="宿舍楼类型">
          <template v-slot:default="scope">
            {{ scope.row.type === 'M' ? "男生宿舍" : "女生宿舍" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="completeTime"
          label="落成时间">
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
    <AddDormBuilding :visible="addDiaVisible" 
      @update:visible="addDiaVisible = $event" 
      @success="handleAddSuccess"></AddDormBuilding>
    <!-- 更新对话框 -->
    <UpdateDormBuilding :visible="updateDiaVisible" 
      @update:visible="updateDiaVisible = $event" 
      :idToUpdate="idToUpdate"
      @success="handleUpdateSuccess"></UpdateDormBuilding>
  </div>
</template>

<script setup name="DormBuildingManage" lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import AddDormBuilding from './AddDormBuilding.vue';
import UpdateDormBuilding from './UpdateDormBuilding.vue';
import { useTable } from '../../hooks/useTable.ts';
import { deleteByIdApi, loadTableApi } from '../../api/dormBuildingApi.ts';


let addDiaVisible = ref(false)
let updateDiaVisible = ref(false)
let idToUpdate = ref("")
let searchFormData = reactive({
  dormBuildingNo: "",
  dormBuildingName: ""
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