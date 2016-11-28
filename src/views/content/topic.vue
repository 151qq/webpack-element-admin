<template>
<div>
  <nav-bar title="话题管理" :crumbs="navBarData"></nav-bar>
  <div class="member-contont">
    <el-form label-width="75px">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="状态:">
            <el-select placeholder="全部" v-model="query.category">
              <el-option v-for="item in categorys" :value="item.id" :label="item.name" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例名称:" label-width="75px">
              <el-input placeholder="案例名称" v-model="query.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="search" @click.native="search()">搜索</el-button>
          <el-button type="primary" icon="plus" @click.native="addcase()">添加话题</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border stripe width="100%" :height="winHeight">
      <el-table-column property="name" label="话题名称"></el-table-column>
      <el-table-column property="category" label="所属分类"></el-table-column>
      <el-table-column property="follows_count" label="关注数"></el-table-column>
      <el-table-column property="questions_count" label="问答数"></el-table-column>
      <el-table-column property="articles_count" label="干货数"></el-table-column>
      <el-table-column property="description" label="描述"></el-table-column>
      <el-table-column inline-template label="操作" width="80px">
           <el-button-group>
              <i class="el-icon-edit handleTwo" title="编辑案例" @click="editcase(row)"></i>
              <i class="el-icon-close handleFour" title="删除案例" @click="closeFn(row.id)"></i>
              <a class="el-icon-document handleOne" :href="`${origin}/topic/${row.uuid}`" title="话题详情"></a>
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
    <el-dialog title="案例" v-model="dialogAdd" size="tiny">
      <el-form :rules="rules" ref="formData" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="话题名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="team">
              <el-select placeholder="全部" v-model="formData.category_id">
                <el-option v-for="item in categorys" :value="item.id" :label="item.name" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类图片">
              <preview-img ref="pic" :path="formData.pic"></preview-img>
            </el-form-item>
            <el-form-item label="项目描述" prop="desc">
              <el-input type="textarea" v-model="formData.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="closeDialog()">取 消</el-button>
        <el-button type="primary" @click.native="savecase()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
  <script>
    import navBar from '../../components/common/navBar.vue'
    import ywk from '../../utils/ywk.js'
    import $ from 'webpack-zepto'
    import _ from 'lodash'
    import previewImg from '../../components/common/preview-img.vue'

    export default {
      data () {
        return {
          navBarData: [
            {path: '/', name: '首页'},
            {path: '', name: '内容管理'},
            {path: '', name: '话题管理'}
          ],
          query: {
            page: '1',
            name: ''
          },
          pagination: {
            page: 1,
            page_num: 50,
            total_num: 0,
            total_page: 1
          },
          // 分类数据
          categorys: [],
          is_top: false,
          is_public: false,
          // 操作的数据id
          currentId: 0,
          // 是否显示添加备注模态窗口
          dialogAdd: false,
          winHeight: 500,
          tableData: [],
          loading: true,
          formData: {},
          initFormData: {
            'id': '',
            'pic': '',
            'desc': '',
            'category_id': 0,
            'name': ''
          },
          // 页面验证
          rules: {
            name: [
              { required: true, message: '该项为必填项', trigger: 'blur' }
            ]
          },
          origin: window._SettingOrigin
        }
      },
      created () {
        // 获取分类数据
        ywk.getJson('/api/content/category', {}, (res) => {
          if (res.error_code === 0) {
            this.categorys = res.data.categories
          }
        })
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
          ywk.getJson('/api/content/topic/search', this.query, (res) => {
            if (res.error_code === 0) {
              this.tableData = res.data.topics
              this.pagination = res.data.pagination
            }
          })
        },
        getCateId (name) {
          for (let i = 0, len = this.categorys.length; i < len; i++) {
            if (this.categorys[i].name === name) {
              return this.categorys[i].id
            }
          }
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
          this.$confirm('确定要删除该话题吗?', '提示', {
            type: 'warning'
          }).then(() => {
            ywk.postJson(`/api/content/topic/remove/${id}`, {}, (res) => {
              if (res.error_code === 0) {
                // 移除该行数据
                let idx = _.findIndex(this.tableData, {id: id})
                this.tableData.splice(idx, 1)
                this.pagination.total_num -= 1

                // 提示内容
                this.$notify({
                  title: '成功',
                  message: '恭喜你，删除话题成功！',
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

        // 关闭添加备注弹窗
        closeDialog () {
          this.dialogAdd = false
          this.$refs.formData.resetFields()
        },

        // 添加案例
        addcase () {
          this.formData = _.cloneDeep(this.initFormData)
          this.currentId = ''
          this.dialogAdd = true
        },

        // 编辑案例
        editcase (item) {
          this.getCaseDetail(item)
          this.dialogAdd = true
          this.currentId = item.id
        },

        // 获取案例详情
        getCaseDetail (item) {
          this.formData.pic = item.logo
          this.formData.name = item.name
          this.formData.desc = item.description
          this.formData.category_id = this.getCateId(item.category)
        },

        // 保存案例数据
        savecase () {
          this.$refs.formData.validate((valid) => {
            if (!valid) {
              return
            }

            let pic = this.$refs.pic.curFile
            let fdata = new window.FormData()
            fdata.append('pic', pic)
            fdata.append('name', this.formData.name)
            fdata.append('category_id', this.formData.category_id)
            fdata.append('desc', this.formData.desc)
            let url = this.currentId ? `/api/content/topic/update/${this.currentId}` : '/api/content/topic'

            ywk.postFile(url, fdata, (res) => {
              if (res.error_code === 0) {
                // 提示内容
                this.$notify({
                  title: '成功',
                  message: '恭喜你，保存成功！',
                  type: 'success'
                })
                this.closeDialog()
                this.getData()
              } else {
                this.$notify({
                  title: '错误提示',
                  message: res.msg,
                  type: 'error'
                })
              }
            })
          })
        },
        // 切换分页
        handleCurrentChange (val) {
          this.query.page = val
          this.getData()
        }
      },
      components: {
        navBar,
        previewImg
      }
    }
  </script>

