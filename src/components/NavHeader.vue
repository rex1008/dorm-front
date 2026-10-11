<template>
  <div>
    <el-row>
      <el-col :span="10" style="height: 60px">
        <el-image :src="getImage('logo.png')" class="logo"></el-image>
      </el-col>
      <el-col :span="4" :offset="10" class="user-info">
        <el-dropdown class="profile-container" trigger="click" @command="handleCommand">
          <span class="cursor-pointer">
            <el-avatar class="avatar" v-if="userStore.userInfo.avatarPath" :src="toAddressable(userStore.userInfo.avatarPath)">
            </el-avatar>
            <el-avatar class="avatar" v-else :src="getImage('user.png')">
            </el-avatar>
            <el-icon class="arrow">
              <arrow-down></arrow-down>
            </el-icon>
          </span>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="updateProfile">修改个人信息</el-dropdown-item>
              <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>

    <!-- 修改个人信息对话框 -->
    <el-dialog title="修改个人信息" v-model="updateProfileDiaVisible" @close="handleUpdateProfileDiaClose">
      <el-form ref="updateProfileForm" :model="updateProfileFormData" :rules="updateProfileRules" label-width="120px">
        <el-form-item label="用户编号:" prop="id">
          <el-input v-model="updateProfileFormData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="updateProfileFormData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="照片:" prop="avatarPath">
          <el-upload action="xxx"
            :auto-upload="true"
            list-type="picture-card"
            :show-file-list="true" :on-success="handleAvatarSuccess"
            :limit="1"
            :on-exceed="handleAvatarExceed"
            :on-remove="handleAvatarRemove"
            :file-list="uploadInfo.fileList"
            >
            <template v-slot:trigger>
              <el-icon>
                <Plus />
              </el-icon>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="realName">
          <el-input v-model="updateProfileFormData.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio v-model="updateProfileFormData.sex" label="M">男</el-radio>
          <el-radio v-model="updateProfileFormData.sex" label="F">女</el-radio>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleUpdateProfileDiaClose">取消</el-button>
          <el-button type="primary" @click="updateProfile">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 修改密码对话框 -->
  </div>
</template>

<script setup name="NavHeader" lang="ts">
import { useUserStore } from '../store/useUserStore';
import { getImage } from '../util/assetsImageUtil';
import { useResource } from '../hooks/useResource';
import { clearAll } from '../util/storageUtil';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue'; 
import { UploadUserFile } from 'element-plus';

let updateProfileForm = ref()


// 控制对话框弹窗是否可见
let updateProfileDiaVisible = ref(false)
let updateProfileFormData = reactive({
  id: "",
  username: "",
  realName: "",
  sex: "",
  avatarPath: ""
})

let updateProfileRules = reactive({
  realName: [
    {required: true, message: "请输入姓名", trigger: "blur"}
  ],
  sex: [
  {required: true, message: "请选择性别", trigger: "blur"}
  ]
})

let uploadInfo = reactive<{ fileList: UploadUserFile[] }>({
  fileList: []
})

let userStore = useUserStore()
let { toAddressable } = useResource()
let router = useRouter()

function handleCommand(command: string) {
  if("logout" === command) {
    // 退出登录
    clearAll()
    router.replace("/login")
  }else if("updateProfile" === command) {
    updateProfileDiaVisible.value = true
  }else if("updatePwd" === command) {

  }
}

// 修改个人信息对话框弹窗关闭回调
function handleUpdateProfileDiaClose() {
  updateProfileDiaVisible.value = false
}

// 提交修改个人信息
function updateProfile() {

}

function handleAvatarSuccess() {

}

function handleAvatarExceed() {
  
}


function handleAvatarRemove() {
  
}


</script>

<style scoped>
  .logo {
    height: 100%;
    max-height: 100%;
  }

  .user-info {
    text-align: right;
  }

  .avatar {
    margin-right: 5px;
  }

  .arrow {
    color: white;
    position: absolute;
    top: 14px;
  }

  .profile-container {
    position: relative;
    top: 10px;
  }
</style>