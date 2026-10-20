<template>
  <div>
    <section>
      <el-row>
        <el-col :span="2">
          <el-button @click="toAdd" type="primary" :icon="Plus">
            新增
          </el-button>
        </el-col>
        <el-col :span="22">
          <el-form :model="searchData" :inline="true">
            <el-form-item label="宿舍楼:">
              <el-select v-model="searchData.dormBuildingId" style="width: 150px">
                <el-option v-for="one in formCfg.dormBuildingList" :key="one.id" :label="one.dormBuildingName" :value="one.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input type="text" placeholder="宿舍编号" v-model="searchData.dormNo" clearble style="width: 150px"></el-input>
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
          prop="dormNo"
          label="宿舍编号">
        </el-table-column>
        <el-table-column
          prop="capacity"
          label="宿舍容量">
        </el-table-column>
        <el-table-column
          label="入住信息">
          <template v-slot:default="scope">
            <span v-if="scope.row.studentList && scope.row.studentList.length > 0" 
              v-for="student in scope.row.studentList" :key="student.id">
              <el-tag type="primary">{{ student.studentName }}</el-tag>
            </span>
            <span v-if="scope.row.studentList && scope.row.studentList.length > 0">
              （共<span class="color-red">{{ scope.row.studentList.length }}</span>人）
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dormBuildingName"
          label="宿舍楼名称">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-button type="primary" :icon="Edit" @click="toUpdate(scope.row.id)">
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
  </div>
</template>

<script setup name="DormManage" lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { useTable } from '../../hooks/useTable.ts';
import { deleteByIdApi, loadTableApi } from '../../api/dormApi.ts';
import { queryAllApi as listDormbuilding } from '../../api/dormBuildingApi.ts';
import { AnyObjsDefine } from '../../types/common';
import { useRouter } from 'vue-router';

let searchFormData = reactive({
  dormBuildingId: "",
  dormNo: ""
})

let formCfg = reactive({
  dormBuildingList: [] as AnyObjsDefine
})

let {
  searchData, 
  tableData, 
  loadTable, 
  handlePageSizeChange, 
  handlePageIndexChange, 
  deleteById
} = useTable({ searchFormData, loadTableApi, deleteByIdApi })
let router = useRouter()

function toAdd() {
  router.replace("/dorm/toAdd")
}

function toUpdate(id: string) {
  router.replace({
    path: "/dorm/toUpdate",
    query: {
      idToUpdate: id
    }
  })
}

// 查询宿舍楼下拉框
function listDormbuildingDropdown() {
  listDormbuilding().then(result => {
    formCfg.dormBuildingList = result.data
    formCfg.dormBuildingList.unshift({id: "", deptName: "全部"})
  })
}

onMounted(() => {
  listDormbuildingDropdown()
  loadTable()
})
</script>

<style scoped>

</style>