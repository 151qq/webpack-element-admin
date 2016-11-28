const routers = [
  {
    path: '/',
    name: 'home',
    component (resolve) {
      require.ensure(['./views/main.vue'], () => {
        resolve(require('./views/main.vue'))
      })
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'index',
        component (resolve) {
          require.ensure(['./views/member/manager.vue'], () => {
            resolve(require('./views/member/manager.vue'))
          })
        }
      }, {
        // 会员详情
        path: 'member/detail/:id',
        name: 'member-detail',
        component (resolve) {
          require.ensure(['./views/member/detail.vue'], () => {
            resolve(require('./views/member/detail.vue'))
          })
        }
      }, {
        // 内容管理-分类管理
        path: 'content/category',
        name: 'category',
        component (resolve) {
          require.ensure(['./views/content/category.vue'], () => {
            resolve(require('./views/content/category.vue'))
          })
        }
      }, {
        // 内容管理-话题管理
        path: 'content/topic',
        name: 'topic',
        component (resolve) {
          require.ensure(['./views/content/topic.vue'], () => {
            resolve(require('./views/content/topic.vue'))
          })
        }
      }, {
        // 内容管理-问答管理
        path: 'content/question',
        name: 'question',
        component (resolve) {
          require.ensure(['./views/content/question.vue'], () => {
            resolve(require('./views/content/question.vue'))
          })
        }
      }, {
        // 数据灌入--列表
        path: 'article/list',
        name: 'article-list',
        component (resolve) {
          require.ensure(['./views/article/list.vue'], () => {
            resolve(require('./views/article/list.vue'))
          })
        }
      }, {
        // 数据灌入--详情
        path: 'article/list/:id',
        name: 'article-detail',
        component (resolve) {
          require.ensure(['./views/article/content-edit.vue'], () => {
            resolve(require('./views/article/content-edit.vue'))
          })
        }
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component (resolve) {
      require.ensure(['./views/login.vue'], () => {
        resolve(require('./views/login.vue'))
      })
    }
  }
]

export default routers
