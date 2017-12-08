<template>
  <section class="bench-con">

    <div class="nav-o marg-auto">
      <router-link class="nav-z" :to="{name: 'index', params: {type: type}}">{{navO[type]}}</router-link>
      <span class="nav-z"> / </span>
      <router-link class="nav-z" :to="{name: 'info', params: {type: type, id: id.split(',')[0]}}">楼盘评述</router-link>
      <span class="nav-z"> / </span>
      对标详情
    </div>

    <banner-benchmark :benchs="benchDatas" ref="bannerBench"></banner-benchmark>

    <div class="mid-box">
      <div v-for="(item, index) in benchDatas" class="left">
        <ul class="table">
          <li class="row even">
            <span>楼盘名字：</span>
            <span>{{item.base.name}}</span>
          </li>
          <li class="row old">
            <span>所在城市：</span>
            <span>{{item.base.city}}</span>
          </li>
          <li class="row even">
            <span>所属商圈：</span>
            <span>{{item.base.mall}}</span>
          </li>
          <li class="row old">
            <span>星标：</span>
            <span>{{item.base.star == '0' ? '否' : '是'}}</span>
          </li>
          <li class="row even">
            <span>楼盘等级：</span>
            <span>{{item.base.level}}</span>
          </li>
          <li class="row old">
            <span>楼盘地址：</span>
            <span>{{item.base.address}}</span>
          </li>
          <li class="row even">
            <span>剩余年限：</span>
            <span>{{item.base.year}}</span>
          </li>
          <li class="row old">
            <span>容积率：</span>
            <span>{{item.base.ratio}}</span>
          </li>
          <li class="row old">
            <span>网站地址：</span>
            <span>
              <a class="base-content"
                      target="_blank" 
                      :href="item.base.webSite.indexOf('http') > 0 ? item.base.webSite : 'http://' + item.base.webSite">
                  {{item.base.webSite}}
              </a>
            </span>
          </li>
          <li class="row old">
            <span>物业信息：</span>
            <span>{{item.base.property}}</span>
          </li>
          <li class="row old">
            <span>物业持有：</span>
            <span>{{item.base.holding}}</span>
          </li>
          <li class="row old">
            <span>楼盘类型：</span>
            <span>{{item.base.type}}</span>
          </li>
          <li class="row even">
            <span>所属地块：</span>
            <span>{{item.base.massif}}</span>
          </li>
          <li class="row old">
            <span>面积(m²)：</span>
            <span>{{item.base.area}}</span>
          </li>
          <li class="row even">
            <span>总层数：</span>
            <span>{{item.base.plies}}</span>
          </li>
          <li class="row old">
            <span>层高(m)：</span>
            <span>{{item.base.height}}</span>
          </li>
          <li class="row old">
            <span>车位：</span>
            <span>{{item.base.park}}</span>
          </li>
          <li class="row even">
            <span>电梯数：</span>
            <span>{{item.base.elevator}}</span>
          </li>
          <li class="row even">
            <span>空调数：</span>
            <span>{{item.base.conditioner}}</span>
          </li>
          <li class="row old">
            <span>地板类型：</span>
            <span>{{item.base.floor}}</span>
          </li>
        </ul>
      </div>
      <div class="eq-height">
        <section class="j-y j-b j-l">
          <span>业主信息：</span>
          <p>{{benchDatas.length ? benchDatas[0].base.owner : ''}}</p>
        </section>

        <section class="j-y j-b j-r">
          <span>业主信息：</span>
          <p>{{benchDatas.length ? benchDatas[1].base.owner : ''}}</p>
        </section>
      </div>
      <div class="eq-height">
        <section class="j-y j-l">
          <span>现在租户：</span>
          <p>{{benchDatas.length ? benchDatas[0].base.rent : ''}}</p>
        </section>

        <section class="j-y j-r">
          <span>现在租户：</span>
          <p>{{benchDatas.length ? benchDatas[1].base.rent : ''}}</p>
        </section>
      </div>
      <div class="eq-height">
        <section class="j-y j-b j-l">
          <span>交通：</span>
          <p>{{benchDatas.length ? benchDatas[0].base.traffic : ''}}</p>
        </section>

        <section class="j-y j-b j-r">
          <span>交通：</span>
          <p>{{benchDatas.length ? benchDatas[1].base.traffic : ''}}</p>
        </section>
      </div>
      <div class="eq-height">
        <section class="j-y j-l">
          <span>交易记录：</span>
          <p>{{recordOne}}</p>
        </section>

        <section class="j-y j-r">
          <span>交易记录：</span>
          <p>{{recordTwo}}</p>
        </section>
      </div>
      <div class="left">
        <section class="echart-box">
          <echarts-ver :id-name="'echartsOne'" :echarts-date="echartsOne" :ref="'echartsOne'"></echarts-ver>
        </section>       
      </div>
      <div class="left">
        <section class="echart-box">
          <echarts-ver :id-name="'echartsTwo'" :echarts-date="echartsTwo" :ref="'echartsTwo'"></echarts-ver>
        </section>
      </div>
      <div class="left j-gray">
        <section class="echart-box">
          <echarts-ver :id-name="'echartsOneBar'" :echarts-date="echartsOneBar" :ref="'echartsOneBar'"></echarts-ver>
        </section>       
      </div>
      <div class="left j-gray">
        <section class="echart-box">
          <echarts-ver :id-name="'echartsTwoBar'" :echarts-date="echartsTwoBar" :ref="'echartsTwoBar'"></echarts-ver>
        </section>
      </div>
      <div class="left">
        <section class="echart-box">
          <echarts-ver :id-name="'echartsOneVer'" :echarts-date="echartsOneVer" :ref="'echartsOneVer'"></echarts-ver>
        </section>       
      </div>
      <div class="left">
        <section class="echart-box">
          <echarts-ver :id-name="'echartsTwoVer'" :echarts-date="echartsTwoVer" :ref="'echartsTwoVer'"></echarts-ver>
        </section>
      </div>
    </div>
    <show-ewm :dialog-visible="dialogVisible" :path="imgPath"></show-ewm>
  </section>
