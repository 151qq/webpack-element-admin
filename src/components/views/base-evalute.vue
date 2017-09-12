<template>
    <div class="evalute-box">
        <div class="left">
            <section class="one">
                <p class="title">{{evaluate.title}}</p>
                <img class="info-big" :src="evaluate.img">
                <p class="info-con">{{evaluate.des}}</p>
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
                        <img :src="author.ewm" @click="showEWM(author.ewm)">
                        <p>请用微信扫码联系作者</p>
                    </section>
                </div>
            </section>
            <section class="two">
                <a v-for="item in reports" @click="showModel(item.id)">
                    <img :src="item.imgUrl">
                    <div>
                        {{item.title}}
                        <span>
                            订阅
                        </span>
                    </div>
                </a>
            </section>
        </div>
        <div class="right">
            <p>对标楼盘</p>
            <router-link v-for="item in benchs" class="bench" target="_blank" :to="{name: 'benchmark', params: { type: type, id: id + ',' + item.id }}">
                <img :src="item.imgUrl">
                <span>{{item.title}}</span>
            </router-link>
        </div>

        <ewm-select :dialog-form-visible="dialogFormVisible" :report-type="reportType"></ewm-select>
        <show-ewm :dialog-visible="dialogVisible" :path="imgPath"></show-ewm>
    </div>
</template>
<script>
import ewmSelect from '../../components/views/ewm-select.vue'
import showEwm from '../../components/common/show-ewm.vue'
import Tools from '../../utils/tools.js'

export default {
  props: ['evaluate'],
  data () {
    return {
      dialogVisible: {
        value: false
      },
      imgPath: '',
      dialogFormVisible: {
        visibleE: false
      },
      type: '',
      benchs: [],
      reportType: '',
      id: '',
      author: {},
      reports: []
    }
  },
  created () {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    this.getBenchs()
    this.getReports()
  },
  mounted () {
    setTimeout(() => {
      this.author = this.evaluate.author
    }, 300)
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
    getBenchs () {
      let formData = {
        type: this.type,
        id: this.$route.params.id
      }

      Tools.getJson('benchList', formData, (res) => {
        if (res.statusCode === 0) {
          this.benchs = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    getReports () {
      let formData = {
        type: this.type,
        id: this.$route.params.id
      }

      Tools.getJson('reportType', formData, (res) => {
        if (res.statusCode === 0) {
          this.reports = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  },
  components: {
    ewmSelect,
    showEwm
  }
}
</script>
<style lang="scss" scoped>
.evalute-box {
    width: 1160px;
    margin: 10px auto;
    overflow: hidden;

    .left {
        float: left;
        width: 867px;

        .one {

            .title {
                font-size: 20px;
                line-height: 28px;
                color: #000000;
                margin-bottom: 10px;
            }

            .info-big {
                width: 100%;
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
            width: 110%;
            margin: 37px 0;
            overflow: hidden;

            a {
                float: left;
                width: 270px;
                border: 1px solid #D3DCE6;
                margin-right: 28px;
                border-radius: 3px;
                cursor: pointer;

                img {
                    width: 270px;
                    height: 150px;
                }

                div {
                    padding: 0 14px;
                    height: 50px;
                    overflow: hidden;
                    font-size: 16px;
                    line-height: 50px;

                    span {
                        float: right;
                        padding-left: 20px;
                        background: url(../../assets/images/check-icon.png) left center no-repeat;
                        font-size: 14px;
                        line-height: 50px;
                        color: #5E6D82;
                    }
                }
            }
        }
    }

    .right {
        float: right;
        width: 260px;

        p {
            font-size: 20px;
            line-height: 28px;
            color: #000000;
            margin-bottom: 10px;
        }

        .bench {
            display: block;
            margin-bottom: 15px;

            img {
                width: 260px;
                height: 180px;
                border-radius: 3px;
            }

            span {
                display: block;
                font-size: 16px;
                line-height: 30px;
                color: #4A4A4A;
            }
        }
    }
}
</style>