<template>
  <section class="security-detail-con">
    <banner-security :banner-list="bannerList" ref="bannerBox"></banner-security>

    <div class="mid-box">
      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane label="基本信息" name="基本信息">
          <div class="out-box">
            <p class="base-b base-big">
                <span class="title">证券名称：</span>
                <span class="base-content">{{base.productCame}}</span>
            </p>
            <p class="base-b">
                <span class="title">发行机构：</span>
                <span class="base-content">{{base.productPublishOrgName}}</span>
            </p>
            <p class="base-b">
                <span class="title">上市地点：</span>
                <span class="base-content">{{base.productIpoSiteName}}</span>
            </p>
            <p class="base-b">
                <span class="title">发行时间：</span>
                <span class="base-content">{{base.productPublishTime}}</span>
            </p>
            <p class="base-b">
                <span class="title">清算时间：</span>
                <span class="base-content">{{base.productEndTime}}</span>
            </p>
            <p class="base-b">
                <span class="title">发行金额(万)：</span>
                <span class="base-content">{{base.productQuotation}}</span>
            </p>
            <p class="base-b">
                <span class="title">承销机构：</span>
                <span class="base-content">{{base.productSalesOrgName}}</span>
            </p>
            <p class="base-b">
                <span class="title">评估机构：</span>
                <span class="base-content">{{base.productEvaluationOrgName}}</span>
            </p>
            <p class="base-b">
                <span class="title">评级机构：</span>
                <span class="base-content">{{base.productRatingOrgName}}</span>
            </p>
            <p class="base-b">
                <span class="title">现金流预测机构：</span>
                <span class="base-content">{{base.productCashflowConsultingOrgName}}</span>
            </p>
            <p class="base-b">
                <span class="title">证券代码：</span>
                <span class="base-content">{{base.productMarketCode}}</span>
            </p>
            <p class="base-b">
                <span class="title">产品状态：</span>
                <span class="base-content">{{base.productState == '1' ? '已上市' : '未上市'}}</span>
            </p>
            <p class="base-b">
                <span class="title">产品类型：</span>
                <span class="base-content">{{base.productTypeName}}</span>
            </p>
            <div class="clear"></div>
            <el-table
              :data="publicList"
              class="floorBox"
              border
              style="width: 100%">
              <el-table-column
                prop="fundLevelType"
                label="分层"
                width="80">
              </el-table-column>
              <el-table-column
                prop="fundLevelCname"
                label="证券名称"
                width="160">
              </el-table-column>
              <el-table-column
                prop="fundLevelSku"
                label="证券代码">
              </el-table-column>
              <el-table-column
                prop="fundLevelRatio"
                label="比例">
              </el-table-column>
              <el-table-column
                prop="fundLevelResidualPrincipal"
                width="160"
                label="剩余本金面额(元)">
              </el-table-column>
              <el-table-column
                prop="fundLevelNetPrice"
                label="证券净价(元)"
                width="120">
              </el-table-column>
              <el-table-column
                prop="fundLevelTotalPrice"
                label="证券全价(元)"
                width="120">
              </el-table-column>
              <el-table-column
                prop="fundLevelForcastPayback"
                width="160"
                label="证券预期收益率(%)">
              </el-table-column>
              <el-table-column
                prop="fundLevelWeightingPeriod"
                label="加权年限"
                width="110">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="证券描述" name="证券描述">
          <div class="invest-des-box">
              <div class="left">
                  <section class="one">
                      <img class="info-big" :src="base.productLogo">
                      <div class="info-con" v-html="base.productDesc"></div>
                  </section>
              </div>
              <div class="right">
                  <a v-for="item in imgList" class="bench"
                      @click="showProductArcUrl(item.showImg)">
                      <img :src="item.imgUrl">
                      <div class="bg-black"></div>
                      <div class="title-box">{{item.name}}</div>
                  </a>
                  <a v-for="item in linkList" class="bench" target="_blank" 
                      :href="item.href">
                      <img :src="item.imgUrl">
                      <div class="bg-black"></div>
                      <div class="title-box">{{item.name}}</div>
                  </a>
              </div>
          </div>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="相关物业" name="相关物业">
          <template v-for="(item, index) in propertyList">
              <div class="line-sper" v-if="index"></div>
              
              <router-link class="asset-money" target="_blank"
                        :to="{name: 'info', params: {type: 'business', id: item.houseId}}">
                  <img class="cover-img" :src="item.housesInfo.housesImg">
                  <div class="right-content">
                      <div>物业名称：{{item.housesInfo.housesDesc}}</div>
                      <div>物业地址：{{item.housesInfo.housesAddr}}</div>
                      <div>基金占比：{{item.productHouseRate}}</div>
                  </div>
              </router-link>

              <el-table
                  :data="item.cashflowList"
                  class="cashBox"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="year"
                    label="年">
                  </el-table-column>
                  <el-table-column
                    prop="houseForcastCashflow"
                    label="预测现金流(万)">
                  </el-table-column>
                  <el-table-column
                    prop="houseGuaranteeCashflow"
                    label="保底现金流(万)">
                  </el-table-column>
                  <el-table-column
                    prop="houseRealCashflow"
                    label="真实现金流(万)">
                  </el-table-column>
                  <el-table-column
                    prop="fundPriorityLevelPayback"
                    label="优先级回报(万)">
                  </el-table-column>
                  <el-table-column
                    prop="fundMiddleLevelPayback"
                    label="夹层回报(万)">
                  </el-table-column>
                  <el-table-column
                    prop="fundLastLevelPayback"
                    label="劣后回报(万)">
                  </el-table-column>
              </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog class="product-url-box" title="证券结构图" :visible.sync="dialogFormVisible">
          <img class="big-img-box" :src="nowImg">
    </el-dialog>
  </section>
