<template>
<div>
  <nav-bar title="评论管理" :crumbs="navBarData"></nav-bar>
  <div class="member-contont">
    <el-form label-width="75px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="评论内容:" label-width="75px">
              <el-input placeholder="评论内容" v-model="query.desc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="search" @click.native="search()">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border stripe width="100%" :height="winHeight">
      <el-table-column property="desc" label="评论内容"></el-table-column>
      <el-table-column property="user" label="评论人"></el-table-column>
      <el-table-column property="article" label="所属干货"></el-table-column>
      <el-table-column property="category" label="所属分类"></el-table-column>
      <el-table-column property="like_count" label="赞数"></el-table-column>
      <el-table-column inline-template label="操作" width="80px">
           <el-button-group>
              <i class="el-icon-close handleFour" title="删除评论" @click="closeFn(row.id)"></i>
              <a class="el-icon-document handleOne" :href="`${origin}/question/${row.uuid}`" title="评论详情"></a>
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
            {path: '', name: '内容管理'},
            {path: '', name: '评论管理'}
          ],
          query: {
            page: '1',
            desc: ''
          },
          pagination: {
            page: 1,
            page_num: 50,
            total_num: 0,
            total_page: 1
          },
          // 分类数据
          is_top: false,
          is_public: false,
          // 操作的数据id
          currentId: 0,
          // 是否显示添加备注模态窗口
          winHeight: 500,
          tableData: [],
          loading: true,
          origin: window._SettingOrigin
        }
      },
      mounted () {
        this.getData()
        this.winHeight = $(window).height() - 320
      },
      methods: {
        search () {
          this.query.page = 1
          this.getData()
        },
        getData () {
          ywk.getJson('/api/content/comment/search', this.query, (res) => {
            if (res.error_code === 0) {
              this.tableData = res.data.comments
              this.pagination = res.data.pagination
            }
          })
        },
        updateItem (id, obj) {
          let idx = _.findIndex(this.tableData, {id: id})
          let curItem = this.tableData[idx]
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              curItem[key] = obj[key]
            }
          }
          this.tableData.splice(idx, 1, curItem)
        },

        // 删除案例
        closeFn (id) {
          this.$confirm('确定要删除该评论吗?', '提示', {
            type: 'warning'
          }).then(() => {
            ywk.postJson(`/api/content/comment/remove/${id}`, {}, (res) => {
              if (res.error_code === 0) {
                // 移除该行数据
                let idx = _.findIndex(this.tableData, {id: id})
                this.tableData.splice(idx, 1)
                this.pagination.total_num -= 1

                // 提示内容
                this.$notify({
                  title: '成功',
                  message: '恭喜你，删除评论成功！',
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

