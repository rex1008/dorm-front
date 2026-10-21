<template>
  <div>
    <el-dialog title="修改" :model-value="visible" @open="handleOpen" :before-close="handleCancel">
      <section>
        <el-row>
          <el-col :span="24">
            <el-form :model="searchData" :inline="true" ref="searchForm">
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
              <el-form-item label="性别:">
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
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup name="StudentToAssign" lang="ts">
import { useTable } from '../../hooks/useTable.ts';
import { deleteByIdApi, loadTableApi } from '../../api/studentApi.ts';
import { queryAllApi as listDept } from '../../api/deptApi.ts';
import { queryAllApi as listClazz } from '../../api/clazzApi.ts';
import { AnyObjsDefine } from '../../types/common';
import { useResource } from '../../hooks/useResource.ts';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

defineProps<{
  visible: boolean
}>()

let emitter = defineEmits(["confirm", "update:visible"])

let { toAddressable } = useResource()
let searchForm = ref()
let selectedStudents = [] as AnyObjsDefine
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
} = useTable({ searchFormData, loadTableApi, deleteByIdApi })

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

function handleOpen() {
  listDeptDropdown()
  listClazzDropdown()
  loadTable()
}

function handleCancel() {
  searchForm.value.resetFields()
  emitter("update:visible", false)
}

function handleConfirm() {
  console.log("selectedStudents", selectedStudents)
  if(selectedStudents && selectedStudents.length > 0) {
    searchForm.value.resetFields()
    emitter("update:visible", false)
    emitter("confirm", selectedStudents)
  }else {
    ElMessage({ message: "请先选择学生", type: "warning" })
  }
}

// 处理表格checkbox勾选事件
function handleSelectionChange(newSelection: any[]) {
  console.log("newSelection", newSelection)
  selectedStudents = [] // 先置空
  newSelection.forEach(student => {
    selectedStudents.push({
      studentId: student.id,
      studentName: student.studentName
    })
  })
}
</script>

<style scoped>

</style>