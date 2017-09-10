<template>
  <el-dialog title="微信分享" v-model="dialogVisible.value" size="tiny">
    <div class="ewm-out">
      <img :src="imgPath">
      <span>打开微信扫码分享</span>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Object,
      default: {}
    },
    path: String
  },
  data () {
    return {
      imgPath: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.imgPath = this.path
    }, 0)
  },
  watch: {
    path () {
      this.imgPath = this.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .ewm-out {
    img {
      display: block;
      width: 280px;
      height: 280px;
      margin: 0 auto 10px;
    }

    span {
      display: block;
      text-align: center;
    }
  }
</style>
