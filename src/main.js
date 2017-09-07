import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './vuex/user'
// 引入Element UI
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import Cookies from 'js-cookie'

Vue.use(VueRouter)
Vue.use(Element)

// 设置跳转前台环境
let origin = window.location.origin
if (origin.indexOf('yunwoke') > -1) {
  // 测试环境
  origin = 'http://test.yunwoke.com'
} else if (origin.indexOf('clouderwork') > -1) {
  // 线上环境
  origin = 'http://www.clouderwork.com'
} else {
  // 本地环境
  origin = 'http://localhost:8080'
}
window._SettingOrigin = origin

// 给提示添加持续时间
let saveNotify = Vue.prototype.$notify
Vue.prototype.$notify = function (opotions) {
  opotions.duration = 1500
  saveNotify.call(this, opotions)
}

// 实例化VueRouter
const router = new VueRouter({
  // mode: 'history',
  routes
})

// 验证登录
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.name === 'home') {
    next({ path: '/index/business' })
  } else {
    next()
  }
  // if (!Cookies.get('uid') && to.name !== 'login') {
  //   next({ path: '/login' })
  //   return false
  // }
})

new Vue({
  router,
  store
}).$mount('#app')
