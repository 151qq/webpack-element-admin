<template>
  <section class="invest-list-box">
    <div class="search-select-box">
      <search-invest></search-invest>
    </div>
    <el-row class="el-box">
      <el-col
          :class="index % 4 == 0 ? 'card-b clearM' : 'card-b'"
          :span="6"
          v-for="(o, index) in investList">
        <router-link class="linkA" target="_blank"
                    :to="{ name: 'invest-detail', params: { id: o.enterpriseCode }}">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.enterpriseLogoUrl" class="image">
            <div style="padding: 14px;">
              <span>{{ o.enterpriseNameReg }}</span>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
    <el-pagination
      v-if="total > pageSize"
      layout="prev, pager, next"
      @current-change="pageChange"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </section>
</template>
<script>
import Tools from '../../utils/tools.js'
import searchInvest from '../../components/common/search-invest.vue'

export default {
  data () {
    return {
      investList : [],
      pageSize: 12,
      pageNumber: 1,
      total: 0
    }
  },
  created () {
    document.title = '投资机构'
    this.getInvestList()
  },
  methods: {
    getInvestList () {
      var formData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }

      Tools.getJson('getInvestList', formData, (res) => {
        if (res.success === '1') {
          this.investList = res.result
          this.total = Number(res.total)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    pageChange (size) {
      this.pageNumber = size
      this.getInvestList()
    }
  },
  components: {
    searchInvest
  }
}
</script>
<style lang="scss">
.invest-list-box {
  width: 1160px;
  margin: 30px auto;

  .search-select-box {
    text-align: center;
  }

  .el-box {
    margin-top: 30px;
  }

  .card-b {
    width: 269px;
    margin-left: 28px;
    margin-bottom: 20px;
  }

  .clearM {
    margin-left: 0;
  }

  .linkA {
    display: block;

    span {
      display: block;
      font-size: 16px;
      color: #000000;
      white-space:nowrap;
      text-overflow:ellipsis;
      -o-text-overflow:ellipsis;
      overflow:hidden;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 248px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
}
</style>
