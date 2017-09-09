<template>
    <div class="evalute-box">
        <div class="left">
            <section class="one">
                <p class="title">{{evaluate.title}}</p>
                <p class="time">{{evaluate.date}}</p>
                <img class="info-big" :src="evaluate.img">
                <p class="info-con">{{evaluate.des}}</p>
                <div class="author">
                    <section class="a-left">
                        <img :src="evaluate.author.img">
                        <p>
                            <span class="au-t">{{evaluate.author.name}}</span>
                            <span>{{evaluate.author.city}}</span>
                            <span>{{evaluate.author.tel + evaluate.author.email}}</span>
                        </p>
                    </section>
                    <section class="a-right">
                        <img :src="evaluate.author.ewm">
                        <p>请用微信扫码联系作者</p>
                    </section>
                </div>
            </section>
            <section class="two">
                <a @click="showModel('join')">
                    <img src="../../assets/images/eva-b1.png">
                    <div>
                        物业投资报告
                        <span>
                            订阅
                        </span>
                    </div>
                </a>
                <a @click="showModel('manage')">
                    <img src="../../assets/images/eva-b2.png">
                    <div>
                        物业资产管理报告
                        <span>
                            订阅
                        </span>
                    </div>
                </a>
                <a @click="showModel('quit')">
                    <img src="../../assets/images/eva-b3.png">
                    <div>
                        物业退出报告
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
    </div>
</template>
<script>
import ewmSelect from '../../components/views/ewm-select.vue'
import Tools from '../../utils/tools.js'

export default {
  props: ['evaluate'],
  data () {
    return {
      dialogFormVisible: {
        visibleE: false
      },
      type: '',
      benchs: [],
      reportType: '',
      id: ''
    }
  },
  created () {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    this.getBenchs()
  },
  methods: {
    showModel (type) {
      this.reportType = type
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
    }
  },
  components: {
    ewmSelect
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
            margin-top: 10px;

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
            margin: 41px 0 15px;
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