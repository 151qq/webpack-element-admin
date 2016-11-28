<template>
  <div class="record-box">
    <el-table :data="records" border stripe class="topDistance" width="100%" :height="winHeight">
      <el-table-column property="isincome" label="收/支"></el-table-column>
      <el-table-column property="order_type" label="类型"></el-table-column>
      <el-table-column property="amount" label="金额"></el-table-column>
      <el-table-column property="margin" label="余额"></el-table-column>
      <el-table-column property="create_at" label="交易日期"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-size="pagination.page_num"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total_num">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import ywk from '../../utils/ywk.js'
  export default {
    data () {
      return {
        pagination: {
          page: 1,
          page_num: 50,
          total_num: 0,
          total_page: 1
        },
        records: [],
        query: {
          page: 1
        }
      }
    },
    mounted () {
      this.getRecords()
    },
    props: {
      uid: String
    },
    methods: {
      getRecords () {
        ywk.getJson(`/api/member/account/${this.uid}`, this.query, (res) => {
          if (res.error_code === 0) {
            res.data.accounts.forEach((item) => {
              item.isincome = item.isincome ? '收款' : '付款'
            })
            this.records = res.data.accounts
            this.pagination = res.data.pagination
          }
        })
      },
      // 切换分页
      handleCurrentChange (val) {
        this.query.page = val
        this.getRecords()
      }
    }
  }
</script>
<style lang="scss">
  .block {
    margin-top: 20px;
  }

  .record-box {
    padding: 0 20px;
  }
</style>