<template>
    <el-dialog title="发送邮件" v-model="visibleData.value" size="tiny">
        <el-form :model="form">
            <el-form-item label="邮件地址" :label-width="formLabelWidth">
              <el-input v-model="email" auto-complete="off" @blur="checkEmail"></el-input>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeWindow">取 消</el-button>
            <el-button type="primary" @click="sendEmail">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Tools from '../../utils/tools.js'

export default {
  props: ['visibleData', 'urlType'],
  data () {
    return {
      email: '',
      formLabelWidth: '80px'
    }
  },
  mounted () {
  },
  methods: {
    sendEmail () {
      if (!this.checkEmail()) {
        return false
      }
      var formData = {
        mailBox: this.email,
        reportLink: this.urlType
      }
      Tools.getJson('sendMail', formData, (res) => {
        if (res.success == '1') {
          this.$message({
            showClose: true,
            message: '恭喜你，发送成功'
          })
          this.email = ''
          this.visibleData.value = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    closeWindow () {
      this.visibleData.value = false
    },
    checkEmail () {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (this.email === '') {
        this.$message.error('邮箱不能为空！')
        return false
      } else if (!reg.test(this.email)) {
        this.$message.error('邮箱格式不正确！')
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lange="scss">
.el-dialog__wrapper {
  text-align: left;
}
</style>