<template>
  <a-layout>
    <a-layout-sider>
      <div class="logo">
        <img style="padding: 3px;width: 25%;" src="../assets/logo.png">
        <img src="../assets/logo_name.png">
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys">
        <a-menu-item key="analysis">
          <router-link to="/analysis">
            <a-icon type="bar-chart" :style="iconStyle" />数据分析
          </router-link>
        </a-menu-item>
        <a-menu-item key="task">
          <router-link to="/task">
            <a-icon type="file-text" :style="iconStyle" />任务管理
          </router-link>
        </a-menu-item>
        <a-menu-item key="notification">
          <router-link to="/notification">
            <a-icon type="notification" :style="iconStyle" />消息通知
          </router-link>
        </a-menu-item>
        <a-menu-item key="user">
          <router-link to="/user">
            <a-icon type="user" :style="iconStyle" />账号管理
          </router-link>
        </a-menu-item>
        <a-menu-item key="robot">
          <router-link to="/robot">
            <a-icon type="robot" :style="iconStyle" />机&nbsp;&nbsp;器&nbsp;&nbsp;人
          </router-link>
        </a-menu-item>
        <a-menu-item key="department">
          <router-link to="/department">
            <a-icon type="home" :style="iconStyle" />科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室
          </router-link>
        </a-menu-item>
        <a-menu-item key="parkpoint">
          <router-link to="/parkpoint">
            <a-icon type="compass" :style="iconStyle" />停&nbsp;&nbsp;泊&nbsp;&nbsp;点
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <div class="header">
        <a-breadcrumb>
          <a-breadcrumb-item style="fontSize: 1.2rem;"
          v-for="(item, index) in $route.meta.breadcrumb" 
          :key="index"
          >
            {{item}}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <span class="username">
          <a-icon type="user" style="fontSize: 1.3rem;margin-right: 5px;" />{{ username }}
          |<a-icon class="logout-btn" type="logout" @click="handleLogout"/>
        </span>
      </div>
      <div class="main">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { logout } from '../api/user'
export default {
  data() {
    return {
      iconStyle: {
        fontSize: '1.3rem'
      },
      defaultSelectedKeys: [this.$route.path.split('/')[1]],
      username: '管理员'
    }
  },
  
  methods: {
   handleLogout() {
    logout().then(res => {
      this.$message.success(res.msg)
      this.$router.push({ path: '/' })
    })
   }
  }
}
</script>

<style lang="less">
@import url('../styles/index.less');
</style>
