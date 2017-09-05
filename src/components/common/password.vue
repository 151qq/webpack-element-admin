<template>
	<el-dialog title="修改密码" v-model="dialogFormVisible.visibleP" size="tiny">
	  	<el-form :model="form">
		    <el-form-item label="最新密码" :label-width="formLabelWidth">
		      <el-input v-model="form.password" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" :label-width="formLabelWidth">
				<el-input v-model="form.enterPassword" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
	  	<div slot="footer" class="dialog-footer">
		    <el-button @click="closeWindow">取 消</el-button>
		    <el-button type="primary" @click="editPassword">确 定</el-button>
	  	</div>
	</el-dialog>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      form: {
        password: '',
        enterPassword: ''
      },
      formLabelWidth: '80px'
    }
  },
  mounted () {
  },
  methods: {
    editPassword () {
      this.$message({
        showClose: true,
        message: '上传成功',
        type: 'confirm'
      })
      this.dialogFormVisible = false
    },
    closeWindow () {
      this.dialogFormVisible.visibleP = false
    }
  }
}
</script>