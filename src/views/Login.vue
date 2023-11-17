<template>
  <div class="login">
    <img class="bg" src="../assets/bg.png">
    <div class="login-card">
      <img class="logo" src="../assets/logo.png">
      <span class="sys-title">医院物流机器人</span>
      <span class="login-title">欢迎使用医院物流机器人管理系统</span>
      <a-form-model
      class="login-form"
      ref="loginForm"
      :rules="rules"
      hideRequiredMark="true"
      :model="loginForm"
      :label-col="{span: 24}"
      :wrapper-col="{span: 24}"
      >
        <a-form-model-item label="用户名" prop="username">
          <a-input size="large" allow-clear v-model="loginForm.username" placeholder="请输入用户名"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input-password size="large" allow-clear v-model="loginForm.password" placeholder="请输入密码"></a-input-password>
        </a-form-model-item>
        <a-button size="large" type="primary" @click="handleLogin">登录</a-button>
      </a-form-model>
      <span class="tips">忘记密码请联系管理员</span>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名是必填项', trigger: 'change'}],
        password: [{ required: true, message: '密码是必填项', trigger: 'change'}]
      }
    }
  },

  methods: {
    // 重置表单
    resetForm() {
      if (this.$refs.loginForm) {
        this.$refs.loginForm.resetFields()
        this.loginForm.username = ''
        this.loginForm.password = ''
      }
    },

    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          await login(this.loginForm).then(res => {
            this.$message.success(res.msg)
            this.resetForm()
            this.$router.push({ path: '/index' })
          }).catch((e) => {
            console.log(e)
          })
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url('../styles/login.less');
</style>
