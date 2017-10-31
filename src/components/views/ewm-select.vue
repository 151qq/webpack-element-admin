<template>
    <el-dialog class="reset-w" title="企业订阅" v-model="dialogFormVisible.visibleE">

        <section v-if="reports.length" class="ewm-box">
            <a v-for="item in reports">
                <img class="img-t" :src="item.productLogoUrl">
                <img class="ewm" :src="item.productQrcode">
                <span class="title">{{item.enterpriseCname}}</span>
                <span class="money">{{item.productPrice}}</span>
            </a>
        </section>

        <section v-else class="no-data">
          暂无企业提供该类报告
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
        productCode: this.reportType
      }
      Tools.getJson('reportStatic', formData, (res) => {
        if (res.success === '1') {
          this.reports = res.result
        } else {
          this.$message.error(res.message)
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

.no-data {
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 36px;
  color: #999999;
}

.ewm-box {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow: auto;

  a {
    display: block;
    width: 270px;
    margin-right: 15px;
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
