<template>
  <section class="invest-detail-con">
    <banner-invest :base="base"></banner-invest>

    <div class="mid-box">
      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane label="基本信息" name="基本信息">
          <div class="out-box">
            <p class="base-b base-big">
                <span class="title">投资机构名称：</span>
                <span class="base-content">{{base.enterpriseCname}}</span>
            </p>
            <p class="base-b">
                <span class="title">机构简称：</span>
                <span class="base-content">{{base.enterpriseNameReg}}</span>
            </p>
            <p class="base-b">
                <span class="title">主体评级：</span>
                <span class="base-content">{{base.enterpriseCreditLevel}}</span>
            </p>
            <p class="base-b">
                <span class="title">公司官网：</span>
                <span class="base-content">{{base.enterpriseWebLink}}</span>
            </p>
            <p class="base-b">
                <span class="title">机构法人：</span>
                <span class="base-content">{{base.enterpriseLegalPerson}}</span>
            </p>
            <p class="base-b">
                <span class="title">组织机构代码：</span>
                <span class="base-content">{{base.enterpriseCode}}</span>
            </p>
            <p class="base-b">
                <span class="title">成立时间：</span>
                <span class="base-content">{{base.enterpriseOpenTime}}</span>
            </p>
            <p class="base-b">
                <span class="title">企业类型：</span>
                <span class="base-content">{{base.enterpriseIndustry}}</span>
            </p>
            <p class="base-b">
                <span class="title">注册地址：</span>
                <span class="base-content">{{base.enterpriseRegPlace}}</span>
            </p>
            <p class="base-b">
                <span class="title">办公地点：</span>
                <span class="base-content">{{base.enterpriseLogisticCity}}</span>
            </p>
            <p class="base-b">
                <span class="title">邮编：</span>
                <span class="base-content">{{base.enterpriseLogisticZipcode}}</span>
            </p>
            <p class="base-b">
                <span class="title">上市机构：</span>
                <span class="base-content">{{base.enterpriseStockSite}}</span>
            </p>
            <p class="base-b">
                <span class="title">股票代码：</span>
                <span class="base-content">{{base.enterpriseStockCode}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">详细地址：</span>
                <span class="base-content">{{base.enterpriseLogisticAddr}}</span>
            </p>
            <p class="base-b">
                <span class="title">总资产(万)：</span>
                <span class="base-content">{{base.enterpriseTotalAsset}}</span>
            </p>
            <p class="base-b">
                <span class="title">资产负债率：</span>
                <span class="base-content">{{base.enterpriseAssetLiabilityRatio}}</span>
            </p>
            <p class="base-b">
                <span class="title">资本充足率：</span>
                <span class="base-content">{{base.enterpriseCapitalAdequacyRatio}}</span>
            </p>
            <p class="base-b">
                <span class="title">核心资本充足率：</span>
                <span class="base-content">{{base.enterpriseCoreCapitialAdequacyRatio}}</span>
            </p>
            <p class="base-b">
                <span class="title">存贷款比：</span>
                <span class="base-content">{{base.enterpriseDepositLoanRatio}}</span>
            </p>
            <p class="base-b">
                <span class="title">不良贷款率：</span>
                <span class="base-content">{{base.enterpriseNplRatio}}</span>
            </p>
            <p class="base-b">
                <span class="title">拨备覆盖率：</span>
                <span class="base-content">{{base.enterpriseProvisionCoverage}}</span>
            </p>
            <p class="base-b">
                <span class="title">资产收益率：</span>
                <span class="base-content">{{base.enterpriseAssetsReturn}}</span>
            </p>
          </div>

          <div class="invest-des-box">
              <div class="left">
                  <section class="one">
                      <img class="info-big" :src="base.enterpriseLogoUrl">
                      <div class="info-con" v-html="base.enterpriseDesc"></div>
                  </section>
              </div>
              <div class="right">
                  <a v-for="item in publicList" class="bench"
                      @click="showEwm(item.ewmUrl)">
                      <img :src="item.imgUrl">
                      <div class="bg-black"></div>
                      <div class="title-box">{{item.name}}</div>
                  </a>
              </div>

              <show-ewm :dialog-visible="dialogVisible" :path="imgPath"></show-ewm>
          </div>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="所持物业" name="所持物业">
          <router-link class="list-card"
                        v-for="(item, index) in propertyList"
                        :to="{name: 'info', params: {type: 'business', id: item.id}}">
              <img class="img-left" :src="item.imgUrl">
              <div class="con-right">
                <span class="content-list">名称：{{item.name}}</span>
                <span class="content-list">地址：{{item.address}}</span>
                <span class="content-list">业务：{{item.business}}</span>
                <span class="link-list" @click.prevent="showChanges(item.id)">交易详情 ></span>
              </div>
          </router-link>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="交易详情" :visible.sync="dialogFormVisible">
          <el-form :label-position="'left'" label-width="100px" :model="curentData">
              <el-form-item label="交易日期：">
                  {{curentData.dateString}}
              </el-form-item>
              <el-form-item label="价格(万)：">
                  {{curentData.price}}
              </el-form-item>
              <el-form-item label="交易甲方：">
                  {{curentData.changeA}}
              </el-form-item>
              <el-form-item label="交易乙方：">
                  {{curentData.changeB}}
              </el-form-item>
              <el-form-item label="评估机构：">
                  {{curentData.evalCodes}}
              </el-form-item>
              <el-form-item label="咨询机构：">
                  {{curentData.tenantFinanceTool}}
              </el-form-item>
              <el-form-item label="交易备注：">
                  {{curentData.tenantDesc}}
              </el-form-item>
          </el-form>
      </el-dialog>
  </section>
</template>
<script>
import bannerInvest from '../../components/views/banner-invest.vue'
import showEwm from '../../components/common/show-ewm.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      activeName: '基本信息',
      base: {
          id: '',
          enterpriseCname: '',
          enterpriseNameReg: '',
          enterpriseCode: '',
          enterpriseOpenTime: '',
          enterpriseType: '',
          enterpriseLevel: '',
          enterpriseRegPlace: '',
          enterpriseLogisticCity: '',
          enterpriseLogisticZipcode: '',
          enterpriseLogisticAddr: '',
          enterpriseStockSite: '',
          enterpriseStockCode: '',
          enterpriseWebLink: '',
          enterpriseLogoUrl: '/static/images/bench1.png',
          enterpriseDesc: '我送送送送送哦宋宋宋宋宋宋宋',
          enterpriseIndustry: '',
          enterpriseEntprisewechatQrcode: '',
          enterpriseTwitterQrcode: '',
          enterpriseFacebookQrcode: '',
          enterpriseSinamicroblogQrcode: '',
          enterprisePubwechatAccount: '',
          enterpriseFacebookAccount: '',
          enterprisePubwechatAccount: '',
          enterpriseSinamicorblogAccount: '',
          enterpriseCreditLevel: '',
          enterpriseTotalAsset: '',
          enterpriseAssetLiabilityRatio: '',
          enterpriseCapitalAdequacyRatio: '',
          enterpriseCoreCapitialAdequacyRatio: '',
          enterpriseDepositLoanRatio: '',
          enterpriseNplRatio: '',
          enterpriseProvisionCoverage: '',
          enterpriseAssetsReturn: ''
      },
      publicList : [
        {
          id: 0,
          imgUrl: '/static/images/house1.jpg',
          ewmUrl: '/static/images/ewm.png',
          name: '微信公众号'
        },
        {
          id: 1,
          imgUrl: '/static/images/house2.jpg',
          ewmUrl: '/static/images/ewm.png',
          name: 'twitter账号'
        },
        {
          id: 2,
          imgUrl: '/static/images/house3.jpg',
          ewmUrl: '/static/images/ewm.png',
          name: 'facebook账号'
        },
        {
          id: 3,
          imgUrl: '/static/images/house4.jpg',
          ewmUrl: '/static/images/ewm.png',
          name: '微博账号'
        }
      ],
      dialogVisible: {
        value: false
      },
      imgPath: '',
      dialogFormVisible: false,
      curentData: {
          id: '',
          dateString: '北京市朝阳区soho大厦',
          price: '北京市朝阳区soho大厦',
          changeA: '北京市朝阳区soho大厦',
          changeB: '北京市朝阳区soho大厦',
          tenantDesc: '北京市朝阳区soho大厦',
          tenantFinanceTool: '北京市朝阳区soho大厦',
          evalCodes: '北京市朝阳区soho大厦'
      },
      propertyList: [
        {
          id: 0,
          imgUrl: '/static/images/bench1.png',
          name: '第一物业',
          address: '北京市朝阳区soho大厦',
          business: '持有 售出 参与评估 交易咨'
        },
        {
          id: 1,
          imgUrl: '/static/images/bench1.png',
          name: '第一物业',
          address: '北京市朝阳区soho大厦',
          business: '持有 售出 参与评估 交易咨'
        },
        {
          id: 0,
          imgUrl: '/static/images/bench1.png',
          name: '第一物业',
          address: '北京市朝阳区soho大厦',
          business: '持有 售出 参与评估 交易咨'
        },
        {
          id: 1,
          imgUrl: '/static/images/bench1.png',
          name: '第一物业',
          address: '北京市朝阳区soho大厦',
          business: '持有 售出 参与评估 交易咨'
        }
      ]
    }
  },
  mounted () {
    document.title = '机构详情'
    // this.getDatas()
  },
  methods: {
    getDatas () {
      let formData = {
        type: this.type,
        id: this.$route.params.id
      }

      Tools.getJson('info', formData, (res) => {
        if (res.success == '1') {
          this.base = res.result.base
          this.evaluate = res.result.evaluate
          this.imgs = res.result.imgs
          this.bigImgs = this.setImgs()
          this.getBenchs()
          this.getAuthor()
          this.getRecord()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showEwm (path) {
      this.imgPath = path
      this.dialogVisible.value = true
    },
    showChanges () {
      this.dialogFormVisible = true
    }
  },
  components: {
    bannerInvest,
    showEwm
  }
}
</script>
<style lang="scss">
.invest-des-box {
    width: 1160px;
    margin: 10px auto 50px;
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

.invest-detail-con {
  .el-dialog--small {
      width: 480px;
  }

  .mid-box {
    position: relative;
    width: 1160px;
    margin: 10px auto;
  }

  .eval-btn {
    position: absolute;
    width: 120px;
    right: 0;
    top: 8px;
    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    color: #fff;
    background-color: #0053FF;
    border-color: #0053FF;
    border-radius: 3px;
    z-index: 120;
    text-align: center;

    img {
      float: left;
      margin: 9px 0 0 12px;
    }
  }

  .out-box {
    padding: 10px 0 10px;
    overflow: hidden;

    .base-b {
        float: left;
        width: 360px;
        margin-right: 20px;

        .title {
            float: left;
            width: 130px;
            font-size: 16px;
            line-height: 40px;
            color: #666666;
        }

        .base-content {
            float: right;
            width: 230px;
            font-size: 16px;
            line-height: 40px;
            color: #000000;
        }
    }

    .base-big {
        width: 1100px;

        .base-content {
            width: 980px;
        }
    }
  }

  .card-outer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 30px;
  }

  .list-card {
    display: flex;
    width: 570px;
    padding-bottom: 20px;
    margin-top: 20px;
    overflow: hidden;
    border-bottom: 1px solid #EFF2F7;

    .img-left {
      width: 200px;
      height: 130px;
    }

    .con-right {
      flex: 1;
      position: relative;
      margin-left: 20px;
      height: 130px;
      
      .content-list {
        display: block;
        font-size: 14px;
        color: #1f2d3d;
        line-height: 24px;
        margin: 3px 0;
      }
      
      .link-list {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;
        color: #20a0ff;
        text-align: right;
      }
    }
  }

  .card-b {
    width: 269px;
    margin-left: 28px;
    margin-bottom: 20px;
  }

  .clearM {
    margin-left: 0;
  }

  .linkA {
    display: block;

    span {
      display: block;
      font-size: 16px;
      color: #000000;
      white-space:nowrap;
      text-overflow:ellipsis;
      -o-text-overflow:ellipsis;
      overflow:hidden;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 248px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
}

</style>
