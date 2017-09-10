<template>
    <el-dialog class="reset-w" title="选择" v-model="dialogFormVisible.visibleE">
        
        <section class="ewm-box">
            <a v-for="item in reports.slice(0, 3)">
                <img class="img-t" :src="item.imgUrl">
                <img class="ewm" :src="item.ewm">
                <span class="title">{{item.title}}</span>
                <span class="money">{{item.price}}</span>
            </a>
        </section>

        <div slot="footer" class="dialog-footer">
            <el-button @click="closeWindow">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Tools from '../../utils/tools.js'

export default {
  props: {
    dialogFormVisible: {
      type: Object,
      default: {}
    },
    reportType: String
  },
  data () {
    return {
      reports: []
    }
  },
  watch: {
    reportType () {
      this.getReports()
    }
  },
  methods: {
    closeWindow () {
      this.dialogFormVisible.visibleE = false
    },
    getReports () {
      let formData = {
        type: this.$route.params.type,
        id: this.reportType
      }
      Tools.getJson('reportStatic', formData, (res) => {
        if (res.statusCode === 0) {
          this.reports = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.reset-w {
  .el-dialog--small {
    width: 883px;
  }
}

.ewm-box {
  width: 110%;

  a {
    float: left;
    width: 270px;
    margin-right: 15px;
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
</style>