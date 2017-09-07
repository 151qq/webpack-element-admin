<template>
  <div class="banner-box">
    <img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
      <div class="left">
        <ul>
          <li>
            <span>购入资本化率：</span>
            <input type="text">
          </li>
          <li>
            <span>退出资本化率：</span>
            <input type="text">
          </li>
          <li>
            <span>办公租金增长率 (y1-y3)：</span>
            <input type="text">
          </li>
          <li>
            <span>办公租金增长率 (y4-y10)：</span>
            <input type="text">
          </li>
          <li>
            <span>工业租金增长率 (y1-y10)：</span>
            <input type="text">
          </li>
          <li>
            <span>营业税率：</span>
            <input type="text">
          </li>
          <li>
            <span>房产税率：</span>
            <input type="text">
          </li>
          <li>
            <span>企业所得税率：</span>
            <input type="text">
          </li>
          <li>
            <span>物业费率：</span>
            <input type="text">
          </li>
          <li>
            <span>净收入率（净收入/租金）：</span>
            <input type="text">
          </li>
        </ul>
      </div>
      <div class="right">
        <echarts-tar :id-name="'echar3'"></echarts-tar>
      </div>
    </section>
  </div>
</template>
<script>
import echartsTar from '../common/echart-tar.vue'

export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {
    echartsTar
  }
}
</script>
<style lang="scss" scoped>
  .banner-box {
    position: relative;
    width: 100%;
    height: 450px;

    .img-box {
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -50%;
      display: block;
      width: 1440px;
      height: 450px;
    }

    .banner-f {
      position: absolute;
      width: 1160px;
      height: 370px;
      left: 50%;
      top: 50%;
      margin: -185px 0 0 -580px;
      overflow: hidden;
      background: #ffffff;

      .left {
        float: left;
        width: 360px;
        height: 370px;

        ul {
          padding: 0 27px;
          margin: 27px 0;
          border-right: 1px solid #EFF2F7;

          li {
            height: 22px;
            margin-bottom: 10px;

            span {
              float: left;
              width: 173px;
              font-size: 14px;
              color: #1F2D3D;
              line-heigt: 22px;
            }

            input {
              float: right;
              width: 124px;
              height: 22px;
              border: 1px solid #C0CCDA;
              border-radius: 4px;
              font-size: 13px;
              line-height: 22px;
              color: #5E6D82;
              box-sizing: border-box;
              padding: 0 10px;
            }
          }
        }
      }

      .right {
        float: right;
      }
    }
  }
</style>