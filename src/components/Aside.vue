<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64">
      <h3 class="title">{{ isCollapse ? '文章' : '文章管理系统' }}</h3>
      <el-menu-item :index="item.url + ''" v-for="item in noChilrend" :key="item.url" @click="changeUrl(item)">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu :index="item.url + ''" v-for="item in hasChilrend" :key="item.url">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <span slot="title">其他页面</span>
          <el-menu-item :index="i.url + ''" v-for="i in item.children" :key="i.url" @click="changeUrl(i)">{{ i.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: '/home'
        },
        {
          path: '/article',
          name: 'article',
          label: '文章管理',
          icon: 'edit',
          url: '/article'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: '/user'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'pageone',
              label: '页面1',
              icon: 'setting',
              url: '/page1'
            },
            {
              path: '/page2',
              name: 'pagetwo',
              label: '页面2',
              icon: 'setting',
              url: '/page2'
            }
          ]
        }

      ]
    }
  },
  methods: {
    ...mapMutations('tab', ['addMenu']),
    changeUrl(item) {
      // 如果已经在本页面就不跳转 && !(this.$route.path === '/home' && (item.path === '/'))
      if (this.$route.path != item.url) {
        // 页面跳转到拿到的url
        this.$router.push(item.url)
      }
      // 点击了导航栏就把数据添加到面包屑里
      this.addMenu(item)
    }
  }
  ,
  computed: {
    ...mapState({
      isCollapse: (state) => state.tab.isCollapse
    }),
    noChilrend() {
      // filter筛选出没有children的数组
      return this.menuData.filter(item => !item.children)
    },
    hasChilrend() {
      // filter筛选出有children的数组
      return this.menuData.filter(item => item.children)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100vh;
  border: 0;

  .el-menu-item {
    font-size: 20px;
    color: #fff;
  }

  /deep/.el-submenu__title {
    font-size: 20px;
    color: #fff;
  }
}

.title {
  padding: 20px 0;
  color: #fff;
  font-size: 25px;
  text-align: center;
  white-space: nowrap;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>