<template>
  <el-dialog title="微信分享" v-model="dialogVisible.value" size="tiny">
    <div class="ewm-out">
      <img :src="imgPath">
      <span>打开微信扫码分享</span>
    </div>
  </el-dialog>
</template>
<script>
import Tools from '../../utils/tools.js'

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
      this.getEwm()
    }, 0)
  },
  watch: {
    path () {
      this.getEwm()
    }
  },
  methods: {
    getEwm () {
      var formData = {
        path: this.path
      }

      Tools.getJson('getEwm', formData, (res) => {
        if (res.statusCode === 0) {
          this.imgPath = res.datas.imgUrl
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ewm-out {
    img {
      width: 44px;
      height: 44px;
      margin: 0 auto 10px;
    }

    span {
      display: block;
      text-align: center;
    }
  }
</style>
