<template>
  <div>
    <el-dialog title="更新" :model-value="visible" @open="handleOpen" :before-close="handleCancel" width="30%">
      <el-form ref="updateForm" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="系统编号:">
          <el-input v-model="formData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="系别名称:" prop="deptName">
          <el-input v-model="formData.deptName"></el-input>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup name="UpdateDept" lang="ts">
import { reactive, ref } from 'vue';
import { modifyByIdApi, queryByIdApi } from '../../api/deptApi';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  visible: boolean,
  idToUpdate: string
}>()

let emitter = defineEmits(["update:visible", "success"])

let updateForm = ref()
let formData = reactive({
  id: "",
  deptName: ""
})

let rules = reactive({
  deptName: [
    { required: true, message: "请输入系别名称", trigger: "blur" }
  ]
})

function handleOpen() {
  queryByIdApi(props.idToUpdate).then(result => {
    Object.assign(formData, result.data)
  })
}

function handleCancel() {
  updateForm.value.resetFields()
  emitter("update:visible", false)
}

function onSubmit() {
  updateForm.value.validate((valid: boolean) => {
    if(!valid) return
    modifyByIdApi(formData).then(result => {
      ElMessage({ message: result.data, type: "success" })

      updateForm.value.resetFields()
      emitter("success")
    })
  })
}
</script>

<style scoped>

</style>