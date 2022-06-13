<template>
  <el-container>
    <el-header>
      <div class="sys-title">租户管理系统</div>
      <div class="header-right">
        <el-link :underline="false" @click="goWeb" style="margin-right: 20px"
          >网站首页</el-link
        >
        <el-link :underline="false"></el-link>
        <el-link :underline="false" @click="exit">退出</el-link>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border: 0"
          router
        >
          <el-submenu>
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>租户管理</span>
            </template>
            <el-menu-item>租户中心</el-menu-item>
            <el-menu-item>租户员工</el-menu-item>
            <el-menu-item>租户账号</el-menu-item>
          </el-submenu>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>店铺管理</span>
            </template>
            <el-menu-item>店铺信息</el-menu-item>
            <el-menu-item>店铺活动</el-menu-item>
            <el-menu-item>员工列表</el-menu-item>
          </el-submenu>
          <el-menu-item>
            <template slot="title">
              <i class="el-icon-chat-line-square"></i>
              <span>物业费用</span>
            </template>
          </el-menu-item>
          <el-menu-item>
            <template slot="title">
              <i class="el-icon-magic-stick"></i>
              <span>系统设置</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    exit() {
      //退出系统
      localStorage.clear()
      this.$router.push({
        path: '/login'
      })
    },
    goWeb() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sys-title {
  font-size: 18px;
  font-weight: bold;
}
.el-header .el-link {
  color: #ccc;
  margin: 0px 10px;
}
.el-header .el-link:hover {
  color: #fff;
}
.el-aside {
  background-color: #545c64;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* 修改滚动条样式 */
.el-aside::-webkit-scrollbar {
  width: 3px;
}
/* 滚动条样式 */
.el-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 208, 75, 0.2);
  background: rgba(255, 208, 75, 0.8);
}
/* 滚动条背景 */
.el-aside::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(84, 92, 100, 0.2);
  border-radius: 0;
  background: rgba(84, 92, 100, 0.1);
}

.el-main {
  height: 100%;
}

.el-container {
  height: 100%;
}

.header-right {
  display: flex;
  align-items: center;
}
</style>
