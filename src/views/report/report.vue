<template>
  <div class="report-box">
    <section class="left">
      <div class="input-box">
        <el-input 
          placeholder="请输入需查询的报告标题"
          v-model="keyValue"
          style="width: 788px;"
          >
        </el-input>
        <el-button class="search-btn" type="primary" icon="search" @click="getAddres(keyValue)">
          搜索
        </el-button>
      </div>
      <div class="cards-box">
        <router-link class="card-b" :to="{ name: 'detail' }">
          <img class="i-t" src="../../assets/images/report1.png">
          <div class="card">
            <p class="title">标题标题标题</p>
            <p class="cont">
              佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。紧临东三环，交通方便。由两栋甲级写字楼、裙楼配套商业(现建为俱乐部)及大型地下停车库组成，为国际建筑师公司——巴马丹拿(P&T GROUP)的灵感代表之作。外墙采用高级反光玻璃幕墙配置铝板及石材的组合表现出建筑的现代感，汲取中国古代建筑美学之灵感，造就中西融汇的独特性格。佳程广场总体布局气势磅礴，双塔凌云耸立，以"掌开而合"的形态，表达对世界的拥抱。6000平方米入口广场上设有巨型水景园林，形成辉耀北京东区的新地标。
            </p>
            <p class="btns">
              <a>
                <img src="../../assets/images/download.png">
              </a>
              <a>
                <img src="../../assets/images/wx.png">
              </a>
              <a>
                <img src="../../assets/images/mail.png">
              </a>
              <a>
                <img src="../../assets/images/print.png">
              </a>
            </p>
          </div>
        </router-link>
        <router-link class="card-b" :to="{ name: 'detail' }">
          <img class="i-t" src="../../assets/images/report1.png">
          <div class="card">
            <p class="title">标题标题标题</p>
            <p class="cont">
              佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。紧临东三环，交通方便。由两栋甲级写字楼、裙楼配套商业(现建为俱乐部)及大型地下停车库组成，为国际建筑师公司——巴马丹拿(P&T GROUP)的灵感代表之作。外墙采用高级反光玻璃幕墙配置铝板及石材的组合表现出建筑的现代感，汲取中国古代建筑美学之灵感，造就中西融汇的独特性格。佳程广场总体布局气势磅礴，双塔凌云耸立，以"掌开而合"的形态，表达对世界的拥抱。6000平方米入口广场上设有巨型水景园林，形成辉耀北京东区的新地标。
            </p>
            <p class="btns">
              <a>
                <img src="../../assets/images/download.png">
              </a>
              <a>
                <img src="../../assets/images/wx.png">
              </a>
              <a>
                <img src="../../assets/images/mail.png">
              </a>
              <a>
                <img src="../../assets/images/print.png">
              </a>
            </p>
          </div>
        </router-link>
        <router-link class="card-b" :to="{ name: 'detail' }">
          <img class="i-t" src="../../assets/images/report1.png">
          <div class="card">
            <p class="title">标题标题标题</p>
            <p class="cont">
              佳程广场总占地面积17690平方米，总建筑面积141075平方米，楼体高度：103.8米。紧临东三环，交通方便。由两栋甲级写字楼、裙楼配套商业(现建为俱乐部)及大型地下停车库组成，为国际建筑师公司——巴马丹拿(P&T GROUP)的灵感代表之作。外墙采用高级反光玻璃幕墙配置铝板及石材的组合表现出建筑的现代感，汲取中国古代建筑美学之灵感，造就中西融汇的独特性格。佳程广场总体布局气势磅礴，双塔凌云耸立，以"掌开而合"的形态，表达对世界的拥抱。6000平方米入口广场上设有巨型水景园林，形成辉耀北京东区的新地标。
            </p>
            <p class="btns">
              <a>
                <img src="../../assets/images/download.png">
              </a>
              <a>
                <img src="../../assets/images/wx.png">
              </a>
              <a>
                <img src="../../assets/images/mail.png">
              </a>
              <a>
                <img src="../../assets/images/print.png">
              </a>
            </p>
          </div>
        </router-link>
      </div>

    </section>
    <section class="right">
        <a class="ding-y">我要订阅</a>
        <section class="two">
          <a @click="showModel">
              <img src="../../assets/images/eva-b1.png">
              <div>
                  物业投资报告
                  <span>
                      订阅
                  </span>
              </div>
          </a>
          <a @click="showModel">
              <img src="../../assets/images/eva-b2.png">
              <div>
                  物业资产管理报告
                  <span>
                      订阅
                  </span>
              </div>
          </a>
          <a @click="showModel">
              <img src="../../assets/images/eva-b3.png">
              <div>
                  物业退出报告
                  <span>
                      订阅
                  </span>
              </div>
          </a>
        </section>
    </section>

    <ewm-select :dialog-form-visible="dialogFormVisible"></ewm-select>
  </div>
</template>
<script>
import ewmSelect from '../../components/views/ewm-select.vue'

export default {
  data () {
    return {
      dialogFormVisible: {
        visibleE: false
      }
    }
  },
  methods: {
    showModel () {
      this.dialogFormVisible.visibleE = true
    }
  },
  components: {
    ewmSelect
  }
}
</script>
<style lang="scss" scoped>
.report-box {
  width: 1160px;
  margin: 20px auto;
  overflow: hidden;

  .input-box {
    display: block;
    width: 1160px;
    margin: 10px auto 20px;

    .el-input {
      display: inline-block;
    }

    .search-btn {
      position: relative;
      display: inline-block;
      margin-left: -10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .left {
    width: 868px;
    float: left;

    .cards-box {
      .card-b {
        display: block;
        overflow: hidden;
        padding-bottom: 30px;
        border-bottom: 1px solid #C0CCDA;
        margin-bottom: 30px;
        
        .i-t {
          float: left;
          width: 200px;
          height: 240px;
        }

        .card {
          float: right;
          width: 654px;

          .title {
            font-size: 20px;
            line-height: 30px;
            color: #000000;
          }

          .cont {
            font-size: 14px;
            line-height: 30px;
            color: #475669;
            height: 180px;
            overflow: hidden;
          }

          .btns {
            text-align: right;

            a {
              height: 16px;
              display: inline-block;
              padding-left: 10px;
              border-left: 1px solid #C0CCDA;
              margin-left: 10px;

              &:first-child {
                border: none;
              }

              img {
                position: relative;
                top: -2px;
                transition: all 0.3s;
                cursor: pointer;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }
        }
      }
    }
  }

  .right {
    float: right;
    width: 270px;
    overflow: hidden;

    .ding-y {
      display: block;
      font-size: 20px;
      line-height: 36px;
      color: #000000;
      margin: 10px 0 20px;
    }

    .two {
      width: 110%;
      overflow: hidden;

      a {
        display: block;
        width: 270px;
        border: 1px solid #D3DCE6;
        margin-bottom: 10px;
        border-radius: 3px;
        cursor: pointer;

        img {
          width: 270px;
          height: 150px;
        }

        div {
          padding: 0 14px;
          height: 50px;
          overflow: hidden;
          font-size: 16px;
          line-height: 50px;

          span {
              float: right;
              padding-left: 20px;
              background: url(../../assets/images/check-icon.png) left center no-repeat;
              font-size: 14px;
              line-height: 50px;
              color: #5E6D82;
          }
        }
      }
    }
  }
}
</style>