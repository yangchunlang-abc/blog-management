export default {
  namespaced: true,
  state: {
    isCollapse: false,// 控制导航栏
    avatarSrc: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',//头像资源
    // 面包屑数据
    breadTabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: '/home'
      }],
  },
  mutations: {
    //控制导航栏
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    // 面包屑数据处理
    addMenu(state, item) {
      //没有重复数据 findIndex返回-1
      const index = state.breadTabList.findIndex(i => i.name === item.name)
      if (index === -1) state.breadTabList.push(item)
    }
  }

}