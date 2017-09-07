<template>
  <section class="header">
    <router-link class="logo-box" to="index/business"><img src="../../assets/images/logo.png"></router-link>

    <div class="nav-box">
      <router-link :to="{ name: 'index', params: { type: 'business' }}">商业地产</router-link>
      <router-link :to="{ name: 'index', params: { type: 'house' }}">写字楼</router-link>
      <router-link :to="{ name: 'index', params: { type: 'mall' }}">购物中心</router-link>
      <router-link :to="{ name: 'report'}">我的报告</router-link>
    </div>

    <div class="member-box">
      <a class="img-box" @click="editImgUrl"><img :src="userInfo.memberImg"></a>
      <a @click="editPassword">
        您好
        <span>{{userInfo.name}}</span>
        <i class="el-icon-caret-bottom"></i>
      </a>
    </div>

    <div class="mess-box" v-popover:popover1>
      <i class="el-icon-message"></i>
      <span class="circle"></span>
      <el-popover
          ref="popover1"
          placement="bottom"
          width="360"
          trigger="click">
        <div class="con-box">
          <p class="title">任务</p>
          <div class="mess-list">
            <section>
              <div class="top">
                <img src="../../assets/images/head-icon.png">
                <p>
                  <span class="people">孙晶洞</span>
                  <span>瑞信投资有限公司</span>
                </p>
              </div>
              <div class="mid">
                <p>请您从2017年10月1日开始，到2017年您从2017年10月1日开始，到2017年您从2017年10月1日开始，到2017年</p>
                <router-link :to="{ name: 'notice'}">{{ origin + '/notice'}}</router-link>
              </div>
              <div class="bottom">
                <el-button class="edit" type="primary" icon="edit" size="small">处理</el-button>
              </div>
            </section>

            <section>
              <div class="top">
                <img src="../../assets/images/head-icon.png">
                <p>
                  <span class="people">孙晶洞</span>
                  <span>瑞信投资有限公司</span>
                </p>
              </div>
              <div class="mid">
                <p>请您从2017年10月1日开始，到2017年您从2017年10月1日开始，到2017年您从2017年10月1日开始，到2017年</p>
                <router-link :to="{ name: 'notice'}">{{ origin + '/notice'}}</router-link>
              </div>
              <div class="bottom">
                <el-button class="edit" type="primary" icon="edit" size="small">处理</el-button>
              </div>
            </section>
          </div>
        </div>
      </el-popover>
    </div>
    <upload-file :path="userInfo.memberImg" :dialog-form-visible="dialogFormVisible"></upload-file>
    <password :dialog-form-visible="dialogFormVisible"></password>
  </section>
</template>
<script>
import uploadFile from './upload-file.vue'
import password from './password.vue'

export default {
  data () {
    return {
      origin: window._SettingOrigin,
      userInfo: {
        name: '顾乐乐',
        memberImg: '../../assets/images/head-icon.png'
      },
      dialogFormVisible: {
        visibleF: false,
        visibleP: false
      }
    }
  },
  created () {
  },
  methods: {
    editImgUrl () {
      this.dialogFormVisible.visibleF = true
    },
    editPassword () {
      this.dialogFormVisible.visibleP = true
    }
  },
  components: {
    uploadFile,
    password
  }
}
</script>
<style lang="scss" scoped>
  .header {
    height: 50px;
    line-height: 50px;
    background: #000000;
    color: #fff;
    padding: 0 20px;

    .logo-box {
      float: left;
      margin-top: 10px;
      margin-right: 26px;
    }

    .nav-box {
      float: left;

      a {
        display: inline-block;
        font-size: 16px;
        color: #666666;
        line-height: 50px;
        margin-right: 30px;

        &:hover {
          color: #ffffff;
        }
      }

      .router-link-active {
        color: #ffffff;
      }
    }

    .member-box {
      float: right;
      margin-left: 26px;

      a {
        float: left;
        line-height: 50px;
        cursor: pointer;

        i {
          margin-left: 10px;
          color: #999999;
        }
      }

      .img-box {
        width: 24px;
        height: 24px;
        margin: 13px 20px 0 0;
        line-height: 0;
        background: url(../../assets/images/head-icon.png) left top no-repeat;
      }
    }

    .mess-box {
      position: relative;
      float: right;
      width: 16px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      i {
        color: #999999;
      }
      
      .circle {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        overflow: hidden;
        right: -4px;
        top: 14px;
        background: url(../../assets/images/mess-now.png) center no-repeat;
      }
    }
  }
  
  .el-popover {
    padding: 0;
  }  

  .con-box {

    .title {
      font-size: 14px;
      color: #000000;
      line-height: 30px;
      padding: 0 15px;
      border-bottom: 1px solid #DCDCDC;
    }
  }
  .mess-list {
    max-height: 380px;
    overflow: auto;

    section {
      border-bottom: 1px solid #DCDCDC;

      &:last-child {
        border: none;
      }
    }

    .top {
      padding: 15px 15px 0;

      img {
        float: left;
        margin-right: 13px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      p {
        width: 220px;

        span {
          display: block;
          font-size: 12px;
          color: #99A9BF;
          line-height: 24px;
        }

        .people {
          font-size: 16px;
          color: #475669;
          line-height: 26px;
        }
      }
    }

    .mid {
      padding: 10px 15px 0;

      p {
        font-size: 14px;
        color: #5E6D82;
        line-height: 20px;
      }

      a {
        display: block;
        font-size: 14px;
        color: #0053FF;
        line-height: 20px;
      }
    }

    .bottom {
      padding: 8px 15px 20px;
      overflow: hidden;

      .edit {
        float: right;

        i {
          color: #ffffff;
        }
      }
    }
  }
</style>
