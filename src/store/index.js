import Vue from "vue";
import Vuex from 'vuex'
// 其他的vuex模块
import tab from './tab'
import user from "./user";
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tab,
    user
  }
})