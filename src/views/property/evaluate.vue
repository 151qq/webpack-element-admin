<template>
  <div class="eval-b">
    <banner-evalute></banner-evalute>
    
    <div class="mid-box">
      <button class="pric-btn">RMB {{ price }} 元</button>

      <section class="ewm-box">
        <a>
            <img class="img-t" src="../../assets/images/eva-b1.png">
            <img class="ewm" src="../../assets/images/ewm.png">
            <span class="title">瑞信投资物业投资报告定制服务</span>
            <span class="money">5000~10,000 元</span>
        </a>

        <a>
            <img class="img-t" src="../../assets/images/eva-b2.png">
            <img class="ewm" src="../../assets/images/ewm.png">
            <span class="title">瑞信投资物业投资报告定制服务</span>
            <span class="money">5000~10,000 元</span>
        </a>

        <a>
            <img class="img-t" src="../../assets/images/eva-b3.png">
            <img class="ewm" src="../../assets/images/ewm.png">
            <span class="title">瑞信投资物业投资报告定制服务</span>
            <span class="money">5000~10,000 元</span>
        </a>

        <a>
            <img class="img-t" src="../../assets/images/eva-b3.png">
            <img class="ewm" src="../../assets/images/ewm.png">
            <span class="title">瑞信投资物业投资报告定制服务</span>
            <span class="money">5000~10,000 元</span>
        </a>
      </section>
    </div>
  </div>
</template>
<script>
import bannerEvalute from '../../components/views/banner-evalute.vue'

export default {
  data () {
    return {
      price: '2000'
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