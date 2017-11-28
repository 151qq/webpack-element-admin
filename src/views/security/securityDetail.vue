<template>
  <section class="security-detail-con">
    <banner-invest :base="base"></banner-invest>

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
                <span class="base-content">{{base.productPublishOrg}}</span>
            </p>
            <p class="base-b">
                <span class="title">上市地点：</span>
                <span class="base-content">{{base.productIpoSite}}</span>
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
                <span class="base-content">{{base.productSalesOrg}}</span>
            </p>
            <p class="base-b">
                <span class="title">评估机构：</span>
                <span class="base-content">{{base.productEvaluationOrg}}</span>
            </p>
            <p class="base-b">
                <span class="title">评级机构：</span>
                <span class="base-content">{{base.productRatingOrg}}</span>
            </p>
            <p class="base-b">
                <span class="title">现金流预测机构：</span>
                <span class="base-content">{{base.productCashflowConsultingOrg}}</span>
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
                <span class="base-content">{{base.productType}}</span>
            </p>
            <p class="base-b">
                <span class="title">产品链接：</span>
                <span class="base-content">{{base.productInfoLink}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">兑付和收益：</span>
                <span class="base-content">
                  <el-table
                    :data="publicList"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="layered"
                      label="分层"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="proportion"
                      label="比例"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="securitiesCode"
                      label="证券代码">
                    </el-table-column>
                    <el-table-column
                      prop="residualPrincipal"
                      label="剩余本金面额(元)">
                    </el-table-column>
                    <el-table-column
                      prop="stockPrice"
                      label="证券净价(元)"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="stockFullPrice"
                      label="证券全价(元)"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="stockExpectedYield"
                      label="证券预期收益率">
                    </el-table-column>
                    <el-table-column
                      prop="weightedLife"
                      label="加权年限"
                      width="120">
                    </el-table-column>
                  </el-table>
                </span>
            </p>
            <p class="base-b base-big">
                <span class="title">基金结构：</span>
                <span class="base-content">
                  <img :src="base.productArcUrl">
                </span>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="所持物业" name="所持物业">
          <template v-for="(item, index) in propertyList">
              <div class="line-sper" v-if="index"></div>

              <router-link class="asset-money"
                          :to="{name: 'info', params: {type: 'business', id: item.id}}">
                  <img class="cover-img" :src="item.imgUrl">
                  <div class="right-content">
                      <div>物业名称：{{item.name}}</div>
                      <div>物业地址：{{item.address}}</div>
                      <div>基金占比：{{item.changes}}</div>
                  </div>
              </router-link>

              <div class="money-box" v-if="propertyList.length">
                  <section class="label-box">
                      <div class="cell-box title-box">&nbsp;</div>
                      <div class="cell-box">预测现金流</div>
                      <div class="cell-box">保底现金流</div>
                      <div class="cell-box">真实现金流</div>
                      <div class="cell-box">优先级</div>
                      <div class="cell-box">夹层</div>
                      <div class="cell-box">劣后</div>
                  </section>
                  <section class="value-box" v-for="(item, index) in propertyList">
                      <div class="cell-box title-box">{{item.name}}</div>
                      <div class="cell-box">
                          {{item.name}}
                      </div>
                      <div class="cell-box">
                          {{item.name}}
                      </div>
                      <div class="cell-box">
                          {{item.name}}
                      </div>
                      <div class="cell-box">
                          {{item.name}}
                      </div>
                      <div class="cell-box">
                          {{item.name}}
                      </div>
                      <div class="cell-box">
                          {{item.name}}
                      </div>
                  </section>
              </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import bannerInvest from '../../components/views/banner-invest.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      activeName: '基本信息',
      base: {
          id: '',
          productCame: '',
          productPublishOrg: '',
          productIpoSite: '',
          productPublishTime: '',
          productMarketCode: '',
          productState: '',
          productInfoLink: '',
          productLogo: '',
          productDesc: '',
          productType: '',
          productHouseRate: [],
          productEndTime: '',
          productQuotation: '',
          productSalesOrg: '',
          productEvaluationOrg: '',
          productRatingOrg: '',
          productCashflowConsultingOrg: '',
          productArcUrl: '/static/images/bench1.png'
      },
      publicList : [
        {
          id: 0,
          layered: '优先级',
          proportion: '0.12',
          securitiesCode: '2342342',
          residualPrincipal: 22,
          stockPrice: 33,
          stockFullPrice: 55,
          stockExpectedYield: 1,
          weightedLife: 2017
        },
        {
          id: 1,
          layered: '夹层',
          proportion: '0.12',
          securitiesCode: '2342342',
          residualPrincipal: 22,
          stockPrice: 33,
          stockFullPrice: 55,
          stockExpectedYield: 1,
          weightedLife: 2017
        },
        {
          id: 2,
          layered: '劣后级',
          proportion: '0.12',
          securitiesCode: '2342342',
          residualPrincipal: 22,
          stockPrice: 33,
          stockFullPrice: 55,
          stockExpectedYield: 1,
          weightedLife: 2017
        }
      ],
      propertyList: [
        {
          id: 0,
          imgUrl: '/static/images/bench1.png',
          name: '第一物业',
          address: '北京市朝阳区soho大厦',
          changes: '2017-09-09 甲方 -> 乙方（10万元），2017-09-09 甲方 -> 乙方（10万元）'
        },
        {
          id: 1,
          imgUrl: '/static/images/bench1.png',
          name: '第一物业',
          address: '北京市朝阳区soho大厦',
          changes: '2017-09-09 甲方 -> 乙方（10万元），2017-09-09 甲方 -> 乙方（10万元）'
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
    }
  },
  components: {
    bannerInvest
  }
}
</script>
<style lang="scss" scoped>
.security-detail-con {
  .card-outer {
    margin-bottom: 50px;
  }

  .line-sper {
      border-top: 1px solid #99A9BF;
      margin: 20px 0;
  }

  .asset-money {
        display: flex;

        .cover-img {
            width: 200px;
            height: 160px;
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

    .money-box {
      display: flex;
      border: 1px solid #dfe6ec;
      border-bottom: none;
      border-right: none;
      margin-top: 20px;

      section {
          .title-box {
              text-align: center;
              background: #eef1f6;
              font-weight: bold;
          }

          .cell-box {
              font-size: 14px;
              color: #1f2d3d;
              padding: 5px 18px;
              line-height: 30px;
              border-right: 1px solid #dfe6ec;
              border-bottom: 1px solid #dfe6ec;

              .el-input__inner {
                  height: 30px;
              }
          }
      }

      .value-box {
          flex: 1;
      }

      .label-box {
          width: 120px;
      }
  }

  .mid-box {
    position: relative;
    width: 1160px;
    margin: 10px auto;
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
