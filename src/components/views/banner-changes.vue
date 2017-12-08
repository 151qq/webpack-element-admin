<template>
  <div class="banner-changes">
    <img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
      <div class="m-box" id="container-changes"></div>
    </section>
  </div>
</template>
<script>
import WindowOverlay from '../../utils/common/mapOverlay.js'
import Tools from '../../utils/tools.js'

export default {
  props: ['point', 'houseName'],
  data () {
    return {}
  },
  mounted () {
    this.drawMap()
  },
  watch: {
    point () {
      this.drawMap()
    }
  },
  methods: {
    drawMap () {
      if (!this.point) {
        return false
      }

      var map = new window.BMap.Map('container-changes')
      var pointArr = this.point.split(',')
      var point = new window.BMap.Point(pointArr[1], pointArr[0])
      map.centerAndZoom(point, 15)
      var opts = {
        width: 'auto',
        height: 36,
        color: '#0053FF',
        template: this.createTemplate(this.houseName)
      }

      var windowInfo = new WindowOverlay(point, opts)

      map.addOverlay(windowInfo)
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
  .banner-changes {
    position: relative;
    width: 100%;
    height: 450px;

    .img-box {
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -50%;
      display: block;
      width: 1440px;
      height: 450px;
    }
    .banner-f {
      position: absolute;
      width: 1160px;
      height: 370px;
      left: 50%;
      top: 50%;
      margin: -185px 0 0 -580px;
      overflow: hidden;
      background: #ffffff;

      .m-box {
        width: 1160px;
        height: 370px;
      }
    }
  }
</style>