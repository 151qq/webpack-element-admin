<template>
  <div class="record-box">
    <section class="peoples-box">
      <div class="people-box" v-for="item in follows">
        <img :src="item.avatar">
        <span v-text="item.user"></span>
      </div>
    </section>

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
        follows: [],
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
        ywk.getJson(`/api/member/follow/${this.uid}`, this.query, (res) => {
          if (res.error_code === 0) {
            this.follows = res.data.follows
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
  .record-box {
    padding: 0 20px;
  }

  .peoples-box {
    overflow: hidden;
  }

  .people-box {
    float: left;
    width: 180px;
    height: 200px;
    margin: 0 10px 20px;
    border: 1px solid #CAC9C9;
    border-radius: 5px;

    img {
      display: block;
      margin: 40px auto 20px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }

    span {
      display: block;
      margin: 0 auto;
      width: 160px;
      text-align: center;
      font-size: 16px;
      color: 666666;
      font-weight: bold;
    }
  }
</style>
