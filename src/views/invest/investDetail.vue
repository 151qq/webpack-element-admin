<template>
  <section class="invest-detail-con">
    <banner-invest :base="base"></banner-invest>

    <div class="mid-box">
      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane class="card-outer" label="基本信息" name="基本信息">
          <div class="out-box">
            <p class="base-b big-b">
                <span class="title">投资机构名称：</span>
                <span class="base-content">{{base.name}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">投资机构法人：</span>
                <span class="base-content">{{base.holder}}</span>
            </p>
            <p class="base-b big-b">
                <span class="title">注册地址：</span>
                <span class="base-content">{{base.address}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">官方网站：</span>
                <span class="base-content">{{base.webSite}}</span>
            </p>
            <p class="base-b">
                <span class="title">成立时间：</span>
                <span class="base-content">{{base.createDate}}</span>
            </p>
            <p class="base-b">
                <span class="title">是否上市：</span>
                <span class="base-content">{{base.isList ? '是' : '否'}}</span>
            </p>
            <p class="base-b">
                <span class="title">上市地点：</span>
                <span class="base-content">{{base.listCity}}</span>
            </p>
            <p class="base-b">
                <span class="title">股票代码：</span>
                <span class="base-content">{{base.sharesCode}}</span>
            </p>
          </div>

          <el-row class="el-box">
            <el-col
                :class="index % 4 == 0 ? 'card-b clearM' : 'card-b'"
                :span="6"
                v-for="(o, index) in publicList">
              <router-link class="linkA" target="_blank" :to="{ name: 'invest-detail', params: { id: o.id }}">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="o.imgUrl" class="image">
                  <div style="padding: 14px;">
                    <span>{{ o.title }}</span>
                  </div>
                </el-card>
              </router-link>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="所持物业" name="所持物业">
          <router-link class="list-card"
                        v-for="(item, index) in propertyList"
                        :to="{name: 'info', params: {type: 'business', id: item.id}}">
              <img class="img-left" :src="item.imgUrl">
              <div class="con-right">
                <span class="title-name">{{item.name}}</span>
                <span class="address">地址：{{item.address}}</span>
                <span class="changes">交易：{{item.changes}}</span>
              </div>
          </router-link>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="证券产品" name="证券产品">
          <a class="list-card"
                        v-for="(item, index) in securityList"
                        :href="item.href">
              <img class="img-left" :src="item.imgUrl">
              <div class="con-right">
                <div class="out-box list-in">
                  <p class="base-b mid-b">
                      <span class="title">产品名称：</span>
                      <span class="base-content">{{item.name}}</span>
                  </p>
                  <p class="base-b mid-b">
                      <span class="title">证券代码：</span>
                      <span class="base-content">{{item.code}}</span>
                  </p>
                  <p class="base-b mid-b">
                      <span class="title">相关物业：</span>
                      <span class="base-content">{{item.property}}</span>
                  </p>
                  <p class="base-b mid-b">
                      <span class="title">地址：</span>
                      <span class="base-content">{{item.address}}</span>
                  </p>
                  <p class="base-b big-b">
                      <span class="title">发行机构：</span>
                      <span class="base-content">{{item.publish}}</span>
                  </p>
                  <p class="base-b mid-b">
                      <span class="title">状态：</span>
                      <span class="base-content">{{item.isList ? '已上市' : '未上市'}}</span>
                  </p>
                  <p class="base-b mid-b">
                      <span class="title">最新市值：</span>
                      <span class="base-content">{{item.value}}万元</span>
                  </p>
                </div>
              </div>
          </a>
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
      activeName: '所持物业',
      base: {
        name: '什么什么机构',
        holder: '什么什么',
        address: '北京市朝阳区soho大厦',
        webSite: 'http://www.shenmeshenme.com',
        createDate: '2017-09-09',
        isList: 1,
        listCity: '伦敦交易所',
        sharesCode: '229873'
      },
      publicList : [
        {
          id: 0,
          imgUrl: '/static/images/ewm.png',
          title: '微信公众号'
        },
        {
          id: 1,
          imgUrl: '/static/images/ewm.png',
          title: 'twitter账号'
        },
        {
          id: 2,
          imgUrl: '/static/images/ewm.png',
          title: 'facebook账号'
        },
        {
          id: 3,
          imgUrl: '/static/images/ewm.png',
          title: '微博账号'
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
      ],
      securityList: [
        {
          id: 0,
          imgUrl: '/static/images/bench1.png',
          name: '第一证券',
          code: '2243433',
          property: '第一物业',
          address: '北京市朝阳区soho大厦',
          publish: '伦敦交易所',
          status: 1,
          value: 1223,
          href: 'www.baidu.com'
        },
        {
          id: 1,
          imgUrl: '/static/images/bench1.png',
          name: '第一证券',
          code: '2243433',
          property: '第一物业',
          address: '北京市朝阳区soho大厦',
          publish: '伦敦交易所',
          status: 1,
          value: 1223,
          href: 'www.baidu.com'
        },
      ]
    }
  },
  mounted () {
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
.invest-detail-con {
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
    padding: 20px 0 20px;
    overflow: hidden;
    border-top: 1px solid #EFF2F7;

    .base-b {
        float: left;
        width: 270px;
        margin-right: 20px;

        .title {
            float: left;
            width: 120px;
            font-size: 16px;
            line-height: 40px;
            color: #666666;
        }

        .base-content {
            float: right;
            width: 150px;
            font-size: 16px;
            line-height: 40px;
            color: #000000;
        }
    }

    .big-b {
        width: 740px;

        .base-content {
            width: 620px;
        }
    }

    .mid-b {
        width: 380px;

        .base-content {
            width: 260px;
        }
    }
  }

  .list-in {
    padding: 0;
    border: none;

    .base-b {
      margin-bottom: 10px;

      .title, .base-content {
        font-size: 14px;
        line-height: 24px;
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
