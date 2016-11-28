<template>
<div>
  <nav-bar title="会员管理" label="" :crumbs="navBarData"></nav-bar>
  <div class="member-contont">
    <el-form label-width="88px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="昵称:">
              <el-input placeholder="请输入昵称" v-model="member.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
         <el-form-item label="注册时间 :">
           <el-col :span = "11">
             <el-date-picker type="date" placeholder="选择日期" v-model="member.beg_time" style="width: 100%;">
             </el-date-picker>
           </el-col>
           <el-col :span="2" class="line">-</el-col>
           <el-col :span = "11">
             <el-date-picker type="date" placeholder="选择日期" v-model="member.end_time" style="width: 100%;">
             </el-date-picker>
           </el-col>
         </el-form-item>
       </el-col>
        <el-col :span="6">
          <el-form-item label="手机号:">
              <el-input placeholder="请输入手机号" v-model="member.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" icon="search" @click.native="memberSearch">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="data.members" border stripe class="topDistance" width="100%" :height="winHeight">
      <el-table-column property="uuid" label="UUID" width="160px" fixed></el-table-column>
      <el-table-column property="nickname" label="昵称" width="160px"></el-table-column>
      <el-table-column property="create_at" label="注册时间"></el-table-column>
      <el-table-column property="prestige" label="威望值" width="120px"></el-table-column>
      <el-table-column property="contribution" label="贡献值"></el-table-column>
      <el-table-column property="follows_count" label="关注话题数" width="160px"></el-table-column>
      <el-table-column property="questions_count" label="提问数"></el-table-column>
      <el-table-column property="articles_count" label="干货数"></el-table-column>

      <el-table-column inline-template label="操作" width="120px" fixed="right">
        <el-button-group>
        <router-link :to="{name:'member-detail',params: {id: row.id}}">
          <i class="el-icon-document handleOne" title="查看详情"></i>
        </router-link>
        <a @click="showDel(row.id)" class="handleThree" title="删除账号">
          <i class="el-icon-delete2"></i>
        </a>
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
          data: {},
          navBarData: [
            {path: '/', name: '首页'}
          ],
          pagination: {
            page: 1,
            page_num: 50,
            total_num: 0,
            total_page: 1
          },
          id: '',           // 重置密码ID
          member: {
            page: 1,
            nickname: '',
            phone: '',
            uuid: '',
            beg_time: '',
            end_time: ''
          },
          winHeight: 500
        }
      },
      mounted () {
        this.getMemberList()
        this.winHeight = $(window).height() - 320
      },
      methods: {
        // 获取全部会员
        getMemberList () {
          ywk.getJson('/api/member', {}, (res) => {
            if (res.error_code === 0) {
              this.data = res.data
              this.pagination = res.data.pagination
            }
          })
        },
        // 查询
        memberSearch () {
          if (this.member.beg_time) {
            this.member.beg_time = ywk.formatDate(this.member.beg_time, 'yyyy-MM-dd')
          }
          if (this.member.end_time) {
            this.member.end_time = ywk.formatDate(this.member.end_time, 'yyyy-MM-dd')
          }
          ywk.getJson('/api/member/search', this.member, (res) => {
            if (res.error_code === 0) {
              this.data = res.data
              this.pagination = res.data.pagination
            }
          })
        },
        // 切换分页
        handleCurrentChange (val) {
          this.member.page = val
          this.memberSearch()
        },
        // 删除账号
        showDel (val) {
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            type: 'warning'
          }).then(data => {
            ywk.postJson(`/api/member/remove/${val}`, {}, (res) => {
              if (res.error_code === 0) {
                // 更新行数据
                let idx = _.findIndex(this.data.members, {id: val})
                this.data.members.splice(idx, 1)
                this.pagination.total_num -= 1
                this.$notify({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                this.$notify.error({
                  type: 'info',
                  message: res.msg
                })
              }
            })
          }).catch(() => {})
        }
      },
      components: {
        navBar
      }
    }
  </script>
