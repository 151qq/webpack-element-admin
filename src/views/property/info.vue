<template>
  <section class="info-con">
    <banner-info></banner-info>

    <div class="mid-box">
      <router-link class="eval-btn" :to="{name: 'evaluate'}">
        <img src="../../assets/images/eval-icon.png">
        自评估工具
      </router-link>
      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane class="card-outer" label="基本信息" name="基本信息">
          <base-content></base-content>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="楼盘评述" name="楼盘评述">
          <base-evalute></base-evalute>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="楼盘照片" name="楼盘照片">
          <base-img></base-img>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import bannerInfo from '../../components/views/banner-info.vue'
import baseContent from '../../components/views/base-content.vue'
import baseEvalute from '../../components/views/base-evalute.vue'
import baseImg from '../../components/views/base-img.vue'

export default {
  data () {
    return {
      activeName: '基本信息'
    }
  },
  components: {
    bannerInfo,
    baseContent,
    baseEvalute,
    baseImg
  }
}
</script>
<style lang="scss" scoped>
.info-con {
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
    background-color: #20a0ff;
    border-color: #20a0ff;
    border-radius: 3px;
    z-index: 120;
    text-align: center;

    img {
      float: left;
      margin: 9px 0 0 12px;
    }
  }
}

</style>