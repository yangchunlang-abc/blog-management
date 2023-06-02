import Vue from "vue";
import Vuex from 'vuex'
// 其他的vuex模块
import tab from './tab'
import userManagement from "./userManagement";
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tab,
    userManagement
  }
})