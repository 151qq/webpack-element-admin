<template>
  <div class="report-detail">
    <div class="left">
      <section class="one">
        <p class="title">
          {{detail.html5PageTitle}}
        </p>
        <div class="time">
          <p class="btns">
            <share
              :down-url="detail.html5Path"
              :file-name="detail.html5PageTitle"
              :ewm-img="detail.html5Qrcode"
              :id-type="detail.id"></share>
          </p>
          {{creatTime}}
        </div>
        <iframe class="info-con" :src="detail.html5Path"></iframe>
        <p class="btns-r">
            <share
              :down-url="detail.html5Path"
              :file-name="detail.html5PageTitle"
              :ewm-img="detail.html5Qrcode"
              :id-type="detail.id"></share>
        </p>
        <div class="author" v-if="author">
          <section class="a-left">
            <img :src="author.userImage">
            <p>
              <span class="au-t">{{author.userLoginName}}</span>
              <span>{{author.city}}</span>
              <span>{{author.userMobile + author.userMail}}</span>
            </p>
          </section>
          <section class="a-right">
              <img :src="author.qrcode" @click="showEWM(author.qrcode)">
              <p>请用微信扫码联系作者</p>
          </section>
        </div>
      </section>
      <section class="two">
        <template v-for="item in list">
          <router-link class="card-b" :to="{ name: 'detail' ,params: {id: item.html5PageCode}}">
            <img class="i-t" :src="item.html5PageindexImg">
            <div class="card">
              <p class="title">{{item.html5PageTitle}}</p>
              <p class="cont">
                {{item.html5Summary}}
              </p>
            </div>
          </router-link>
        </template>
      </section>
    </div>
    <div class="right">
      <a v-for="item in adList" class="bench" target="_blank" @click="showModel(item[0])">
        <img :src="item[2]">
        <span>{{item[1]}}</span>
      </a>
    </div>
    
    <ewm-select :dialog-form-visible="dialogFormVisible" :report-type="reportType"></ewm-select>
    <show-ewm :dialog-visible="dialogVisible" :path="imgPath"></show-ewm>
  </div>
</template>
<script>
import ewmSelect from '../../components/views/ewm-select.vue'
import share from '../../components/common/share.vue'
import showEwm from '../../components/common/show-ewm.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      dialogVisible: {
        value: false
      },
      imgPath: '',
      dialogFormVisible: {
        visibleE: false
      },
      detail: {},
      list: [],
      adList: [],
      author: '',
      reportType: '',
      creatTime: ''
    }
  },
  created () {
    document.title = '报告详情'
    this.getReport()
    this.getAds()
  },
  methods: {
    showEWM (path) {
      this.imgPath = path
      this.dialogVisible.value = true
    },
    showModel (id) {
      this.reportType = id
      this.dialogFormVisible.visibleE = true
    },
    // 获取报告数据
    getReport () {
      var formData = {
        fileCode: this.$route.params.id
      }
      Tools.getJson('reportDetail', formData, (res) => {
        if (res.success == '1') {
          this.detail = res.result
          this.creatTime = res.responsetime.split(' ')[0]
          this.getAuthor()
          this.getSelectList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getAuthor () {
      if (!this.detail.editorCode) {
        return false
      }

      var formData = {
        userCode: this.detail.editorCode
      }
      Tools.getJson('findUserInfoByCode', formData, (res) => {
        if (res.success == '1') {
          this.author = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getSelectList () {
      var formData = {
        fileCode: this.detail.html5PageCode
      }

      Tools.getJson('findRecommendArticleByCode', formData, (res) => {
        if (res.success == '1') {
          this.list = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取广告数据
    getAds () {
      var formData = {
        catalogCode: ''
      }
      Tools.getJson('reportProduct', formData, (res) => {
        if (res.success === '1') {
          this.adList = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  components: {
    ewmSelect,
    share,
    showEwm
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

            .btns-r {
              text-align: right;
              margin-top: 10px;
            }

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
                }
            }

            .info-big {
                width: 100%;
                margin-top: 10px;
            }

            .info-con {
                width: 100%;
                min-height: 300px;
            }

            .author {
                overflow: hidden;
                padding: 34px 118px;
                border-top: 1px solid #C0CCDA;
                border-bottom: 1px solid #C0CCDA;
                margin-top: 10px;

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
            cursor: pointer;

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