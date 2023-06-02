<template>
  <div>
    <!-- 这里放main的 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  //页面刷新会丢失vuex的数据
  // 下面将数据放到sessionStorage里
  created() {
    // 页面加载时读取session 数据
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 页面刷新将vuex信息存到session里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>