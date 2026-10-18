<template>
  <div>
    <el-dialog title="新增" :model-value="visible" @open="handleOpen" :before-close="handleCancel" width="30%">
      <el-form ref="addForm" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="系别:" prop="deptId">
          <el-select v-model="formData.deptId" style="width: 150px">
                <el-option v-for="one in formCfg.deptList" :key="one.id" :label="one.deptName" :value="one.id">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="班级编号:" prop="clazzNo">
          <el-input v-model="formData.clazzNo"></el-input>
        </el-form-item>
        <el-form-item label="班级名称:" prop="clazzName">
          <el-input v-model="formData.clazzName"></el-input>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup name="AddClazz" lang="ts">
import { reactive, ref } from 'vue';
import { addApi } from '../../api/clazzApi';
import { ElMessage } from 'element-plus';
import { queryAllApi as listDept } from '../../api/deptApi.ts';
import { AnyObjsDefine } from '../../types/common';

defineProps<{
  visible: boolean
}>()

let emitter = defineEmits(["update:visible", "success"])

let addForm = ref()
let formData = reactive({
  deptId: "",
  clazzNo: "",
  clazzName: ""
})

let formCfg = reactive({
  deptList: [] as AnyObjsDefine
})

let rules = reactive({
  deptId: [
    { required: true, message: "请选择系别", trigger: "blur" }
  ],
  clazzNo: [
    { required: true, message: "请输入班级编号", trigger: "blur" }
  ],
  clazzName: [
    { required: true, message: "请输入班级名称", trigger: "blur" }
  ]
})

// 查询系别下拉框
function listDeptDropdown() {
  listDept().then(result => {
    formCfg.deptList = result.data
    // 默认选中第一个
    if(formCfg.deptList && formCfg.deptList.length > 0) {
      formData.deptId = formCfg.deptList[0].id
    }
  })
}

function handleOpen() {
  listDeptDropdown()
}

function handleCancel() {
  addForm.value.resetFields()
  emitter("update:visible", false)
}

function onSubmit() {
  addForm.value.validate((valid: boolean) => {
    if(!valid) return
    addApi(formData).then(result => {
      ElMessage({ message: result.data, type: "success" })

      addForm.value.resetFields()
      emitter("success")
    })
  })
}
</script>

<style scoped>

</style>