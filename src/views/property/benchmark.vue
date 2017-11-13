<template>
  <section class="bench-con">

    <div class="nav-o marg-auto">
      <router-link class="nav-z" :to="{name: 'index', params: {type: type}}">{{navO[type]}}</router-link>
      <span class="nav-z"> / </span>
      <router-link class="nav-z" :to="{name: 'info', params: {type: type, id: id.split(',')[0]}}">楼盘评述</router-link>
      <span class="nav-z"> / </span>
      对标详情
    </div>

    <banner-benchmark :benchs="benchDatas"></banner-benchmark>

    <div class="mid-box">
      <div v-for="(item, index) in benchDatas" class="left">
        <ul class="table">
          <li class="row title">
            <span>名称：</span>
            <span>{{item.base.name}}</span>
          </li>
          <li class="row old">
            <span>楼盘类型：</span>
            <span>{{item.base.type}}</span>
          </li>
          <li class="row even">
            <span>楼盘等级：</span>
            <span>{{item.base.level}}</span>
          </li>
          <li class="row old">
            <span>地址：</span>
            <span>{{item.base.address}}</span>
          </li>
          <li class="row even">
            <span>地块：</span>
            <span>{{item.base.massif}}</span>
          </li>
          <li class="row old">
            <span>物业：</span>
            <span>{{item.base.owner}}</span>
          </li>
          <li class="row even">
            <span>剩余年限：</span>
            <span>{{item.base.year}}</span>
          </li>
          <li class="row old">
            <span>容积率：</span>
            <span>{{item.base.ratio}}</span>
          </li>
          <li class="row even">
            <span>星标：</span>
            <span>{{item.base.star == '0' ? '否' : '是'}}</span>
          </li>
          <li class="row old">
            <span>证券类型：</span>
            <span>{{item.base.bondType}}</span>
          </li>
          <li class="row even">
            <span>产品类型：</span>
            <span>{{item.base.bondCode}}</span>
          </li>
          <li class="row old">
            <span>面积：</span>
            <span>{{item.base.area}}</span>
          </li>
          <li class="row even">
            <span>总层数：</span>
            <span>{{item.base.plies}}</span>
          </li>
          <li class="row old">
            <span>层高：</span>
            <span>{{item.base.height}}</span>
          </li>
          <li class="row even">
            <span>电梯：</span>
            <span>{{item.base.elevator}}</span>
          </li>
          <li class="row old">
            <span>车位：</span>
            <span>{{item.base.park}}</span>
          </li>
          <li class="row even">
            <span>空调：</span>
            <span>{{item.base.conditioner}}</span>
          </li>
          <li class="row old">
            <span>地板：</span>
            <span>{{item.base.floor}}</span>
          </li>
          <li class="row even">
            <span>物业持有：</span>
            <span>{{item.base.holding}}</span>
          </li>
          <li class="row old">
            <span>交通：</span>
            <span>{{item.base.traffic}}</span>
          </li>
        </ul>
        <section class="r-z">
          <span>入驻企业：</span>
          <span>{{item.base.rent}}</span>
        </section>
        <section class="echart-box">
          <echarts-tar :id-name="'echarI' + index" :echarts-date="item.echarInfo" :ref="'echarI' + index"></echarts-tar>
        </section>
        <section class="j-y">
          <span>交易记录：</span>
          <p><echarts-tar :id-name="'echarR' + index" :echarts-date="item.echarRecord" :ref="'echarR' + index"></echarts-tar></p>
        </section>
        <!-- <section class="one">
          <p class="title">{{item.base.name}}</p>
          <img class="info-big" :src="item.base.housesImg">
          <p class="info-con">{{item.base.housesDesc}}</p>
          <div class="author">
              <section class="a-left">
                  <img :src="authors[index].userImage">
                  <p>
                      <span class="au-t">{{author[index].userLoginName}}</span>
                      <span>{{author[0].city}}</span>
                      <span>{{author[0].userMobile + author[0].userMail}}</span>
                  </p>
              </section>
              <section class="a-right">
                  <img :src="author[index].qrcode" @click="showEWM(author[index].qrcode)">
                        <p>请用微信扫码联系作者</p>
              </section>
          </div>
        </section> -->
      </div>
    </div>
    <show-ewm :dialog-visible="dialogVisible" :path="imgPath"></show-ewm>
  </section>
</template>
<script>
import bannerBenchmark from '../../components/views/banner-benchmark.vue'
import echartsTar from '../../components/common/echart-tar.vue'
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
      }
    }
  },
  created () {
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
            this.$refs.echarI0[0].setEcharts()
            this.$refs.echarI1[0].setEcharts()
            this.$refs.echarR0[0].setEcharts()
            this.$refs.echarR1[0].setEcharts()
          }, 0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getRecord (id) {
      var formData = {
        id: id
      }
      Tools.getJson('record', formData, (res) => {
        if (res.success == '1') {
          var record = ''
          res.result.changes.forEach((item, index) => {
            if (index != 0) {
              record = '，' + record
            }

            record = record + item.date.split(' ')[0] + ' ' + item.changeA + ' -> ' + item.changeB + ' （' + item.price + '万元）'
          })
          this.record = record
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getAuthor () {
      if (!this.base.investor) {
        return false
      }
      
      var formData = {
        userCode: this.base.investor
      }
      Tools.getJson('findUserInfoByCode', formData, (res) => {
        if (res.success == '1') {
          this.author = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
  },
  components: {
    bannerBenchmark,
    echartsTar,
    showEwm
  }
}
</script>
<style lang="scss" scoped>
.bench-con {
  .echar-box {
    height: 270px;
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
      .j-y {
        width: 580px;
        height: 320px;
        overflow: hidden;
        line-height: 40px;
        box-sizing: border-box;
        border-right: 1px solid #E0E6ED;
        border-bottom: 1px solid #E0E6ED;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;

        span {
          display: block;
          font-size: 14px;
          color: #5E6D82;
          box-sizing: border-box;
        }

        p {
          display: block;
          box-sizing: border-box;
          padding-left: 20px;
        }
      }
      .one {
        width: 580px;
        box-sizing: border-box;
        padding: 20px;
        border-right: 1px solid #E0E6ED;
        border-bottom: 1px solid #E0E6ED;

        .title {
          font-size: 30px;
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
    }
  }
}
</style>
