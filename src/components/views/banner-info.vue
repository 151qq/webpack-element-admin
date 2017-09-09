<template>
  <div class="banner-box">
    <img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
      <div class="left" id="container1"></div>
      <div class="right">
        <echarts-tar :id-name="'echar2'" :echarts-date="echartsDate"></echarts-tar>
      </div>
    </section>
  </div>
</template>
<script>
import echartsTar from '../common/echart-tar.vue'
import WindowOverlay from '../../utils/common/mapOverlay.js'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      echartsDate: {},
      pageInfo: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      // map
      var map = new window.BMap.Map('container1')
      var point = new window.BMap.Point(116.409, 39.918)
      map.centerAndZoom(point, 15)
      // var marker = new window.BMap.Marker(point)
      // map.addOverlay(marker)

      var opts = {
        width: 100,
        height: 36,
        color: '#0053FF',
        template: this.createTemplate('唤云高花园小区')
      }

      var windowInfo = new WindowOverlay(point, opts)

      map.addOverlay(windowInfo)
    })
  },
  created () {
    this.setData()
    this.getEcharts()
  },
  methods: {
    setData () {
      this.pageInfo = this.$store.getters.getPageInfo
    },
    createTemplate (title) {
      var p = document.createElement('p')
      p.style.color = '#ffffff'
      p.style.lineHeight = '32px'
      p.style.height = '32px'
      p.style.fontSize = '14px'
      p.style.padding = '4px 14px'
      p.innerHTML = title
      return p
    },
    // 获取echarts数据
    getEcharts () {
      var formData = {
        type: this.$route.params.type,
        city: this.pageInfo.city,
        id: this.$route.params.id
      }
      Tools.getJson('echarts', formData, (res) => {
        if (res.statusCode === 0) {
          this.echartsDate = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  },
  components: {
    echartsTar
  }
}
</script>
<style lang="scss" scoped>
  .banner-box {
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

      .left {
        float: left;
        width: 360px;
        height: 370px;
      }

      .right {
        float: right;
        width: 800px;
        height: 390px;
        padding: 27px;
        box-sizing: border-box;
      }
    }
  }
</style>