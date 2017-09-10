<template>
  <div class="notice-detail">
    <div class="nav-o">
      <router-link class="nav-z">我的任务</router-link>
      <span class="nav-z"> / </span>
      任务详情
    </div>
    <section class="one">
      <p class="title-e">
        {{detail.title}}
      </p>
      <div class="time">
        <p class="btns">
          <share :down-url="detail.download" :file-name="detail.fileName" :id-type="detail.id"></share>
        </p>
      </div>
      
      <div class="table-o">
        <p>
          <span>任务开始时间</span>
          <span>{{detail.dateS}}</span>
        </p>
        <p>
          <span>任务结束时间</span>
          <span>{{detail.dateE}}</span>
        </p>
        <p>
          <span>文章数量</span>
          <span>{{detail.artNum}}</span>
        </p>
        <p>
          <span>提交（天/1篇）</span>
          <span>{{detail.subDay}}</span>
        </p>
      </div>

      <div class="table-t">
        •   请您从2017年10月1日开始，到2017年10月31日结束，每隔3天提交一篇文章，共需要10篇文章。
      </div>

      <section class="mail-box">
        <div class="one">
          <p>
            <span>任务开始时间</span>
            <span>{{detail.dateS}}</span>
          </p>
          <p>
            <span>任务结束时间</span>
            <span>{{detail.dateE}}</span>
          </p>
        </div>

        <p class="title">活动推广主题</p>

        <p class="cont">
          {{detail.des}}
        </p>

        <p class="title">主推产品</p>

        <img class="info-mid" :src="detail.proImg">
        
        <p class="cont">
          {{detail.proDes}}
        </p>

        <div class="table-e">
          <p class="t-t">代金劵</p>
          <div class="row">
            <p>
              <span>券生效时间</span>
              <span>{{vouchers.dateS}}</span>
            </p>
            <p>
              <span>券失效时间</span>
              <span>{{vouchers.dateE}}</span>
            </p>
            <p>
              <span>礼品</span>
              <span>{{vouchers.gift}}</span>
            </p>
            <p>
              <span>券数量</span>
              <span>{{vouchers.num}}</span>
            </p>
          </div>
        </div>

        <p class="cont">
          {{vouchers.des}}
        </p>

        <div class="table-e">
          <p class="t-t">礼品劵</p>
          <div class="row">
            <p>
              <span>券生效时间</span>
              <span>{{gifts.dateS}}</span>
            </p>
            <p>
              <span>券失效时间</span>
              <span>{{gifts.dateE}}</span>
            </p>
            <p>
              <span>券金额</span>
              <span>{{gifts.price}}</span>
            </p>
            <p>
              <span>券数量</span>
              <span>{{gifts.num}}</span>
            </p>
          </div>
        </div>
        
        <img class="info-mid" :src="gifts.img">

        <p class="cont">
          {{gifts.des}}
        </p>

        <div class="table-e">
          <p class="t-t">折扣劵</p>
          <div class="row">
            <p>
              <span>券生效时间</span>
              <span>{{zhes.dateS}}</span>
            </p>
            <p>
              <span>券失效时间</span>
              <span>{{zhes.dateE}}</span>
            </p>
            <p>
              <span>折扣</span>
              <span>{{zhes.price}}</span>
            </p>
            <p>
              <span>券数量</span>
              <span>{{zhes.num}}</span>
            </p>
          </div>
        </div>

        <p class="cont">
          {{zhes.des}}
        </p>

        <div class="time">
          <p class="btns">
            <share :down-url="detail.download" :file-name="detail.fileName" :id-type="detail.id"></share>
          </p>
        </div>
      </section>

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
  </div>
</template>
<script>
import share from '../../components/common/share.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      detail: {},
      vouchers: {},
      gifts: {},
      zhes: {},
      author: {}
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      var formData = {
        id: this.$route.params.id
      }
      Tools.getJson('noticeDetail', formData, (res) => {
        if (res.statusCode === 0) {
          this.detail = res.datas.detail
          this.vouchers = res.datas.vouchers
          this.gifts = res.datas.gifts
          this.zhes = res.datas.zhes
          this.author = res.datas.author
          console.log(this.detail)
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
.notice-detail {
  width: 1160px;
  margin: 10px auto;
  overflow: hidden;

  .one {
      margin-top: 10px;

      .title-e {
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

      .table-o {
        padding: 26px 18px;
        background: #EFF2F7;
        overflow: hidden;
        margin-top: 10px;

        p {
          float: left;
          width: 50%;

          span {
            float: left;
            width: 160px;
            font-size: 22px;
            line-height: 32px;
            color: #5E6D82;

            &:last-child {
              width: 300px;
              color: #000000;
            }
          }
        }

      }


      .table-t {
        padding: 0 14px;
        font-size: 18px;
        line-height: 50px;
        color: #1F2D3D;
        background: #F8FBFF;
      }

      .mail-box {
        padding: 0 20px;
        margin-top: 40px;

        .one {
          overflow: hidden;

          p {
            float: left;
            width: 50%;

            span {
              float: left;
              width: 160px;
              font-size: 20px;
              line-height: 32px;
              color: #1F2D3D;

              &:last-child {
                width: 300px;
                color: #000000;
              }
            }
          }
        }

        .title {
          margin-top: 30px;
          font-size: 20px;
          line-height: 32px;
          color: #1F2D3D;
        }

        .cont {
          margin-top: 10px;
          font-size: 14px;
          line-height: 30px;
          color: #1F2D3D;
        }

        .info-mid {
          display: block;
          width: 867px;
          margin: 15px auto 0;
        }

        .table-e {
          border: 1px solid #C0CCDA;
          margin-top: 50px;

          .t-t {
            padding: 0 10px;
            height: 70px;
            font-size: 24px;
            line-height: 70px;
            background: #EFF2F7;
            border-bottom: 1px solid #C0CCDA;
          }

          .row {
            padding: 15px 10px;
            overflow: hidden;
            
            p {
              float: left;
              width: 50%;

              span {
                float: left;
                width: 160px;
                font-size: 20px;
                line-height: 32px;
                color: #1F2D3D;

                &:last-child {
                  width: 300px;
                  color: #000000;
                }
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
          padding: 34px 238px;
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
}
</style>