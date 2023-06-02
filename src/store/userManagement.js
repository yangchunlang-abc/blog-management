export default {
  namespaced: true,
  state: {
    // 用户列表数据
    tableData: [{
      date: '2016-05-02',
      name: '王小虎',
      gender: '男',
      password: 200333
    }]
  },
  mutations: {
    // 添加用户数据
    addUser(state, newArr) {
      state.tableData = [...state.tableData, ...newArr]
      console.log(state.tableData);
    }
  }
}