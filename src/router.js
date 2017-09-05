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
        path: 'index/:type',
        name: 'index',
        component (resolve) {
          require.ensure(['./views/property/house.vue'], () => {
            resolve(require('./views/property/house.vue'))
          })
        }
      }, {
        // 地图检索
        path: 'map',
        name: 'map',
        component (resolve) {
          require.ensure(['./views/property/map.vue'], () => {
            resolve(require('./views/property/map.vue'))
          })
        }
      }, {
        // 楼盘信息
        path: 'info/:id',
        name: 'info',
        component (resolve) {
          require.ensure(['./views/property/info.vue'], () => {
            resolve(require('./views/property/info.vue'))
          })
        }
      }, {
        // 评估楼价
        path: 'evaluate',
        name: 'evaluate',
        component (resolve) {
          require.ensure(['./views/property/evaluate.vue'], () => {
            resolve(require('./views/property/evaluate.vue'))
          })
        }
      }, {
        // 对标楼盘
        path: 'benchmark',
        name: 'benchmark',
        component (resolve) {
          require.ensure(['./views/property/benchmark.vue'], () => {
            resolve(require('./views/property/benchmark.vue'))
          })
        }
      }, {
        // 我的报告
        path: 'report',
        name: 'report',
        component (resolve) {
          require.ensure(['./views/report/report.vue'], () => {
            resolve(require('./views/report/report.vue'))
          })
        }
      }, {
        // 我的报告
        path: 'detail',
        name: 'detail',
        component (resolve) {
          require.ensure(['./views/report/report-detail.vue'], () => {
            resolve(require('./views/report/report-detail.vue'))
          })
        }
      }, {
        // 我的消息
        path: 'notice',
        name: 'notice',
        component (resolve) {
          require.ensure(['./views/notice/notice-detail.vue'], () => {
            resolve(require('./views/notice/notice-detail.vue'))
          })
        }
      }
    ]
  }
]

export default routers
