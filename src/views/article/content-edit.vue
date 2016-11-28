<template>
<div>
  <nav-bar title="文章详情" :crumbs="navBarData"></nav-bar>
  <div class="member-contont">
    <div class="btn-box">
      <el-button type="primary" icon="search" @click.native="submitFront()">发布到前台</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="15" :offset="3">
        <el-form ref="form" :model="formData" label-width="80px" @submit.prevent="onSubmit">

          <el-form-item label="标题">
            <!-- <span v-text="formData.title"></span> -->
            <el-input placeholder="案例名称" v-model="formData.title"></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <span v-text="formData.author"></span>
          </el-form-item>

          <el-form-item label="发布时间">
            <span v-text="formData.publish_at"></span>
          </el-form-item>
          
          <el-form-item label="来源网站">
            <span v-text="formData.site"></span>
          </el-form-item>

          <el-form-item label="专题内容">
            <textarea id="editor"></textarea>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click.native.prevent="edit">保存</el-button>
            <el-button @click.native.prevent="goList">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</div>
</template>
  <script>
    import navBar from '../../components/common/navBar.vue'
    import ywk from '../../utils/ywk.js'
    import previewImg from '../../components/common/preview-img.vue'
    require('../../assets/sass/views/editor.scss')
    require('../../assets/sass/views/simditor.scss')
    import Simditor from 'simditor'
    import $ from 'webpack-zepto'

    export default {
      data () {
        return {
          navBarData: [
            {path: '/', name: '首页'},
            {path: '', name: '内容管理'}
          ],
          simditor: null,
          topicList: [],
          topicContent: [],
          formData: {},
          caption_pic: ''
        }
      },
      created () {
        this.$nextTick(() => {
          // 实例化编辑器
          this.simditor = new Simditor({
            textarea: $('#editor'),
            toolbarFloat: false,
            toolbarFloatOffset: 10,
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', '|', 'indent', 'outdent', 'alignment', '|']
          })
          // 监听编辑器修改事件，赋值description属性
          this.simditor.on('valuechanged', (e) => {
            this.formData.content = this.simditor.getValue()
          })

          this.$on('isGet', () => {
            this.simditor.setValue(this.formData.content)
          })
          // 处理编辑器里面的链接跳转问题
          $('.link-target').find('option').eq(0).attr('value', '_self')
          $('.link-target').find('option').eq(0).html('在当前窗口中打开 (_self)')
          $('.link-target').find('option').eq(1).val('_blank')
          $('.link-target').find('option').eq(1).html('在新窗口中打开 (_blank)')
          if (this.$route.params.id !== 'create') {
            this.id = this.$route.params.id
            this.getContentData(this.id)
          }
        })
      },
      methods: {
        getContentData (id) {
          ywk.getJson(`/api/article/posts/detail/${id}`, {}, (res) => {
            if (res.error_code === 0) {
              this.formData = res.data
              this.$emit('isGet')
            }
          })
        },
        edit () {
          if (!this.formData.content) {
            this.$message({
              message: '请输入内容详情',
              type: 'warning'
            })
            return
          }

          let data = {
            content: this.formData.content,
            title: this.formData.title
          }

          ywk.postJson(`/api/article/posts/update/${this.id}`, data, (res) => {
            if (res.error_code === 0) {
              // 提示内容
              this.$notify({
                title: '成功',
                message: '恭喜你，保存成功！',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '错误提示',
                message: res.msg,
                type: 'error'
              })
            }
          })
        },
        goList () {
          this.$router.push('/article/list')
        },
        submitFront () {
          ywk.postJson(`/api/article/posts/publish/${this.id}`, {}, (res) => {
            if (res.error_code === 0) {
              // 提示内容
              this.$notify({
                title: '成功',
                message: '恭喜你，发布成功！',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '错误提示',
                message: res.msg,
                type: 'error'
              })
            }
          })
        }
      },
      components: {
        navBar,
        previewImg
      }
    }
  </script>
  <style lang="scss">
    .btn-box {
      margin-bottom: 20px;
      text-align: right;
    }
  </style>