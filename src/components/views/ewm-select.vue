<template>
    <el-dialog class="reset-w" title="选择" v-model="dialogFormVisible.visibleE">
        
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
        </section>

        <div slot="footer" class="dialog-footer">
            <el-button @click="closeWindow">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Object,
      default: {}
    }
  },
  methods: {
    closeWindow () {
      this.dialogFormVisible.visibleE = false
    }
  }
}
</script>
<style lang="scss" scoped>
.reset-w {
  .el-dialog--small {
    width: 69%;
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