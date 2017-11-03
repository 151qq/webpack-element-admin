import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './vuex/store'
// 引入Element UI
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/sass/common/swiper.min.css'
import './assets/sass/main.scss'
// import Cookies from 'js-cookie'

Vue.use(VueRouter)
Vue.use(Element)

// 设置跳转前台环境
// let origin = window.location.host
// if (origin.indexOf('yunwoke') > -1) {
//   // 测试环境
//   origin = 'http://test.yunwoke.com'
// } else if (origin.indexOf('clouderwork') > -1) {
//   // 线上环境
//   origin = 'http://www.clouderwork.com'
// } else {
//   // 本地环境
//   origin = 'http://localhost:8080'
// }
// window._SettingOrigin = origin

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

const documentTitle = {
  business: '商业地产',
  house: '写字楼',
  mall: '购物中心',
  report: '我的报告',
  detail: '报告详情'
}

// 验证登录
router.beforeEach((to, from, next) => {
  // 滚动置顶
  window.scrollTo && window.scrollTo(0, 0)

  if (to.params.type) {
    document.title = documentTitle[to.params.type]
  } else {
    document.title = documentTitle[to.name] ? documentTitle[to.name] : '商房云'
  }

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

window._eventObject = new Vue()

new Vue({
  router,
  store
}).$mount('#app')
