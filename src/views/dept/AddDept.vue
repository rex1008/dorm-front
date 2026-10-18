<template>
  <div>
    <el-dialog title="新增" :model-value="visible" :before-close="handleCancel" width="30%">
      <el-form ref="addForm" :model="formData" :rules="rules" label-width="80px">
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

<script setup name="AddDept" lang="ts">
import { reactive, ref } from 'vue';
import { addApi } from '../../api/deptApi';
import { ElMessage } from 'element-plus';

defineProps<{
  visible: boolean
}>()

let emitter = defineEmits(["update:visible", "success"])

let addForm = ref()
let formData = reactive({
  deptName: ""
})

let rules = reactive({
  deptName: [
    { required: true, message: "请输入系别名称", trigger: "blur" }
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