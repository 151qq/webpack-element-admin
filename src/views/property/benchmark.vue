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
      </div>
      <div class="left">
        <section class="echart-box">
          <echarts-tar :id-name="'echartsOne'" :echarts-date="echartsOne" :ref="'echartsOne'"></echarts-tar>
        </section>       
      </div>
      <div class="left">
        <section class="echart-box">
          <echarts-tar :id-name="'echartsTwo'" :echarts-date="echartsOne" :ref="'echartsTwo'"></echarts-tar>
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

      <div class="eq-height">
        <section class="one j-l" v-if="benchDatas[0]">
          <p class="title">{{benchDatas[0].base.name}}</p>
          <img class="info-big" :src="benchDatas[0].base.housesImg">
          <p class="info-con">{{benchDatas[0].base.housesDesc}}</p>
          <div class="author" v-if="authorOne.userLoginName">
              <section class="a-left">
                  <img :src="authorOne.userImage">
                  <p>
                      <span class="au-t">{{authorOne.userLoginName}}</span>
                      <span>{{authorOne.city}}</span>
                      <span>{{authorOne.userMobile + authorOne.userMail}}</span>
                  </p>
              </section>
              <section class="a-right">
                  <img :src="authorOne.qrcode" @click="showEWM(authorOne.qrcode)">
                        <p>请用微信扫码联系作者</p>
              </section>
          </div>
        </section>

        <section class="one j-r" v-if="benchDatas[1]">
          <p class="title">{{benchDatas[1].base.name}}</p>
          <img class="info-big" :src="benchDatas[1].base.housesImg">
          <p class="info-con">{{benchDatas[1].base.housesDesc}}</p>
          <div class="author" v-if="authorTwo.userLoginName">
              <section class="a-left">
                  <img :src="authorTwo.userImage">
                  <p>
                      <span class="au-t">{{authorTwo.userLoginName}}</span>
                      <span>{{authorTwo.city}}</span>
                      <span>{{authorTwo.userMobile + authorTwo.userMail}}</span>
                  </p>
              </section>
              <section class="a-right">
                  <img :src="authorTwo.qrcode" @click="showEWM(authorTwo.qrcode)">
                        <p>请用微信扫码联系作者</p>
              </section>
          </div>
        </section>
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
      },
      authorOne: {},
      authorTwo: {},
      recordOne: '',
      recordTwo: '',
      echartsOne: {},
      echartsTwo: {}
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
            console.log(this.$refs)
            this.$refs.bannerBench.drawMap()

            this.getRecord(this.benchDatas[0].id, 'recordOne')
            this.getRecord(this.benchDatas[1].id, 'recordTwo')

            this.getAuthor(this.benchDatas[0].base.investor, 'authorOne')
            this.getAuthor(this.benchDatas[1].base.investor, 'authorTwo')

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
          var record = ''
          res.result.changes.forEach((item, index) => {
            if (index != 0) {
              record = '，' + record
            }

            record = record + item.date.split(' ')[0] + ' ' + item.changeA + ' -> ' + item.changeB + ' （' + item.price + '万元）'
          })
          this[key] = record
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getAuthor (investor, key) {
      if (!investor) {
        return false
      }
      
      var formData = {
        userCode: investor
      }
      Tools.getJson('findUserInfoByCode', formData, (res) => {
        if (res.success == '1') {
          this[key] = res.result
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
  }

  .eq-height {
    width: 1160px;
    overflow: hidden;
    display: flex;
    clear: both;
    border-bottom: 1px solid #E0E6ED;

    .j-y {
      width: 580px;
      overflow: hidden;
      line-height: 40px;
      box-sizing: border-box;
      overflow: hidden;
      padding: 0 20px;
      background: #F9FAFC;
      border-right: 1px solid #E0E6ED;

      span {
        font-size: 14px;
        color: #5E6D82;
        box-sizing: border-box;
      }

      p {
        display: inline-block;
        box-sizing: border-box;
      }
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