</template>
<script>
import bannerBenchmark from '../../components/views/banner-benchmark.vue'
import echartsVer from '../../components/common/echart-ver.vue'
import showEwm from '../../components/common/show-ewm.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      dialogVisible: {
        value: false
      },
      imgPath: '',
      benchDatas: [],
      type: '',
      id: '',
      navO: {
        business: '商业地产',
        mall: '购物中心',
        house: '写字楼'
      },
      authorOne: {},
      authorTwo: {},
      recordOne: '',
      recordTwo: '',
      echartsOne: {},
      echartsTwo: {},
      echartsOneBar: {},
      echartsTwoBar: {},
      echartsOneVer: {},
      echartsTwoVer: {}
    }
  },
  created () {
    document.title = '对标详情'
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    this.getDatas()
  },
  methods: {
    showEWM (path) {
      this.imgPath = path
      this.dialogVisible.value = true
    },
    getDatas () {
      let formData = {
        type: this.$route.params.type,
        id: this.$route.params.id
      }

      Tools.getJson('benchList', formData, (res) => {
        if (res.success == '1') {
          this.benchDatas = res.result
          setTimeout(() => {
            this.$refs.bannerBench.drawMap()

            this.getRecord(this.benchDatas[0].id, 'recordOne')
            this.getRecord(this.benchDatas[1].id, 'recordTwo')

            this.getEcharts(this.benchDatas[0].id, 'echartsOne')
            this.getEcharts(this.benchDatas[1].id, 'echartsTwo')

          }, 0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getRecord (id, key) {
      var formData = {
        id: id
      }
      Tools.getJson('record', formData, (res) => {
        if (res.success == '1') {
          var recordArr = []
          if (!res.result.changes.length) {
            this[key] = ''
            return false
          }
          res.result.changes.forEach((item, index) => {
            recordArr.push(item.houseTradeDate.split(' ')[0] + ' ' + item.houseTradeACode + ' -> ' + item.houseTradeBCode + ' （' + item.houseRradePrice + '万元）')
          })
          this[key] = recordArr.join('，')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取echarts数据
    getEcharts (id, key) {
      var formData = {
        city: localStorage.getItem('cityCode'),
        id: id
      }
      Tools.getJson('echarts', formData, (res) => {
        if (res.success === '1') {
          var objOne = {
            legend: ['租金'],
            seriesBar: res.result.seriesBar,
            xAxis: res.result.xAxis
          }

          var objTwo = {
            legend: ['空置率'],
            seriesBar: res.result.seriesLine,
            xAxis: res.result.xAxis
          }

          var objThree = {
            legend: ['估值'],
            seriesBar: res.result.capRateBar,
            xAxis: res.result.capRateYear
          }

          

          this[key] = objOne
          this[key + 'Bar'] = objTwo
          this[key + 'Ver'] = objThree
          setTimeout(() => {
            this.$refs[key].setEcharts()
            this.$refs[key + 'Bar'].setEcharts()
            this.$refs[key + 'Ver'].setEcharts()
          }, 0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取echarts数据
    getValueEcharts (id, key) {
      var formData = {
        city: localStorage.getItem('cityCode'),
        id: id
      }
      Tools.getJson('valueEcharts', formData, (res) => {
        if (res.success === '1') {
          this[key] = res.result
          setTimeout(() => {
            this.$refs[key].setEcharts()
          }, 0)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  components: {
    bannerBenchmark,
    echartsVer,
    showEwm
  }
}
</script>
<style lang="scss" scoped>
.bench-con {
  .echar-box {
    height: 270px;
  }

  .j-gray {
    background: #F9FAFC;
  }

  .marg-auto {
    width: 1160px;
    margin: auto;
  }

  .mid-box {
    width: 1162px;
    margin: 20px auto;
    box-sizing: border-box;
    border: 1px solid #E0E6ED;
    border-right: none;
    border-bottom: none;
    overflow: hidden;

    .left {
      float: left;
      width: 580px;

      .table {
        .row {
          height: 40px;
          background: #ffffff;
          line-height: 40px;
          overflow: hidden;

          span {
            float: left;
            width: 174px;
            height: 40px;
            font-size: 14px;
            color: #666666;
            box-sizing: border-box;
            padding-left: 20px;
            border-right: 1px solid #E0E6ED;
            border-bottom: 1px solid #E0E6ED;
          }

          & span:last-child {
            width: 406px;
            color: #000000;
          }
        }

        .title {
          height: 44px;
          line-height: 44px;
          background: #E5E9F2;
        }

        .even {
          background: #F9FAFC;
        }
      }
      .echart-box {
        width: 580px;
        padding: 20px;
        height: 280px;
        overflow: hidden;
        box-sizing: border-box;
        border-right: 1px solid #E0E6ED;
        border-bottom: 1px solid #E0E6ED;
      }
      .r-z {
        width: 580px;
        line-height: 40px;
        background: #F9FAFC;
        box-sizing: border-box;
        border-right: 1px solid #E0E6ED;
        border-bottom: 1px solid #E0E6ED;
        overflow: hidden;

        span {
          float: left;
          width: 104px;
          font-size: 14px;
          color: #5E6D82;
          box-sizing: border-box;
          padding-left: 20px;
        }

        & span:last-child {
          width: 472px;
          color: #1F2D3D;
        }
      }
    }

    .bg-color {
      background: #F9FAFC;
    }
  }

  .eq-height {
    width: 1160px;
    overflow: hidden;
    display: flex;
    clear: both;
    border-bottom: 1px solid #E0E6ED;

    .j-y {
      display: flex;
      width: 580px;
      overflow: hidden;
      font-size: 14px;
      line-height: 24px;
      box-sizing: border-box;
      overflow: hidden;
      padding: 8px 20px;
      background: #F9FAFC;
      border-right: 1px solid #E0E6ED;

      span {
        width: 80px;
        font-size: 14px;
        color: #5E6D82;
        box-sizing: border-box;
      }

      p {
        flex: 1;
        box-sizing: border-box;
      }
    }

    .j-b {
      background: #ffffff;
    }
    
    

    .one {
      width: 580px;
      box-sizing: border-box;
      padding: 20px;
      border-right: 1px solid #E0E6ED;

      .title {
        font-size: 24px;
        line-height: 32px;
        color: #000000;
        text-align: center;
      }

      .time {
        font-size: 14px;
        line-height: 33px;
        color: #8492A6;
        text-align: center;
      }

      .info-big {
        width: 100%;
        margin-top: 10px;
      }

      .info-con {
        font-size: 14px;
        line-height: 30px;
        margin-top: 20px;
        color: #1F2D3D;
      }

      .author {
        overflow: hidden;
        padding: 18px 5px;
        margin-top: 50px;
        border-top: 1px solid #C0CCDA;
        border-bottom: 1px solid #C0CCDA;

        .a-left {
          float: left;
          width: 380px;
          border-right: 1px solid #C0CCDA;

          img {
              float: left;
              width: 65px;
              height: 65px;
              border-radius: 50%;
          }

          p {
            float: right;
            width: 300px;
            span {
                display: block;
                font-size: 12px;
                color: #5E6D82;
                line-height: 21px;
            }

            .au-t {
                font-size: 16px;
                line-height: 26px;
                color: #1F2D3D;
            }
          }
        }

        .a-right {
          float: left;
          width: 146px;

          img {
              display: block;
              width: 45px;
              height: 45px;
              margin: auto;
              cursor: pointer;
          }

          p {
              font-size: 10px;
              line-height: 26px;
              text-align: center;
              color: #8492A6;
          }
        }
      }
    }

    .j-l {
      border-right: 1px solid #E0E6ED;
    }

    .j-r {
      width: 581px;
      border-left: 1px solid #E0E6ED;
      margin-left: -1px;
    }
  }
}
</style>
