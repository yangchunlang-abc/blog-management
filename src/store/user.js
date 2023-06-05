export default {
  namespaced: true,
  state: {
    // 用户列表数据
    tableData: [{
      date: '',
      username: '',
      gender: '',
      password: '',
      headImgUrl: ''
    }]
  },
  mutations: {
    // 添加用户数据
    regUser(state, newArr) {
      state.tableData = newArr
      console.log(state.tableData);
    }
  },

}