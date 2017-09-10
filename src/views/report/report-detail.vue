<template>
  <div class="report-detail">
    <div class="left">
      <section class="one">
        <p class="title">
          {{detail.title}}
        </p>
        <div class="time">
          <p class="btns">
            <share :down-url="detail.download" :file-name="detail.fileName" :id-type="detail.id"></share>
          </p>
          {{detail.date}}
        </div>
        <img class="info-big" :src="detail.img">
        <p class="info-con">
          {{detail.des}}
        </p>
        <div class="author">
          <section class="a-left">
            <img :src="author.img">
            <p>
              <span class="au-t">{{author.name}}</span>
              <span>{{author.city}}</span>
              <span>{{author.tel + author.email}}</span>
            </p>
          </section>
          <section class="a-right">
              <img :src="author.ewm">
              <p>请用微信扫码联系作者</p>
          </section>
        </div>
      </section>
      <section class="two">
        <template v-for="item in list">
          <router-link class="card-b" :to="{ name: 'detail' ,params: {id: item.id}}">
            <img class="i-t" :src="item.imgUrl">
            <div class="card">
              <p class="title">{{item.title}}</p>
              <p class="cont">
                {{item.des}}
              </p>
            </div>
          </router-link>
          <p class="btns">
            <share :down-url="item.download" :file-name="item.fileName" :id-type="item.id"></share>
          </p>
        </template>
      </section>
    </div>
    <div class="right">
      <a v-for="item in adList" class="bench" target="_blank" :href="item.href">
        <img :src="item.imgUrl">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>
<script>
import share from '../../components/common/share.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      detail: {},
      list: [],
      adList: [],
      author: {}
    }
  },
  created () {
    this.getReport()
    this.getAds()
  },
  methods: {
    // 获取报告数据
    getReport () {
      var formData = {
        id: this.$route.params.id
      }
      Tools.getJson('reportDetail', formData, (res) => {
        if (res.statusCode === 0) {
          this.detail = res.datas.detail
          this.author = res.datas.detail.author
          this.list = res.datas.list
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    // 获取广告数据
    getAds () {
      var formData = {
        id: this.$route.params.id
      }
      Tools.getJson('adList', formData, (res) => {
        if (res.statusCode === 0) {
          this.adList = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  },
  components: {
    share
  }
}
</script>
<style lang="scss" scoped>
.report-detail {
    width: 1160px;
    margin: 10px auto;
    overflow: hidden;

    .left {
        float: left;
        width: 867px;

        .one {
            margin-top: 10px;

            .title {
                font-size: 30px;
                line-height: 32px;
                color: #000000;
                text-align: center;
            }

            .time {
                position: relative;
                font-size: 14px;
                line-height: 33px;
                color: #8492A6;
                text-align: center;
                height: 33px;
                margin-top: 10px;

                .btns {
                  position: absolute;
                  left: 0;
                  top: 9px;
                  text-align: left;

                  a {
                    height: 16px;
                    display: inline-block;
                    padding-left: 10px;
                    border-left: 1px solid #C0CCDA;
                    margin-left: 10px;

                    &:first-child {
                      border: none;
                      padding: 0;
                    }

                    img {
                      position: relative;
                      top: -2px;
                      transition: all 0.3s;
                      cursor: pointer;

                      &:hover {
                        opacity: 0.8;
                      }
                    }
                  }
                }
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
                padding: 34px 118px;
                border-top: 1px solid #C0CCDA;
                border-bottom: 1px solid #C0CCDA;
                margin-top: 20px;

                .a-left {
                    float: left;
                    width: 430px;
                    border-right: 1px solid #C0CCDA;

                    img {
                        float: left;
                        width: 83px;
                        height: 83px;
                        border-radius: 50%;
                    }

                    p {
                        float: right;
                        width: 330px;
                        margin-top: 10px;

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
                            margin-bottom: 7px;
                        }
                    }
                }

                .a-right {
                    float: left;
                    width: 200px;

                    img {
                        display: block;
                        width: 64px;
                        height: 64px;
                        margin: auto;
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

        .two {
          margin-top: 40px;

          .btns {
            text-align: right;
            position: relative;
            top: -70px;
          }

          .card-b {
            display: block;
            overflow: hidden;
            padding-bottom: 30px;
            border-bottom: 1px solid #C0CCDA;
            margin-bottom: 30px;
            
            .i-t {
              float: left;
              width: 200px;
              height: 240px;
            }

            .card {
              float: right;
              width: 654px;

              .title {
                font-size: 20px;
                line-height: 30px;
                color: #000000;
              }

              .cont {
                font-size: 14px;
                line-height: 30px;
                color: #475669;
                height: 180px;
                overflow: hidden;
              }
            }
          }
        }
    }

    .right {
        float: right;
        width: 260px;
        margin-top: 94px;

        .bench {
            display: block;
            margin-bottom: 15px;
            border: 1px solid #C0CCDA;
            border-radius: 3px;

            img {
                width: 260px;
            }

            span {
                display: block;
                font-size: 16px;
                line-height: 48px;
                color: #4A4A4A;
                padding-left: 14px;
            }
        }
    }
}
</style>