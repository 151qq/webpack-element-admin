<template>
  <section class="info-con">
    <banner-info></banner-info>

    <div class="mid-box">
      <router-link class="eval-btn" target="_blank" :to="{name: 'evaluate', params: { type: type }}">
        <img src="../../assets/images/eval-icon.png">
        自评估工具
      </router-link>
      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane class="card-outer" label="基本信息" name="基本信息">
          <base-content :base="base"></base-content>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="楼盘评述" name="楼盘评述">
          <base-evalute :evaluate="evaluate"></base-evalute>
        </el-tab-pane>
        <el-tab-pane class="card-outer" label="楼盘照片" name="楼盘照片">
          <base-img :imgs="imgs" :big-imgs="bigImgs"></base-img>
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
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      activeName: '基本信息',
      base: {},
      evaluate: {},
      imgs: [],
      bigImgs: [],
      type: ''
    }
  },
  created () {
    this.type = this.$route.params.type
    this.getDatas()
  },
  methods: {
    getDatas () {
      let formData = {
        type: this.type,
        id: this.$route.params.id
      }

      Tools.getJson('info', formData, (res) => {
        if (res.statusCode === 0) {
          this.base = res.datas.base
          this.evaluate = res.datas.evaluate
          this.imgs = res.datas.imgs
          this.bigImgs = res.datas.bigImgs
        } else {
          this.$message.error(res.mess)
        }
      })
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
}

</style>