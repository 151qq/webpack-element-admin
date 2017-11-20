<template>
    <div class="evalute-box">
        <div class="left">
            <section class="one">
                <img class="info-big" :src="base.housesImg">
                <div class="info-con" v-html="base.housesDesc"></div>
            </section>
            <section class="two">
                <router-link v-for="item in benchs" target="_blank"
                            :to="{name: 'benchmark', params: { type: type, id: id + ',' + item.id }}">
                    <img :src="item.base.housesImg">
                    <div class="bg-black"></div>
                    <div class="title-box">对标 | {{item.base.name}}</div>
                </router-link>
            </section>
        </div>
        <div class="right">
            <router-link v-for="item in historyList" class="bench" target="_blank"
                        :to="{name: item.pathName, params: {id: $route.params.id}}">
                <img :src="item.imgUrl">
                <div class="bg-black"></div>
                <div class="title-box">{{item.name}}</div>
            </router-link>
        </div>

        <show-ewm :dialog-visible="dialogVisible" :path="imgPath"></show-ewm>
    </div>
</template>
<script>
import showEwm from '../../components/common/show-ewm.vue'
import Tools from '../../utils/tools.js'

export default {
  props: ['benchs', 'base'],
  data () {
    return {
      dialogVisible: {
        value: false
      },
      imgPath: '',
      type: '',
      reportType: '',
      id: '',
      reports: [],
      historyList: [
        {
            name: '物业估值历史',
            imgUrl: '/static/images/house3.jpg',
            pathName: 'evalues'
        },
        {
            name: '物业租金历史',
            imgUrl: '/static/images/house2.jpg',
            pathName: 'rents'
        },
        {
            name: '物业交易历史',
            imgUrl: '/static/images/house1.jpg',
            pathName: 'changes'
        },
        {
            name: '空置率历史',
            imgUrl: '/static/images/house4.jpg',
            pathName: 'rates'
        }
      ]
    }
  },
  created () {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    this.getReports()
  },
  methods: {
    showEWM (path) {
      this.imgPath = path
      this.dialogVisible.value = true
    },
    getReports () {
      var formData = {
        catalogCode: 'property'
      }
      Tools.getJson('reportProduct', formData, (res) => {
        if (res.success === '1') {
          this.reports = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  components: {
    showEwm
  }
}
</script>
<style lang="scss">
.evalute-box {
    width: 1160px;
    margin: 10px auto;
    overflow: hidden;

    .left {
        float: left;
        width: 867px;

        .one {

            .htmlBox {
                width: 100%;
                height: auto;
                min-height: 500px;
            }

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

                p {
                    font-size: 14px;
                    line-height: 30px;
                    color: #1F2D3D;
                }
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

            p {
                font-size: 20px;
                line-height: 28px;
                color: #000000;
                margin-bottom: 10px;
            }

            a {
                position: relative;
                float: left;
                width: 270px;
                margin-right: 28px;
                cursor: pointer;
                height: 180px;
                overflow: hidden;

                img {
                    width: 270px;
                    height: 180px;
                }

                .bg-black {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    background: #000000;
                    opacity: 0.6;
                }

                .title-box {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    padding: 0 14px;
                    box-sizing: border-box;
                    font-size: 16px;
                    line-height: 40px;
                    color: #ffffff;
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
            position: relative;
            display: block;
            margin-bottom: 15px;

            img {
                width: 260px;
                height: 180px;
                border-radius: 3px;
            }

            .bg-black {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                height: 60px;
                background: #000000;
                opacity: 0.6;
            }

            .title-box {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                height: 60px;
                text-align: center;
                font-size: 16px;
                line-height: 60px;
                color: #ffffff;
            }
        }
    }
}
</style>