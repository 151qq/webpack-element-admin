<template>
  <el-dialog title="头像更改" v-model="dialogFormVisible.visibleF" size="tiny">
    <div class="el-upload file-container">
      <div class="el-dragger">
        <a target="_blank" :href="imgPath">
          <img class="preview-img" :src="imgPath" v-show="imgPath" />
        </a>
      </div>
      <el-button size="small" type="primary" >点击上传</el-button> {{remark}}
      <input class="btn_file" type="file" @change="fileChange"/>
    </div>
  </el-dialog>
</template>
<script>
import Tools from '../../utils/tools.js'

export default {
  props: {
    dialogFormVisible: {
      type: Object,
      default: {}
    },
    path: String,
    remark: {
      type: String,
      default: '（请上传1:1的图片）'
    }
  },
  data () {
    return {
      curFile: null,
      imgPath: ''
    }
  },
  mounted () {
    this.imgPath = this.path
  },
  watch: {
    path (val) {
      this.imgPath = val
    }
  },
  methods: {
    fileChange (event) {
      let files = event.target.files
      let file = null
      if (files && files.length > 0) {
        file = files[0]
        if (file.size > 1024 * 1024 * 200) {
          this.$message({
            showClose: true,
            message: '图片不能大于200M',
            type: 'warning'
          })
          return false
        }
        let URL = window.URL || window.webkitURL
        let imgUrl = URL.createObjectURL(file)
        this.imgPath = imgUrl
        this.curFile = file

        let formData = new window.FormData()
        formData.append('userfile', this.curFile)

        Tools.postFile('setPortrait', formData, (res) => {
          if (res.statusCode === 0) {
            this.imgPath = res.datas.path
            this.$message({
              showClose: true,
              message: '恭喜你，修改成功'
            })
            this.$emit('imgChange', this.imgPath)
            this.dialogFormVisible.visibleF = false
          } else {
            this.$message.error(res.mess)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-container {
    position: relative;

    .el-dragger {
      width: 180px;
    }

    .preview-img {
      width: 100%;
      height: 100%;
    }

    .btn_file {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 65px;
      height: 30px;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
