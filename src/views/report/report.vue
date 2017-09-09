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
        <el-button class="search-btn" type="primary" icon="search" @click="searchReport">
          搜索
        </el-button>
      </div>
      <div class="cards-box">
        <template v-for="item in reportList">
          <router-link class="card-b" :to="{ name: 'detail' ,params: {id: item.id}}">
            <img class="i-t" :src="item.imgUrl">
            <div class="card">
              <p class="title">{{item.title}}</p>
              <p class="cont">
                {{item.des}}
              </p>
            </div>
          </router-link>
          <p class="btns">
            <share :down-url="item.download" :file-name="item.fileName" :id-type="item.id"></share>
          </p>
        </template>
      </div>

    </section>
    <section class="right">
        <a class="ding-y">我要订阅</a>
        <section class="two">
          <a @click="showModel('join')">
              <img src="../../assets/images/eva-b1.png">
              <div>
                  物业投资报告
                  <span>
                      订阅
                  </span>
              </div>
          </a>
          <a @click="showModel('manage')">
              <img src="../../assets/images/eva-b2.png">
              <div>
                  物业资产管理报告
                  <span>
                      订阅
                  </span>
              </div>
          </a>
          <a @click="showModel('quit')">
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

    <ewm-select :dialog-form-visible="dialogFormVisible" :report-type="reportType"></ewm-select>
  </div>
</template>
<script>
import ewmSelect from '../../components/views/ewm-select.vue'
import share from '../../components/common/share.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      dialogFormVisible: {
        visibleE: false
      },
      reportList: [],
      reportType: '',
      keyValue: ''
    }
  },
  created () {
    this.getReports()
  },
  methods: {
    showModel (type) {
      this.reportType = type
      this.dialogFormVisible.visibleE = true
    },
    // 获取报告数据
    getReports () {
      Tools.getJson('reportList', {}, (res) => {
        if (res.statusCode === 0) {
          this.reportList = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    // 获取报告数据
    searchReport () {
      var formData = {
        key: this.keyValue
      }
      Tools.getJson('searchReport', formData, (res) => {
        if (res.statusCode === 0) {
          this.reportList = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    }
  },
  components: {
    ewmSelect,
    share
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
      .btns {
        text-align: right;
        position: relative;
        top: -70px;
      }

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