</template>
<script>
import bannerSecurity from '../../components/views/banner-security.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      activeName: '基本信息',
      base: {
          id: '',
          productCame: '',
          productPublishOrgName: '',
          productIpoSiteName: '',
          productPublishTime: '',
          productMarketCode: '',
          productState: '',
          productInfoLink: '',
          productLogo: '',
          productDesc: '',
          productTypeName: '',
          productHouseRate: [],
          productEndTime: '',
          productQuotation: '',
          productSalesOrgName: '',
          productEvaluationOrgName: '',
          productRatingOrgName: '',
          productCashflowConsultingOrgName: '',
          productArcUrl: ''
      },
      publicList: [
        {
          id: '',
          fundLevelType: '优先级',
          fundLevelCname: '',
          fundLevelSku: '',
          fundLevelRatio: '',
          financeProductCode: '',
          fundLevelResidualPrincipal: '',
          fundLevelNetPrice: '',
          fundLevelTotalPrice: '',
          fundLevelForcastPayback: '',
          fundLevelWeightingPeriod: ''
        },
        {
          id: '',
          fundLevelType: '夹层',
          fundLevelCname: '',
          fundLevelSku: '',
          fundLevelRatio: '',
          financeProductCode: '',
          fundLevelResidualPrincipal: '',
          fundLevelNetPrice: '',
          fundLevelTotalPrice: '',
          fundLevelForcastPayback: '',
          fundLevelWeightingPeriod: ''
        },
        {
          id: '',
          fundLevelType: '劣后级',
          fundLevelCname: '',
          fundLevelSku: '',
          fundLevelRatio: '',
          financeProductCode: '',
          fundLevelResidualPrincipal: '',
          fundLevelNetPrice: '',
          fundLevelTotalPrice: '',
          fundLevelForcastPayback: '',
          fundLevelWeightingPeriod: ''
        }
      ],
      propertyList: [],
      bannerList: [],
      dialogFormVisible: false,
      nowImg: '',
      imgList: [
        {
          id: 0,
          imgUrl: '/static/images/jg-img.jpg',
          showImg: '',
          name: '证券结构图'
        }
      ],
      linkList: [
        {
          id: 0,
          imgUrl: '/static/images/zq-img.jpg',
          href: '',
          name: '产品链接'
        }
      ]
    }
  },
  mounted () {
    document.title = '证券详情'
    this.getBase()
    this.getCashflow()
  },
  methods: {
    getBase () {
      let formData = {
        productCode: this.$route.params.id
      }

      Tools.getJson('findByProductInfo', formData, (res) => {
        if (res.success == '1') {
          var result = res.result
          if (result.productPublishTime) {
            result.productPublishTime = result.productPublishTime.split(' ')[0]
          }

          if (result.productEndTime) {
            result.productEndTime = result.productEndTime.split(' ')[0]
          }

          this.imgList[0].showImg = result.productArcUrl
          this.linkList[0].href = result.productInfoLink

          this.base = result

          setTimeout(() => {
            this.getDetail()
          }, 0)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showProductArcUrl (imgUrl) {
      this.nowImg = imgUrl
      if (!imgUrl) {
        this.$message({
            message: '暂无证券结构图！',
            type: 'warning'
        })
        return false
      }
      this.dialogFormVisible = true
    },
    getDetail () {
      let formData = {
        financeProductCode: this.$route.params.id
      }

      Tools.getJson('findDetail', formData, (res) => {
        if (res.success == '1') {
          var arr = this.publicList.concat([])
          res.result.forEach((item) => {
              if (item.fundLevelType == 'fund_level_1') {
                  item.fundLevelType = '优先级'
                  arr[0] = Object.assign(arr[0], item)
              } else if (item.fundLevelType == 'fund_level_2') {
                  item.fundLevelType = '夹层'
                  arr[1] = Object.assign(arr[1], item)
              } else if (item.fundLevelType == 'fund_level_3') {
                  item.fundLevelType = '劣后级'
                  arr[2] = Object.assign(arr[2], item)
              }
          })

          this.publicList = arr
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getCashflow () {
      let formData = {
        productCode: this.$route.params.id
      }

      Tools.getJson('fundCashflow', formData, (res) => {
        if (res.success == '1') {
          res.result.forEach((item) => {
            if (item.housesInfo && item.housesInfo.housesImg) {
              this.bannerList.push(item.housesInfo.housesImg)
            }
          })

          setTimeout(() => {
            this.$refs.bannerBox.setData()
          }, 0)

          this.propertyList = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  components: {
    bannerSecurity
  }
}
</script>
<style lang="scss">
.product-url-box {
  .el-dialog--small {
    top: 10% !important;
    width: 600px;
    
    .big-img-box {
      width: 100%;
      min-height: 300px;

      div {
        font-size: 20px;
        line-height: 300px;
        text-align: center;
        color: #999999;
        font-weight: bold;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }
}

.security-detail-con {
  .card-outer {
    margin-bottom: 50px;
  }

  .line-sper {
      border-top: 1px solid #99A9BF;
      margin: 20px 0;
  }

  .big-img {
    display: block;
    max-width: 100%;
    margin-top: 20px;
  }

  .cashBox {
      margin-top: 20px;
  }

  .floorBox {
      margin-top: 10px;
  }

  .clear {
    clear: both;
  }

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

  .asset-money {
        display: flex;

        .cover-img {
            width: 200px;
            height: 120px;
        }

        .right-content {
            flex: 1;
            margin-left: 15px;

            div {
                height: 40px;
                font-size: 14px;
                color: #1f2d3d;
                line-height: 40px;

                .list-input {
                    display: inline-block;
                    width: 205px;

                    input {
                        height: 30px;
                    }
                }
            }
        }
    }

  .mid-box {
    position: relative;
    width: 1160px;
    margin: 10px auto;
    min-height: 360px;
  }

  .out-box {
    padding: 10px 0 50px;
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
            padding: 8px 0;
            width: 230px;
            font-size: 16px;
            line-height: 24px;
            color: #000000;

            img {
              display: block;
              width: 600px;
            }
        }
    }

    .base-big {
        width: 1100px;

        .base-content {
            width: 970px;
        }
    }
  }

  .list-card {
    display: block;
    padding-bottom: 15px;
    margin-top: 15px;
    overflow: hidden;
    border-bottom: 1px solid #EFF2F7;

    .img-left {
      width: 200px;
      height: 130px;
      float: left;
    }

    .con-right {
      width: 940px;
      float: right;
      height: 130px;


      .title-name {
        display: block;
        color: #000000;
        font-size: 18px;
        margin-bottom: 15px;
      }

      .address {
        display: block;
        color: #000000;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;
      }

      .changes {
        display: block;
        color: #000000;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;
      }
    }

    .dis-right {
      width: 887px;
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
