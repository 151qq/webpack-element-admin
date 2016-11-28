<template>
<div>
  <nav-bar title="待灌入文章列表" :crumbs="navBarData"></nav-bar>
  <div class="member-contont">
    <el-form label-width="75px">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="来源网站:">
              <el-input placeholder="请输入来源网站" v-model="query.site"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="标题:">
              <el-input placeholder="请输入标题" v-model="query.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="作者:">
              <el-input placeholder="请输入作者" v-model="query.author"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="截止日期:">
            <el-col :span = "11">
              <el-date-picker type="date" placeholder="选择日期" v-model="query.beg_time" style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col :span="2" class="line">-</el-col>
            <el-col :span = "11">
              <el-date-picker type="date" placeholder="选择日期" v-model="query.end_time" style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="search" @click.native="search()">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border stripe width="100%" :height="winHeight">
      <el-table-column property="title" label="标题" ></el-table-column>
      <el-table-column property="author" label="作者" ></el-table-column>
      <el-table-column property="site" label="来源网站"></el-table-column>
      <el-table-column property="publish_at" label="发布时间"></el-table-column>
      <el-table-column inline-template label="操作" width="80px">
           <el-button-group>
              <!-- <i class="el-icon-close handleFour" title="删除文章" @click="closeFn(row.id)"></i> -->
              <router-link :to="{name:'article-detail',params: {id: row.id}}">
                <i class="el-icon-edit handleTwo" title="编辑"></i>
              </router-link>
              <!-- <a class="el-icon-document handleOne" :href="`${origin}/article/${row.uuid}`" title="干货详情"></a> -->
           </el-button-group>
       </el-table-column>
    </el-table>
    <div class="block tablePage">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-size="pagination.page_num"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total_num">
      </el-pagination>
    </div>
  </div>
</div>
</template>
  <script>
    import navBar from '../../components/common/navBar.vue'
    import ywk from '../../utils/ywk.js'
    import $ from 'webpack-zepto'
    import _ from 'lodash'

    export default {
      data () {
        return {
          navBarData: [
            {path: '/', name: '首页'},
            {path: '/contract', name: '合同管理'}
          ],
          query: {
            page: '1',
            site: '',
            title: '',
            author: '',
            beg_time: '',
            end_time: ''
          },
          pagination: {
            page: 1,
            page_num: 50,
            total_num: 0,
            total_page: 1
          },
          winHeight: 500,
          tableData: [],
          loading: true,
          origin: window._SettingOrigin
        }
      },
      mounted () {
        this.getData()
        this.winHeight = $(window).height() - 370
      },
      methods: {
        search () {
          this.query.page = 1
          this.getData()
        },
        getData () {
          if (this.query.beg_time) {
            this.query.beg_time = ywk.formatDate(this.query.beg_time, 'yyyy-MM-dd')
          }
          if (this.query.end_time) {
            this.query.end_time = ywk.formatDate(this.query.end_time, 'yyyy-MM-dd')
          }
          ywk.getJson('/api/article/posts/search', this.query, (res) => {
            if (res.error_code === 0) {
              this.tableData = res.data.posts[0]
              this.pagination = res.data.pagination
            }
          })
        },

        // 删除文章
        closeFn (id) {
          this.$confirm('确定要删除该文章吗?', '提示', {
            type: 'warning'
          }).then(() => {
            ywk.postJson(`/api/article/posts/remove/${id}`, {}, (res) => {
              if (res.error_code === 0) {
                // 移除该行数据
                let idx = _.findIndex(this.tableData, {id: id})
                this.tableData.splice(idx, 1)
                this.pagination.total_num -= 1

                // 提示内容
                this.$notify({
                  title: '成功',
                  message: '恭喜你，删除文章成功！',
                  type: 'success'
                })
              } else {
                this.$notify.error({
                  title: '错误提示',
                  message: res.msg
                })
              }
            })
          }).catch(() => {})
        },

        // 切换分页
        handleCurrentChange (val) {
          this.query.page = val
          this.getData()
        }
      },
      components: {
        navBar
      }
    }
  </script>
