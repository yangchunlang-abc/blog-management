import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import User from '../views/UserManage.vue'
import Article from '../views/ArticleManage.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

//解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) { return originalPush.call(this, location).catch(err => err) }
//
Vue.use(VueRouter)
// 创建vuerouter实例
const router = new VueRouter({
  routes: [
    {
      path: '/', component: Main, redirect: '/login',//开始登录
      children: [
        { path: 'home', component: Home },
        { path: 'user', component: User, meta: { noBack: true } },
        { path: 'article', component: Article },
        { path: 'page1', component: PageOne },
        { path: 'page2', component: PageTwo },
      ]
    },
    { path: '/login', component: Login }
  ]
})
//配置陆游守卫
router.beforeEach((to, from, next) => {
  if (from.meta.noBack) {
    // 如果当前路由不能后退，则阻止跳转
    history.pushState(null, null, location.href)
  }
  next()
})
// 导出实例
export default router