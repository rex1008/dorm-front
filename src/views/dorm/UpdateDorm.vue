<template>
  <div>
    <el-form ref="updateForm" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="系统编号:">
        <el-input v-model="formData.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="宿舍楼:" prop="dormBuildingId">
        <el-select v-model="formData.dormBuildingId" style="width: 150px">
          <el-option v-for="one in formCfg.dormBuildingList" :key="one.id" :label="one.dormBuildingName" :value="one.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍编号:" prop="dormNo">
        <el-input v-model="formData.dormNo"></el-input>
      </el-form-item>
      <el-form-item label="宿舍容量:" prop="capacity">
        <el-input-number v-model="formData.capacity" :pricision="0" :step="1" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="添加学生:" prop="studentIds">
        <el-input v-model="formData.studentNames" disabled style="width: 400px">
          <template v-slot:append>
            <el-button @click="studentToAssignDiaVisible = true" :icon="Plus"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>

    <!-- 选择学生对话框 -->
    <StudentToAssign :visible="studentToAssignDiaVisible" 
      @update:visible="studentToAssignDiaVisible = $event" 
      @confirm="handleConfirm"></StudentToAssign>
  </div>
</template>

<script setup name="UpdateDorm" lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { modifyByIdApi, queryByIdApi } from '../../api/dormApi';
import { ElMessage } from 'element-plus';
import { queryAllApi as listDormbuilding } from '../../api/dormBuildingApi.ts';
import { AnyObjsDefine } from '../../types/common';
import { Plus } from '@element-plus/icons-vue';
import StudentToAssign from './StudentToAssign.vue';
import { useRoute, useRouter } from 'vue-router';

let router = useRouter()
let currentRoute = useRoute()
let updateForm = ref()
let studentToAssignDiaVisible = ref(false)
let formData = reactive({
  id: "",
  dormBuildingId: "",
  dormNo: "",
  capacity: 1,
  studentIds: [] as string[],
  studentNames: ""
})

let formCfg = reactive({
  dormBuildingList: [] as AnyObjsDefine
})

let rules = reactive({
  dormBuildingId: [
    { required: true, message: "请选择宿舍楼", trigger: "blur" }
  ],
  dormNo: [
    { required: true, message: "请输入宿舍编号", trigger: "blur" }
  ],
  capacity: [
    { required: true, message: "请输入宿舍容量", trigger: "blur" }
  ]
})

// 查询宿舍楼下拉框
function listDormbuildingDropdown() {
  listDormbuilding().then(result => {
    formCfg.dormBuildingList = result.data
  })
}

function handleConfirm(selectedStudents: AnyObjsDefine) {
  if(selectedStudents.length > formData.capacity) {
    ElMessage.warning("宿舍容量不足")
    return
  }
  studentToAssignDiaVisible.value = false
  formData.studentIds = selectedStudents.map(student => student.studentId)
  formData.studentNames = selectedStudents.map(student => student.studentName).join(",")
}

function onSubmit() {
  updateForm.value.validate((valid: boolean) => {
    if(!valid) return
    modifyByIdApi(formData).then(result => {
      ElMessage({ message: result.data, type: "success" })

      updateForm.value.resetFields()
      router.replace("/dorm/manage")
    })
  })
}

onMounted(() => {
  listDormbuildingDropdown()
  let idToUpdate = currentRoute.query.idToUpdate as string
  queryByIdApi(idToUpdate).then(result => {
    Object.assign(formData, result.data)
    formData.studentIds = (result.data.studentList as AnyObjsDefine).map(student => student.id)
    formData.studentNames = (result.data.studentList as AnyObjsDefine).map(student => student.studentName).join(",")
  })
})
</script>

<style scoped>

</style>