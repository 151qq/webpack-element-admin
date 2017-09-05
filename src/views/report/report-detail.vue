<template>
  <div class="report-detail">
    <div class="left">
      <section class="one">
        <p class="title">
          什么什么楼盘2017年第二季度评估报告
        </p>
        <div class="time">
          <p class="btns">
            <a>
              <img src="../../assets/images/download-gray.png">
            </a>
            <a>
              <img src="../../assets/images/wx-gray.png">
            </a>
            <a>
              <img src="../../assets/images/mail-gray.png">
            </a>
            <a>
              <img src="../../assets/images/print-gray.png">
            </a>
          </p>
          2017-06-20 20：00
        </div>
        <img class="info-big" src="../../assets/images/info-big.png">
        <p class="info-con">
          佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。紧临东三环，交通方便。由两栋甲级写字楼、裙楼配套商业(现建为俱乐部)及大型地下停车库组成，为国际建筑师公司——巴马丹拿(P&T GROUP)的灵感代表之作。外墙采用高级反光玻璃幕墙配置铝板及石材的组合表现出建筑的现代感，汲取中国古代建筑美学之灵感，造就中西融汇的独特性格。佳程广场总体布局气势磅礴，双塔凌云耸立，以"掌开而合"的形态，表达对世界的拥抱。6000平方米入口广场上设有巨型水景园林，形成辉耀北京东区的新地标。佳程广场占据北京三元桥东侧显要地段，紧临首都机场高速路，交通网络密集，快速通达各商务主站，真正快捷商务之所。佳程广场与临近的亮马河商务区共同拥抱第三使馆区，形成北京商务活动密集的综合商务区。佳程广场市场定位佳程广场市场定位为国际一流品质纯写字楼，市场细分为特别针对产业国际性的行业领先企业及机构，为其度身定造区域总部新址战略。该项目将于2005年初全面落成，届时，3F新概念的“佳程广场”将提供给客户全面升级的新办公空间，实现效率性(Efficiency)+灵活性( Flexibility)+沟通性(Connectivity)+愉悦性(Enjoyment)四维的新层次需求体验。
        </p>
        <div class="author">
          <section class="a-left">
            <img src="../../assets/images/info-t.png">
            <p>
              <span class="au-t">James Macdonald</span>
              <span>Director, China</span>
              <span>+8621 6391 6688 james.macdonald@savills.com.cn</span>
            </p>
          </section>
          <section class="a-right">
              <img src="../../assets/images/ewm.png">
              <p>请用微信扫码联系作者</p>
          </section>
        </div>
      </section>
      <section class="two">
        <router-link class="card-b" :to="{ name: 'detail' }">
          <img class="i-t" src="../../assets/images/report1.png">
          <div class="card">
            <p class="title">标题标题标题</p>
            <p class="cont">
              佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。紧临东三环，交通方便。由两栋甲级写字楼、裙楼配套商业(现建为俱乐部)及大型地下停车库组成，为国际建筑师公司——巴马丹拿(P&T GROUP)的灵感代表之作。外墙采用高级反光玻璃幕墙配置铝板及石材的组合表现出建筑的现代感，汲取中国古代建筑美学之灵感，造就中西融汇的独特性格。佳程广场总体布局气势磅礴，双塔凌云耸立，以"掌开而合"的形态，表达对世界的拥抱。6000平方米入口广场上设有巨型水景园林，形成辉耀北京东区的新地标。
            </p>
            <p class="btns">
              <a>
                <img src="../../assets/images/download.png">
              </a>
              <a>
                <img src="../../assets/images/wx.png">
              </a>
              <a>
                <img src="../../assets/images/mail.png">
              </a>
              <a>
                <img src="../../assets/images/print.png">
              </a>
            </p>
          </div>
        </router-link>
      </section>
  </div>
  <div class="right">
    <router-link class="bench" :to="{name: 'benchmark'}">
      <img src="../../assets/images/detial1.png">
      <span>康乐大厦</span>
    </router-link>
    <router-link class="bench" :to="{name: 'benchmark'}">
      <img src="../../assets/images/detial1.png">
      <span>康乐大厦</span>
    </router-link>
    <router-link class="bench" :to="{name: 'benchmark'}">
      <img src="../../assets/images/detial1.png">
      <span>康乐大厦</span>
    </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
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

              .btns {
                text-align: right;

                a {
                  height: 16px;
                  display: inline-block;
                  padding-left: 10px;
                  border-left: 1px solid #C0CCDA;
                  margin-left: 10px;

                  &:first-child {
                    border: none;
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