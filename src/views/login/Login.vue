<template>
    <div class="wrap">
        <div class="loginBox">
            <div class="l">
                <div class="page-box"
                        :class="item.pathName.name == pathName.name ? 'active' : ''"
                        v-for="item in pageDate"
                        @click="pathChange(item)">
                    <img :src="item.imgUrl">
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div class="r">
                <el-form :label-position="'left'" label-width="80px">
                    <el-form-item label="会员名称">
                        <el-input v-model="memberCode"></el-input>
                    </el-form-item>
                    <el-form-item label="会员密码">
                        <el-input v-model="password" type="password"></el-input>
                        <div class="forget-p" @click="showForget">
                            忘记密码
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="subBtn">会员登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="message-box">欢迎来到商房云管理平台。通过商房云管理平台。您可以查询您关注城市的有投资价值的物业、物业相关的证券产品、物业相关的企业的详实而真实的信息。请用您的手机号和您所在企业给您的密码登录。如果无法登录，请联系您所在企业的管理员，让其为您设置账号和密码。</div>
            </div>
        </div>
        <el-dialog
            title="忘记密码"
            :visible.sync="dialogVisible"
            size="tiny">
          
            <div class="form-b">
                <section>
                    <span>手机</span>
                    <el-input placeholder="请输入内容" v-model="forgetData.tel" @input="checkTel"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input placeholder="请输入内容" v-model="codeInput">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox" :class="{clickBox: isClick}" @click="getCode">获取验证码</span>
                        </template>
                    </el-input>
                </section>
                <section>
                    <span>新密码</span>
                    <el-input placeholder="请输入内容" type="password" v-model="forgetData.password"></el-input>
                </section>
                <section>
                    <span>确认密码</span>
                    <el-input placeholder="请输入内容" type="password" v-model="enterPassword"></el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updaetPassword">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import $ from 'Jquery'
    export default {
        name: 'index',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                memberCode: '',
                password: '',
                curNav: 1,
                enterpriseCname: '',
                enterpriseIndustry: '',
                userCname: '',
                userPassword: '',
                pageDate: [
                    {
                        imgUrl: '/static/images/login1.jpg',
                        title: '投资机构数据库',
                        pathName: {
                            name: 'invest',
                            params: {
                                type: 'finance_org_type_1'
                            }
                        }
                    },
                    {
                        imgUrl: '/static/images/login2.jpg',
                        title: '商业地产数据库',
                        pathName: {
                            name: 'index',
                            params: {
                                type: 'business'
                            }
                        }
                    },
                    {
                        imgUrl: '/static/images/login3.jpg',
                        title: '商业地产证券化数据库',
                        pathName: {
                            name: 'security',
                            params: {
                                type: 'finance_product_type_1'
                            }
                        }
                    }
                ],
                dialogVisible: false,
                forgetData: {
                    tel: '',
                    password: ''
                },
                codeInput: '',
                timer: null,
                seconds: 90,
                enterPassword: '',
                isClick: false,
                pathName: {
                    name: 'index',
                    params: {
                        type: 'business'
                    }
                }
            }
        },
        mounted() {
            setTimeout(() => {
                var _selt = this
                $('.swiper-pagination-bullet').click(function(){
                    var index = $('.swiper-pagination-bullet').index($(this)) + 1
                    _selt.$refs.mySwiper.swiper.slideTo(index)
                })
            }, 150)
        },
        methods: {
            pathChange (item) {
                this.pathName = item.pathName
            },
            showForget () {
                this.forgetData = {
                    tel: '',
                    password: ''
                }
                this.codeInput = ''
                this.enterPassword = ''

                this.dialogVisible = true
            },
            checkTel () {
                 if (this.forgetData.tel == '' || !(/^1[3|4|5|8][0-9]\d{8}$/).test(this.forgetData.tel.trim())) {
                    this.isClick = false
                } else {
                    this.isClick = true
                }
            },
            getCode () {
                if (!this.isClick) {
                    return
                }

                util.request({
                    method: 'post',
                    interface: 'sendSmsCode',
                    data: {
                        mobile: this.forgetData.tel
                    }
                }).then((res) => {
                    if (res.result.success == '1') {
                        this.timer = setInterval(() => {
                            this.seconds--
                            if (this.seconds === 0) {
                                clearInterval(this.timer)
                                this.timer = null
                            }
                        }, 1000)
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
                
            },
            updaetPassword () {
                if (this.forgetData.tel == '' || !(/^1[3|4|5|8][0-9]\d{4,8}$/).test(this.forgetData.tel.trim())) {
                    this.$message.error('请输入11位注册手机号')
                    return
                }

                if (this.codeInput == '') {
                    this.$message.error('请输入验证码')
                    return
                }

                if (this.forgetData.password == '') {
                    this.$message.error('请输入新密码')
                    return
                }

                if (this.enterPassword == '') {
                    this.$message.error('请确认新密码')
                    return
                }

                if (this.enterPassword != this.forgetData.password) {
                    this.$message.error('前后密码不一致')
                    return
                }
                util.request({
                    method: 'post',
                    interface: 'resetPassword',
                    data: {
                        mobile: this.forgetData.tel,
                        password: this.forgetData.password,
                        code: this.codeInput
                    }
                }).then((res) => {
                    if (res.result.success == '1') {
                        this.dialogVisible = false
                        this.$message({
                          message: '恭喜你，密码修改成功',
                          type: 'success'
                        })
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            subBtn() {

                if (this.memberCode == '') {
                    this.$message.error('请输入会员名称');
                    return;
                }
                if (this.password == '') {
                    this.$message.error('请输入会员密码');
                    return;
                }

                var data = {
                    memberCode: this.memberCode,
                    password: this.password
                }

                util.request({
                    method: 'post',
                    interface: 'authentication',
                    data: data
                }).then((res) => {
                    if (res.result.success != '0') {
                        this.$router.push(this.pathName)
                    } else {
                        this.$message.error(res.result.message)
                    }
                    
                });
            }
        }
    }
</script>
<style lang="scss">
html, body, #app {
    height: 100%;
}

.wrap {
  background: #383a4c;
  height: 100%;
  overflow: hidden;

  .el-input__inner {
    height: 36px;
  }

    .swiper-container .swiper-wrapper .swiper-slide img {
        display: block;
        width: 100%;
    }

    .el-button--primary {
        background: rgb(32, 160, 255);
        border-color: rgb(32, 160, 255);
    }
}

.loginBox {
  width: 1160px;
  height: 100%;
  box-sizing: border-box;
  padding: 125px 0 0;
  background: #383a4c;
  margin: auto;

  .l {
    width: 756px;
    height: 426px;
    overflow: hidden;
    float: left;
    box-shadow: 0 0 10px 1px #1f1e1e;
    box-sizing: border-box;
    padding: 0 18px;
    
    .page-box {
        float: left;
        width: 220px;
        margin: 65px 10px;
        border: 1px solid #f8f8f8;
        border-radius: 3px;
        cursor: pointer;

        img {
            display: block;
            width: 100%;
            height: 260px;
        }

        span {
            display: block;
            line-height: 36px;
            color: #ffffff;
            font-size: 14px;
            text-align: center;
        }
    }

    .active {
        border-color: #20a0ff;
    }
  }

  .r {
    width: 360px;
    height: 426px;
    background-color: #424458;
    float: right;
    overflow: hidden;
    box-sizing: border-box;
    padding: 30px 24px 20px;
    box-shadow: 0 0 10px 1px #1f1e1e;

    .el-form-item__label {
      color: #ffffff;
    }

    .el-form-item {
      margin-bottom: 10px;
    }

    .el-button--primary {
      width: 100%;
    }

    .dased-border {
      width: 120%;
      height: 1px;
      border-top: 1px dashed #999999;
      margin: 20px 0 20px -40px;
    }

    .forget-p {
      font-size: 12px;
      color: #a1a3a0;
      text-align: right;
      cursor: pointer;
      line-height: 20px;
      margin-top: 8px;

      &:hover {
        text-decoration: underline;
      }
    }

    .message-box {
      font-size: 14px;
      color: #75778d;
      line-height: 26px;
      margin-top: 30px;
    }
  }
}

.form-b {
  section {
    position: relative;
    height: 36px;
    padding-left: 60px;
    margin-bottom: 15px;

    &>span {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 40px;
      line-height: 36px;
    }
  }

  .code-b {
    cursor: pointer;
  }
}
</style>
