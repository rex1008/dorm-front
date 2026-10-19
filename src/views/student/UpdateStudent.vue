<template>
  <div>
    <el-dialog title="修改" :model-value="visible" @open="handleOpen" :before-close="handleCancel" width="30%">
      <el-form ref="updateForm" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="系统编号:">
          <el-input v-model="formData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="系别:" prop="deptId">
          <el-select v-model="formData.deptId" style="width: 150px" @change="handleDeptChange">
            <el-option v-for="one in formCfg.deptList" :key="one.id" :label="one.deptName" :value="one.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级:" prop="clazzId">
          <el-select v-model="formData.clazzId" style="width: 150px">
            <el-option v-for="one in formCfg.clazzList" :key="one.id" :label="one.clazzName" :value="one.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号:" prop="studentNo">
          <el-input v-model="formData.studentNo"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="studentName">
          <el-input v-model="formData.studentName"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio v-model="formData.sex" label="M">男</el-radio>
          <el-radio v-model="formData.sex" label="F">女</el-radio>
        </el-form-item>
        <el-form-item label="照片:" prop="photoPath">
          <el-upload :action="uploadCfg.uploadUrl"
            :headers="uploadCfg.headers"
            :auto-upload="true"
            list-type="picture-card"
            :show-file-list="true" :on-success="handleSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :file-list="uploadInfo.fileList"
            >
            <template v-slot:trigger>
              <el-icon>
                <Plus />
              </el-icon>
            </template>
          </el-upload>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup name="UpdateStudent" lang="ts">
import { reactive, ref } from 'vue';
import { listByDeptIdApi as listClazzByDept } from '../../api/clazzApi';
import { modifyByIdApi, queryByIdApi } from '../../api/studentApi';
import { ElMessage, type UploadFile, type UploadFiles, type UploadUserFile } from 'element-plus';
import { queryAllApi as listDept } from '../../api/deptApi.ts';
import { AnyObjsDefine } from '../../types/common';
import { useUpload } from '../../hooks/useUpload';
import { useResource } from '../../hooks/useResource.ts';

const props = defineProps<{
  visible: boolean,
  idToUpdate: string
}>()

let emitter = defineEmits(["update:visible", "success"])

let uploadInfo = reactive<{ fileList: UploadUserFile[] }>({
  fileList: []
})

let { handleExceed, uploadCfg } = useUpload()
let { toAddressable } = useResource()
let updateForm = ref()
let formData = reactive({
  id: "",
  deptId: "",
  clazzId: "",
  studentNo: "",
  studentName: "",
  sex: "M",
  photoPath: ""
})

let formCfg = reactive({
  deptList: [] as AnyObjsDefine,
  clazzList: [] as AnyObjsDefine
})

let rules = reactive({
  deptId: [
    { required: true, message: "请选择系别", trigger: "blur" }
  ],
  clazzId: [
    { required: true, message: "请选择班级", trigger: "blur" }
  ],
  studentNo: [
    { required: true, message: "请输入学生编号", trigger: "blur" }
  ],
  studentName: [
    { required: true, message: "请输入学生姓名", trigger: "blur" }
  ],
  sex: [
    { required: true, message: "请选择性别", trigger: "blur" }
  ],
  photoPath: [
    { required: false, trigger: "blur" }
  ]
})

// 查询班级下拉框
function listClazzDropdown(deptId: string, isFirstLoad = false) {
  listClazzByDept(deptId).then(result => {
    formCfg.clazzList = result.data
    if(isFirstLoad) {
      // 每次弹框对话框打开第一次加载班级下拉时，不需要默认选中第一项，只有当系别下拉变化时重新加载班级下拉才需要默认选中第一项
      return
    }
    // 默认选中第一个
    if(formCfg.clazzList && formCfg.clazzList.length > 0) {
      formData.clazzId = formCfg.clazzList[0].id
    }else {
      // 如果未查到班级数据，班级下拉框需要置空，防止前面的操作遗留
      formData.clazzId = ""
    }
  })
}

// 处理系别下拉框变化
function handleDeptChange(value: any) {
  listClazzDropdown(value, false)
}

// 查询系别下拉框
function listDeptDropdown() {
  listDept().then(result => {
    formCfg.deptList = result.data
  })
}

function handleOpen() {
  listDeptDropdown()
  queryByIdApi(props.idToUpdate).then(result => {
    Object.assign(formData, result.data)
    listClazzDropdown(formData.deptId, true)
    // 设置图片
    let fullPath = toAddressable(result.data.photoPath)
    if(fullPath) {
      uploadInfo.fileList.push({url: fullPath, name: ""})
    }
  })
}

function handleSuccess(response: any, file: UploadFile, fileList: UploadFiles) {
  if(response.success) {
    uploadInfo.fileList = fileList

    // 业务逻辑
    formData.photoPath = response.data
    updateForm.value.validateField("photoPath")
  }else {
    ElMessage({message: response.msg, type: "error"})
  }
}

// file：删除的文件，fileList：还剩下的文件列表
function handleRemove(file: UploadFile, fileList: UploadFiles) {
  uploadInfo.fileList = fileList

  // 业务逻辑
  formData.photoPath = ""
}

function handleCancel() {
  uploadInfo.fileList = []
  updateForm.value.resetFields()
  emitter("update:visible", false)
}

function onSubmit() {
  updateForm.value.validate((valid: boolean) => {
    if(!valid) return
    modifyByIdApi(formData).then(result => {
      ElMessage({ message: result.data, type: "success" })
      uploadInfo.fileList = []
      updateForm.value.resetFields()
      emitter("success")
    })
  })
}
</script>

<style scoped>

</style>