import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import User from '../views/UserManage.vue'
import Article from '../views/ArticleManage.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)
// 创建vuerouter实例
const router = new VueRouter({
  routes: [
    {
      path: '/', component: Main, redirect: '/home',
      children: [
        { path: 'home', component: Home },
        { path: 'user', component: User },
        { path: 'article', component: Article },
        { path: 'page1', component: PageOne },
        { path: 'page2', component: PageTwo },
      ]
    },
    { path: '/login', component: Login }
  ]
})
// 导出实例
export default router