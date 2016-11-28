<template>
  <div class="login">
     <div class="content">
       <div class="login-main">
          <div class="login-title">
            <span class="logo"></span>
            <span>欢迎来到云沃客</span>
          </div>
          <div class="login-cnt">
            <el-form label-position="top" :rules="rules"
                ref="loginFrom"
                :model="loginFrom">
              <el-form-item prop="username">
                <el-input v-model="loginFrom.username" placeholder="用户名">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginFrom.password" type="password"
                    placeholder="输入密码">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="是否记住密码" v-model="loginFrom.remember"
                    :true-label="1"
                    :false-label="0">
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native.prevent="handleSubmit">
                  立即登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="link-con">
            <span class="link-item">遇到问题？</span>
            <a class="link-item">忘记密码</a>
            <a class="link-item">需要帮助</a>
          </div>
       </div>
     </div>
  </div>
</template>

<script>
  require('../assets/sass/views/login.scss')
  import YWK from '../utils/ywk.js'
  import Cookies from 'js-cookie'

  export default {
    data () {
      return {
        loginFrom: {
          username: '',
          password: '',
          remember: 1
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {},
    mounted () {},
    methods: {
      handleSubmit () {
        this.$refs.loginFrom.validate((valid) => {
          if (valid) {
            this.login()
          } else {
            return false
          }
        })
      },
      login () {
        let data = this.loginFrom
        YWK.postJson('/api/login', data, (res) => {
          if (res.error_code === 0) {
            let user = res.data
            Cookies.set('token', user.token)
            Cookies.set('uid', user.uid)
            this.$store.dispatch('setUserInfo', user)
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    components: {}
  }
</script>

<style lang="css">
</style>
