<template>
  <div class="banner-box">
    <img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
      <div class="left">
        <ul>
          <li>
            <span>购入资本化率：</span>
            <el-input-number v-model="rates.buy" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>退出资本化率：</span>
            <el-input-number v-model="rates.quit" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>办公租金增长率 (y1-y3)：</span>
            <el-input-number v-model="rates.rentO" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>办公租金增长率 (y4-y10)：</span>
            <el-input-number v-model="rates.rentT" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>工业租金增长率 (y1-y10)：</span>
            <el-input-number v-model="rates.rentE" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>营业税率：</span>
            <el-input-number v-model="rates.business" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>房产税率：</span>
            <el-input-number v-model="rates.house" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>企业所得税率：</span>
            <el-input-number v-model="rates.company" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>物业费率：</span>
            <el-input-number v-model="rates.property" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
          <li>
            <span>净收入率（净收入/租金）：</span>
            <el-input-number v-model="rates.own" @change="computPrice" size="small" :min="0" :max="100"></el-input-number>
            <p>%</p>
          </li>
        </ul>
      </div>
      <div class="right">
        <echarts-tar :id-name="'echar3'" :echarts-date="echartsDate"></echarts-tar>
      </div>
    </section>
  </div>
</template>
<script>
import echartsTar from '../common/echart-tar.vue'
import Tools from '../../utils/tools.js'

export default {
  props: ['rates', 'price'],
  data () {
    return {
      echartsDate: {},
      pageInfo: {}
    }
  },
  mounted () {
    this.setData()
    this.getEcharts()
    this.computPrice()
  },
  methods: {
    setData () {
      this.pageInfo = this.$store.getters.getPageInfo
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
    },
    computPrice () {
      var result = 0
      for (var key in this.rates) {
        if (this.rates[key] !== '') {
          result += Number(this.rates[key])
        }
      }
      this.price.value = result
    }
  },
  components: {
    echartsTar
  }
}
</script>
<style lang="scss">
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

        ul {
          padding: 0 27px;
          margin: 27px 0;
          border-right: 1px solid #EFF2F7;

          li {
            height: 22px;
            margin-bottom: 10px;

            &>span {
              float: left;
              width: 173px;
              font-size: 14px;
              color: #1F2D3D;
              line-height: 22px;
            }

            .el-input-number {
              position: relative;
              float: right;
              width: 124px;
              height: 22px;
            }

            .el-input-number--small {

              .el-input-number__decrease {
                right: 22px;
              }
              
              span {
                line-height: 22px;
                width: 22px;
                font-size: 12px;
                top: 0;
              }

              .el-input--small {
                font-size: 12px;

                input {
                  padding-right: 62px;
                  height: 22px;
                  background: transparent;
                  text-align: right;
                }
              }
            }

            p {
              float: right;
              width: 16px;
              height: 22px;
              font-size: 12px;
              line-height: 22px;
              color: #5E6D82;
              box-sizing: border-box;
              text-align: right;
              margin-right: -76px;
            }
          }
        }
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