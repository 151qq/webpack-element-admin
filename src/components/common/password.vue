<template>
	<el-dialog title="修改密码" v-model="dialogFormVisible.visibleP" size="tiny">
	  	<el-form :model="form">
		    <el-form-item label="最新密码" :label-width="formLabelWidth">
		      <el-input v-model="password" auto-complete="off" @blur="checkPassword"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" :label-width="formLabelWidth">
				<el-input v-model="enterPassword" auto-complete="off" @blur="checkEnter"></el-input>
		    </el-form-item>
		  </el-form>
	  	<div slot="footer" class="dialog-footer">
		    <el-button @click="closeWindow">取 消</el-button>
		    <el-button type="primary" @click="editPassword">确 定</el-button>
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
      Tools.postJson('setPassword', formData, (res) => {
        if (res.statusCode === 0) {
          this.$message({
            showClose: true,
            message: '恭喜你，修改成功'
          })
          this.dialogFormVisible.visibleP = false
        } else {
          this.$message.error(res.mess)
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