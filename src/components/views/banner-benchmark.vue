<template>
  <div class="banner-b">
    <section class="banner-f">
      <div class="m-box" id="container2"></div>
    </section>
  </div>
</template>
<script>
import WindowOverlay from '../../utils/common/mapOverlay.js'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      mapList: []
    }
  },
  mounted () {
    this.getDatas()
  },
  methods: {
    // 获取搜索数据
    getDatas () {
      let formData = {
        id: this.$route.params.id
      }

      Tools.getJson('searchInfoMap', formData, (res) => {
        if (res.statusCode === 0) {
          this.mapList = res.datas
          this.drawMap()
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    drawMap () {
      if (!this.mapList.length) {
        return false
      }

      var map = new window.BMap.Map('container2')

      var pointList = []

      this.mapList.forEach((item, index) => {
        var point = new window.BMap.Point(item.point.lng, item.point.lat)
        // 初始第一个point
        if (index === 0) {
          map.centerAndZoom(point, 15)
        }
        // 整理显示点，用于自动缩放
        pointList.push(point)

        var opts = {
          width: 'auto',
          height: 36,
          color: '#0053FF',
          template: this.createTemplate(item.title)
        }

        var windowInfo = new WindowOverlay(point, opts)

        map.addOverlay(windowInfo)
      })

      var view = map.getViewport(pointList)
      map.setCenter(view.center)
      map.setZoom(view.zoom)
    },
    createTemplate (title) {
      var p = document.createElement('p')
      p.style.color = '#ffffff'
      p.style.lineHeight = '32px'
      p.style.height = '32px'
      p.style.fontSize = '14px'
      p.style.padding = '4px 14px'
      p.style.whiteSpace = 'nowrap'
      p.innerHTML = title
      return p
    }
  }
}
</script>
<style lang="scss" scoped>
  .banner-b {
    .banner-f {
      width: 1160px;
      height: 370px;
      margin: auto;
      background: #ffffff;

      .m-box {
        width: 1160px;
        height: 370px;
      }
    }
  }
</style>