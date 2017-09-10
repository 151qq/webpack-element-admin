<template>
  <div class="banner-b">
    <section class="banner-f">
      <div class="m-box" id="container2"></div>
    </section>
  </div>
</template>
<script>
import WindowOverlay from '../../utils/common/mapOverlay.js'

export default {
  data () {
    return {}
  },
  mounted () {
    this.$nextTick(() => {
      // map
      var map = new window.BMap.Map('container2')
      var point = new window.BMap.Point(116.409, 39.918)
      var point1 = new window.BMap.Point(116.400, 39.910)
      map.centerAndZoom(point, 15)
      // var marker = new window.BMap.Marker(point)
      // map.addOverlay(marker)
      // var marker1 = new window.BMap.Marker(point1)
      // map.addOverlay(marker1)

      var opts = {
        width: 100,
        height: 36,
        color: '#0053FF',
        template: this.createTemplate('唤云高花园小区')
      }

      var opts1 = {
        width: 100,
        height: 36,
        color: '#0053FF',
        template: this.createTemplate('唤云高花园小区')
      }

      var windowInfo = new WindowOverlay(point, opts)
      var windowInfo1 = new WindowOverlay(point1, opts1)

      map.addOverlay(windowInfo)
      map.addOverlay(windowInfo1)
    })
  },
  methods: {
    createTemplate (title) {
      var p = document.createElement('p')
      p.style.color = '#ffffff'
      p.style.lineHeight = '32px'
      p.style.height = '32px'
      p.style.fontSize = '14px'
      p.style.padding = '4px 14px'
      p.innerHTML = title
      console.log(p)
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