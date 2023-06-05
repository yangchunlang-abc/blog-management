<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header">
    <div class="header-left">
      <div class="btn"><el-button icon="el-icon-menu" circle @click="isCollapse"></el-button></div>
      <!-- 导航标签-面包屑 -->
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: tab.url }" v-for="tab in breadTabList" :key="tab.url">{{ tab.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div>
      <el-dropdown>
        <el-avatar shape="square" src=""></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid" @click.native="login">登录</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete-solid">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      userList: (state) => state.user.tableData,//用户数据
      breadTabList: (state) => state.tab.breadTabList//面包屑
    })
  },
  methods: {
    // 点击展开收缩导航栏
    isCollapse() {
      this.$store.commit("tab/changeCollapse")
    },
    // 点击登录 
    //1.判断是否已经登录
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.header {
  background-color: #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  line-height: 70px;

  // 面包屑区域
  .header-left {
    display: flex;
    flex-direction: row;
    align-items: center;

    .btn {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    // 改变面包屑颜色
    .breadCrumb {

      .el-breadcrumb__inner a,
      .el-breadcrumb__inner.is-link {
        color: #666;
      }
    }
  }

  // 下拉登录退出
  .el-dropdown {
    font-size: 50px;
    padding: 0 20px;
  }
}
</style>