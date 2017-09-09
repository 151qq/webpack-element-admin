<template>
  <div class="eval-b">
    <banner-evalute :rates="rates" :price="price"></banner-evalute>
    
    <div class="mid-box">
      <button class="pric-btn">RMB {{ price.value }} 元</button>

      <section class="ewm-box">
        <a v-for="item in reports">
            <img class="img-t" :src="item.imgUrl">
            <img class="ewm" :src="item.ewm">
            <span class="title">{{item.title}}</span>
            <span class="money">{{item.price}}</span>
        </a>
      </section>
    </div>
  </div>
</template>
<script>
import bannerEvalute from '../../components/views/banner-evalute.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      price: {
        value: 0
      },
      rates: {},
      type: '',
      reports: []
    }
  },
  created () {
    this.type = this.$route.params.type
    this.getDatas()
    this.getReports()
  },
  methods: {
    getDatas () {
      let formData = {
        type: this.type,
        id: this.$route.params.id
      }

      Tools.getJson('rates', formData, (res) => {
        if (res.statusCode === 0) {
          this.rates = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    getReports () {
      let formData = {
        type: this.$route.params.type,
        reportType: this.reportType
      }
      Tools.getJson('reportStatic', formData, (res) => {
        if (res.statusCode === 0) {
          this.reports = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  },
  components: {
    bannerEvalute
  }
}
</script>
<style lang="scss" scoped>
.mid-box {
  position: relative;
  width: 1160px;
  margin: 0 auto 10px;

  .pric-btn {
    width: 100%;
    height: 60px;
    text-align: center;
    color: #ffffff;
    font-size: 24px;
    line-height: 60px;
    border-radius: 5px;
    background: #0053FF;
    margin: 40px 0;
    border: none;
  }

  .ewm-box {
    width: 110%;
    overflow: hidden;

    a {
      float: left;
      width: 270px;
      margin-right: 27px;
      margin-bottom: 25px;
      border: 1px solid #D3DCE6;
      border-radius: 3px;
      padding-bottom: 15px;

      .img-t {
        display: block;
        width: 270px;
        height: 160px;
      }

      .ewm {
        display: block;
        width: 90px;
        height: 90px;
        margin: -45px auto 0;
      }

      .title {
        display: block;
        font-size: 16px;
        line-height: 30px;
        margin-top: 4px;
        text-align: center;
        color: #1F2D3D;
      }

      .money {
        display: block;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color: #8492A6;
      }
    }
  }
}
</style>