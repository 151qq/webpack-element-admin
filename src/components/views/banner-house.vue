<template>
  <div class="banner-box">
  	<img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
      <div class="left">
        <echarts-tar :id-name="'echar1'" :echarts-date="echartsDate" :is-change="true"></echarts-tar>
      </div>
      <div class="right">
        <p>楼盘租金排名</p>
        <ul>
          <li v-for="item in listDatas">
            <span class="l1">{{item.title}}</span>
            <span class="l2">{{item.price}}</span>
            <span class="l3">㎡ / 天</span>
            <span :class="item.status ? 'l4 up-i' : 'l4 down-i'"></span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import echartsTar from '../common/echart-tar.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      listDatas: [],
      pageInfo: {},
      echartsDate: {}
    }
  },
  created () {
    this.setData()
    window._eventObject.$on('cityChange', this.getData)
  },
  watch: {
    $route (to, from) {
      this.setData()
      this.getData()
    }
  },
  methods: {
    getData () {
      this.getEcharts()
      this.getDatas()
    },
    setData () {
      this.pageInfo = this.$store.getters.getPageInfo
    },
    // 获取资金排名数据
    getDatas () {
      Tools.getJson('rents', this.pageInfo, (res) => {
        if (res.statusCode === 0) {
          this.listDatas = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    // 获取echarts数据
    getEcharts () {
      Tools.getJson('echarts', this.pageInfo, (res) => {
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
        width: 800px;
        height: 390px;
        padding: 27px;
        box-sizing: border-box;
      }

      .right {
        float: right;
        width: 360px;
        box-sizing: border-box;
        border-left: 1px solid #EFF2F7;
        padding-right: 27px;
        padding-left: 15px;
        margin: 27px 0;

        p {
          font-size: 16px;
          color: #000000;
          margin-bottom: 10px;
          font-weight: bold;
        }

        ul {
          li {
            height: 29px;
            border-bottom: 1px solid #EFF2F7;

            &:last-child {
              border: none;
            }

            span {
              float: left;
              font-size: 12px;
              color: #475669;
              line-height: 29px;
            }

            .l1 {
              width: 193px;
            }

            .l2 {
              width: 60px;
              text-align: right;
              color: #5E6D82;
            }

            .l3 {
              width: 40px;
              font-size: 10px;
              color: #8492A6;
              text-align: right;
            }

            .l4 {
              width: 14px;
              height: 29px;
              margin-left: 10px;
            }

            .up-i {
              background: url(../../assets/images/top-icon.png) center no-repeat;
            }

            .down-i {
              background: url(../../assets/images/down-icon.png) center no-repeat;
            }
          }
        }
      }
    }
  }
</style>