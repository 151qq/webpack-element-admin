<template>
  <div>

    <ul class="data-list">
      <li v-for="item in dataList">
        <p class="title">
          <span v-text="item.topic_name"></span>
        </p>
        <p class="time">
          <span v-text="item.question_count"></span>个问题,
          <span v-text="item.article_count"></span>个分享
        </p>
      </li>
    </ul>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-size="pagination.page_num"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total_num">
    </el-pagination>
  </div>
</template>
<script>
  import ywk from '../../utils/ywk.js'
  export default {
    props: {
      uid: String
    },
    data () {
      return {
        dataList: [],
        loading: true,
        query: {
          page: '1'
        },
        pagination: {
          page: 1,
          page_num: 50,
          total_num: 0,
          total_page: 1
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      // 获得数据
      getData () {
        ywk.getJson(`/api/member/topic/${this.uid}`, this.query, (res) => {
          if (res.error_code === 0) {
            this.dataList = res.data.topics
            this.pagination = res.data.pagination
            console.log('话题', JSON.stringify(res.data))
          }
        })
      },
      // 切换分页
      handleCurrentChange (val) {
        this.query.page = val
        this.getData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .data-list {
    margin: 40px 30px;
    margin-top: 0;
    li {
      border-bottom: 1px solid #efefef;
      padding: 10px 0px
    }
    .title {
      color: #3b9aff;
      font-size: 16px;
    }
    .time {
      font-size: 14px;
      color: #666;
    }
  }
</style>
