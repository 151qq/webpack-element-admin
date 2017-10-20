<template>
  <el-dialog title="修改密码" v-model="dialogFormVisible.visibleP" size="tiny">
      <el-form>
        <el-form-item label="最新密码" :label-width="formLabelWidth">
          <el-input v-model="password" type="password" auto-complete="off" @blur="checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input v-model="enterPassword" type="password" auto-complete="off" @blur="checkEnter"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeWindow">取 消</el-button>
        <el-button type="primary" @click="editPassword">确 定</el-button>
      </div>
  </el-dialog>
</template>
<script>
import util from '../../assets/common/util'

export default {
  props: {
    dialogFormVisible: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      password: '',
      enterPassword: '',
      formLabelWidth: '80px'
    }
  },
  mounted () {
  },
  methods: {
    editPassword () {
      if (!this.checkPassword() || !this.checkEnter()) {
        return false
      }
      var formData = {
        password: this.password
      }

      util.request({
        method: 'post',
        interface: 'changePassword',
        data: formData
      }).then(res => {
        this.dialogFormVisible.visibleP = false
        this.logout()
      })
    },
    logout () {
      util.request({
        method: 'post',
        interface: 'logout',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          window.location.href = 'login.html'
        }
      })
    },
    closeWindow () {
      this.dialogFormVisible.visibleP = false
    },
    checkPassword () {
      if (this.password === '') {
        this.$message.error('密码不能为空！')
        return false
      } else {
        return true
      }
    },
    checkEnter () {
      if (this.password === '') {
        this.$message.error('密码不能为空！')
        return false
      } else if (this.enterPassword !== this.password) {
        this.$message.error('前后密码不一致！')
        return false
      } else {
        return true
      }
    }
  }
}
</script>