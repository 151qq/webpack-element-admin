<template>
  <div class="report-box">
    <section class="left">
      <div class="input-box">
        <el-input
          placeholder="请输入需查询的报告标题"
          v-model="keyValue"
          style="width: 774px;"
          >
        </el-input>
        <el-button class="search-btn" type="primary" icon="search" @keyup.13="searchReport" @click="searchReport">
          搜索
        </el-button>
      </div>
      <div class="cards-box">
        <template v-for="item in reportList">
          <router-link class="card-b" :to="{ name: 'detail' ,params: {id: item.html5PageCode}}">
            <img class="i-t" :src="item.html5PageindexImg">
            <div class="card">
              <p class="title">{{item.html5PageTitle}}</p>
              <p class="cont">
                {{item.html5Summary}}
              </p>
            </div>
          </router-link>
          <p class="btns">
            <share
              :down-url="item.html5Path"
              :file-name="item.html5PageTitle"
              :ewm-img="item.html5Qrcode"
              :id-type="item.id"></share>
          </p>
        </template>

        <el-pagination
          v-if="total"
          layout="prev, pager, next"
          @current-change="pageChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>

    </section>
    <section class="right">
        <a class="ding-y">我要订阅</a>
        <section class="two">
          <a v-for="item in reports" @click="showModel(item.productCode)">
              <img :src="item.productLogoUrl">
              <div>
                  {{item.productCname}}
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
      keyValue: '',
      reports: '',
      total: 0,
      pageNumber: 1,
      pageSize: 10
    }
  },
  created () {
    this.getTypes()
    this.getReports()
  },
  methods: {
    showModel (id) {
      this.reportType = id
      this.dialogFormVisible.visibleE = true
    },
    getTypes () {
      Tools.getJson('reportProduct', {}, (res) => {
        if (res.success === '1') {
          this.reports = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    pageChange (size) {
      this.pageNumber = size
      this.getReports()
    },
    // 获取报告数据
    getReports () {
      var formData = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }

      Tools.getJson('reportList', formData, (res) => {
        if (res.success === '1') {
          this.reportList = res.result
          this.total = Number(res.total)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取报告数据
    searchReport () {
      if (this.keyValue == '') {
        this.getReports()
        return
      } else {
        this.total = 0
      }

      var formData = {
        key: this.keyValue
      }

      Tools.getJson('searchReport', formData, (res) => {
        if (res.success === '1') {
          this.reportList = res.result
        } else {
          this.$message.error(res.message)
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
<style lang="scss">
.report-box {
  width: 1160px;
  margin: 20px auto;
  overflow: hidden;

  .input-box {
    display: block;
    width: 1160px;
    height: 30px;
    margin: 10px auto 20px;

    .el-input {
      float: left;
      height: 30px;

      input {
        font-size: 12px;
        height: 30px;
      }
    }

    .search-btn {
      position: relative;
      float: left;
      margin-left: -10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 30px;
      font-size: 16px;
      padding: 0 23px;
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
      line-height: 30px;
      color: #000000;
      margin: 10px 0 13px;
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
