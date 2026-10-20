<template>
  <div>
    <el-dialog title="新增" :model-value="visible" :before-close="handleCancel" width="30%">
      <el-form ref="addForm" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="宿舍楼编号:" prop="dormBuildingNo">
          <el-input v-model="formData.dormBuildingNo"></el-input>
        </el-form-item>
        <el-form-item label="宿舍楼名称:" prop="dormBuildingName">
          <el-input v-model="formData.dormBuildingName"></el-input>
        </el-form-item>
        <el-form-item label="宿舍楼类型:" prop="type">
          <el-radio v-model="formData.type" label="M">男生宿舍</el-radio>
          <el-radio v-model="formData.type" label="F">女生宿舍</el-radio>
        </el-form-item>
        <el-form-item label="落成时间:" prop="completeTime">
          <el-date-picker type="date" 
            v-model="formData.completeTime" 
            placeholder="请选择落成时间" 
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup name="AddDormBuilding" lang="ts">
import { reactive, ref } from 'vue';
import { addApi } from '../../api/dormBuildingApi';
import { ElMessage } from 'element-plus';

defineProps<{
  visible: boolean
}>()

let emitter = defineEmits(["update:visible", "success"])

let addForm = ref()
let formData = reactive({
  dormBuildingNo: "",
  dormBuildingName: "",
  type: "M",
  completeTime: ""
})

let rules = reactive({
  dormBuildingNo: [
    { required: true, message: "请输入宿舍楼编号", trigger: "blur" }
  ],
  dormBuildingName: [
    { required: true, message: "请输入宿舍楼名称", trigger: "blur" }
  ],
  type: [
    { required: true, message: "请选择宿舍楼类型", trigger: "blur" }
  ],
  completeTime: [
    { required: true, message: "请选择落成时间", trigger: "blur" }
  ]
})

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