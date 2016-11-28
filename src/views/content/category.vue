<template>
<div>
  <nav-bar title="分类管理" :crumbs="navBarData"></nav-bar>
  <div class="member-contont">
    <!-- <div class="btn-box">
      <el-button type="primary" icon="plus" @click.native="dialogAdd = true">添加分类</el-button>
    </div> -->
    <el-table :data="tableData" border stripe width="100%" :height="winHeight">
      <el-table-column property="name" label="分类名称" ></el-table-column>
      <el-table-column property="topic_count" label="话题数"></el-table-column>
      <el-table-column property="question_count" label="问答数"></el-table-column>
      <el-table-column property="article_count" label="干货数"></el-table-column>
      <el-table-column property="sorted" label="排序值"></el-table-column>
      <!-- <el-table-column inline-template label="操作" width="60px">
         <el-button-group>
            <i class="el-icon-edit handleTwo" title="编辑分类" @click="editCategory(row)"></i>
            <i class="el-icon-close handleFour" title="删除分类" @click="closeFn(row.id)"></i>
         </el-button-group>
     </el-table-column> -->
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
    <el-dialog title="内容分类" v-model="dialogAdd" size="tiny">
      <el-form :rules="rules" ref="formData" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="分类图片">
              <preview-img ref="pic" :path="formData.pic"></preview-img>
            </el-form-item>
            <el-form-item label="排序值" prop="sortord">
              <el-input v-model="formData.sortord"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="closeDialog()">取 消</el-button>
        <el-button type="primary" @click.native.prevent="saveframework()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
  <script>
    import navBar from '../../components/common/navBar.vue'
    import ywk from '../../utils/ywk.js'
    import { validateNum } from '../../utils/page-validate.js'
    import $ from 'webpack-zepto'
    import _ from 'lodash'

    export default {
      data () {
        return {
          navBarData: [
            {path: '/', name: '首页'},
            {path: '', name: '内容管理'}
          ],
          query: {
            page: '1'
          },
          pagination: {
            page: 1,
            page_num: 50,
            total_num: 0,
            total_page: 1
          },
          formData: {
            name: '',
            pic: '',
            sortord: ''
          },
          // 操作的数据id
          currentId: 0,
          // 是否显示添加备注模态窗口
          dialogAdd: false,
          winHeight: 500,
          tableData: [],
          loading: true,
          // 页面验证
          rules: {
            name: [
              { required: true, message: '请输入分类名称', trigger: 'blur' }
            ],
            sortord: [
              { required: true, message: '请填写排序值', trigger: 'blur' },
              { validator: validateNum }
            ]
          }
        }
      },
      mounted () {
        this.getData()
        this.winHeight = $(window).height() - 320
      },
      methods: {
        getData () {
          ywk.getJson('/api/content/category', this.query, (res) => {
            if (res.error_code === 0) {
              this.tableData = res.data.categories
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

        // 删除分类
        closeFn (id) {
          this.$confirm('确定要删除该分类吗?', '提示', {
            type: 'warning'
          }).then(() => {
            ywk.postJson(`/api/content/category/remove/${id}`, {}, (res) => {
              if (res.error_code === 0) {
                // 移除该行数据
                let idx = _.findIndex(this.tableData, {id: id})
                this.tableData.splice(idx, 1)
                this.pagination.total_num -= 1

                // 提示内容
                this.$notify({
                  title: '成功',
                  message: '恭喜你，删除分类成功！',
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
          this.currentId = ''
          this.formData.name = ''
          this.formData.parent = 1
          this.$refs.formData.resetFields()
        },

        // 编辑分类
        editCategory (item) {
          this.currentId = item.id
          this.formData.name = item.child
          this.dialogAdd = true
        },

        // 保存分类数据
        saveCategory () {
          this.$refs.formData.validate((valid) => {
            if (!valid) {
              return
            }

            let pic = this.$refs.pic.curFile
            if (!this.currentId) {
              if (!pic) {
                this.$notify.error({
                  title: '错误',
                  message: '请上传图片'
                })
                return
              }
            }

            // 生成保存的参数
            let fdata = new window.FormData()
            if (pic) {
              fdata.append('pic', pic)
            }
            fdata.append('name', this.formData.name)
            fdata.append('sortord', this.formData.sortord)

            let url = this.currentId ? `/api/content/category/update/${this.currentId}` : '/api/content/category'

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
                this.$notify.error({
                  title: '错误提示',
                  message: res.msg
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
        navBar
      }
    }
  </script>
  <style lang="scss">
    .btn-box {
      margin-bottom: 20px;
    }
  </style>