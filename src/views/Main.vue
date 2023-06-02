<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <!-- 导航组件 -->
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Aside from '@/components/Aside.vue';
import Header from '@/components/Header.vue'
export default {
  components: {
    Aside, Header
  },
  computed: {
    ...mapState(['count'])
  }

}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  margin: 0;

}
</style>