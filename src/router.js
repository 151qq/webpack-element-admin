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
        path: 'index/:type/map',
        name: 'map',
        component (resolve) {
          require.ensure(['./views/property/map.vue'], () => {
            resolve(require('./views/property/map.vue'))
          })
        }
      }, {
        // 楼盘信息
        path: 'index/:type/info/:id',
        name: 'info',
        component (resolve) {
          require.ensure(['./views/property/info.vue'], () => {
            resolve(require('./views/property/info.vue'))
          })
        }
      }, {
        // 评估楼价
        path: 'index/:type/evaluate/:id',
        name: 'evaluate',
        component (resolve) {
          require.ensure(['./views/property/evaluate.vue'], () => {
            resolve(require('./views/property/evaluate.vue'))
          })
        }
      }, {
        // 对标楼盘
        path: 'index/:type/benchmark/:id',
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
        path: 'report/detail/:id',
        name: 'detail',
        component (resolve) {
          require.ensure(['./views/report/report-detail.vue'], () => {
            resolve(require('./views/report/report-detail.vue'))
          })
        }
      }, {
        // 我的消息
        path: 'notice/:id',
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
