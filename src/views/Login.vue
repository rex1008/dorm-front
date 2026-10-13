<template>
  <div class="login">
    <el-row justify="center" align="middle" style="height: 100vh;">
      <el-col :span="5">
        <div class="image-wrapper">
          <el-image :src="getImage('login_bg.png')"></el-image>
        </div>
        <el-form :model="formData" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" label-width="80px" prpp="username">
            <el-input v-model="formData.username" type="text" placeholder="请输入用户名" clearable>
              <template v-slot:prepend><el-button :icon="UserFilled"></el-button></template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px" prpp="pwd">
            <el-input v-model="formData.pwd" type="password" placeholder="请输入密码" show-password clearable>
              <template v-slot:prepend><el-button :icon="Lock"></el-button></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <el-button type="success" @click="submitForm">
                登录
              </el-button>
              <el-button type="primary" @click="resetForm">
                重置
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Login" lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getImage } from '../util/assetsImageUtil';
import { reactive, ref } from 'vue';
import { Lock, UserFilled } from '@element-plus/icons-vue';
import { loginApi } from '../api/managerApi';
import { useUserStore } from '../store/useUserStore';
import { saveItem } from '../util/storageUtil';
import { STORAGE_USER_TOKEN_KEY } from '../config/constants';

let router = useRouter()
let userStore = useUserStore()
let formData = reactive({
  username: "",
  pwd: ""
})

let loginForm = ref()

let rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  pwd: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ]
})

function submitForm() {
  loginForm.value.validate((valid: boolean) => {
    if(valid) {
      loginApi(formData).then(result => {
        // token中的payload部分的格式为：{"TokenDTO": "{\"id\":1, \"username\":\"zhangsan\", \"avatarPath\":\"resoures/20261010/xxxxxx.jpg\"}", "exp":1712345678}
        let token = result.data
        let userInfo = extractUserInfoFromToken(token)
        userStore.storeUserInfo(userInfo)

        // 保存token到sessionStorage中
        saveItem(STORAGE_USER_TOKEN_KEY, token)
        router.replace("/")
      })
    }
  })
}

function extractUserInfoFromToken(token: string) {
  let payloadStr = atob(token.split(".")[1])
  let payloadObj = JSON.parse(payloadStr)
  return JSON.parse(payloadObj["TokenDTO"])
}

function resetForm() {
  loginForm.value.resetFields()
}
</script>

<style scoped>
.image-wrapper {
  text-align: center;
  width: 100%;
}

.btn-group {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
</style>