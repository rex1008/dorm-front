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
            <el-form-item label="班级:">
              <el-select v-model="searchData.clazzId" style="width: 150px">
                <el-option v-for="one in formCfg.clazzList" :key="one.id" :label="one.clazzName" :value="one.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input type="text" placeholder="学号" v-model="searchData.studentNo" clearble style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="text" placeholder="姓名" v-model="searchData.studentName" clearble style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="searchData.sex" style="width: 150px">
                <el-option v-for="one in formCfg.sexList" :key="one.value" :label="one.label" :value="one.value">
                </el-option>
              </el-select>
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
        <el-table-column prop="studentNo" label="学号">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名">
        </el-table-column>
        <el-table-column label="性别">
          <template v-slot:default="scope">
            <span v-if="scope.row.sex === 'M'">男</span>
            <span v-if="scope.row.sex === 'F'">女</span>
          </template>
        </el-table-column>
        <el-table-column label="照片">
          <template v-slot:default="scope">
            <el-image v-if="scope.row.photoPath" 
            style="width: 50px;height: 50px;"
            :src="toAddressable(scope.row.photoPath)"
            :preview-src-list="[toAddressable(scope.row.photoPath)]"
            :preview-teleported="true"
            fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="系别">
        </el-table-column>
        <el-table-column prop="clazzName" label="班级">
        </el-table-column>
        <el-table-column prop="dormBuildingName" label="宿舍楼">
        </el-table-column>
        <el-table-column prop="dormNo" label="宿舍">
        </el-table-column>
        <el-table-column label="操作" width="180px">
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
    <AddStudent :visible="addDiaVisible" 
      @update:visible="addDiaVisible = $event" 
      @success="handleAddSuccess"></AddStudent>
    <!-- 更新对话框 -->
    <UpdateStudent :visible="updateDiaVisible" 
      @update:visible="updateDiaVisible = $event" 
      :idToUpdate="idToUpdate"
      @success="handleUpdateSuccess"></UpdateStudent>
  </div>
</template>

<script setup name="StudentManage" lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import AddStudent from './AddStudent.vue';
import UpdateStudent from './UpdateStudent.vue';
import { useTable } from '../../hooks/useTable.ts';
import { deleteByIdApi, loadTableApi } from '../../api/studentApi.ts';
import { queryAllApi as listDept } from '../../api/deptApi.ts';
import { queryAllApi as listClazz } from '../../api/clazzApi.ts';
import { AnyObjsDefine } from '../../types/common';
import { useResource } from '../../hooks/useResource.ts';

let { toAddressable } = useResource()
let addDiaVisible = ref(false)
let updateDiaVisible = ref(false)
let idToUpdate = ref("")
let searchFormData = reactive({
  deptId: "",
  clazzId: "",
  sex: "",
  studentNo: "",
  studentName: ""
})

let formCfg = reactive({
  sexList: [
    { value: "", label: "全部" },
    { value: "M", label: "男" },
    { value: "F", label: "女" }
  ],
  deptList: [] as AnyObjsDefine,
  clazzList: [] as AnyObjsDefine
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

// 查询班级下拉框
function listClazzDropdown() {
  listClazz().then(result => {
    formCfg.clazzList = result.data
    formCfg.clazzList.unshift({id: "", clazzName: "全部"})
  })
}

onMounted(() => {
  listDeptDropdown()
  listClazzDropdown()
  loadTable()
})
</script>

<style scoped>

</style>