<template>
  <section class="header">
    <router-link class="logo-box" to="index/business"><img src="../../assets/images/logo.png"></router-link>
  
    <div class="nav-box" v-if="pathName == 'invest'">
      <router-link :to="{ name: 'invest'}">投资机构</router-link>
    </div>

    <div class="nav-box" v-if="pathName == 'security'">
      <router-link :to="{ name: 'security'}">商业地产证券</router-link>
    </div>

    <div class="nav-box" v-if="pathName == 'home'">
      <router-link :to="{ name: 'index', params: { type: 'business' }}">写字楼</router-link>
      <router-link :to="{ name: 'index', params: { type: 'mall' }}">购物中心</router-link>
      <router-link :to="{ name: 'index', params: { type: 'apartment' }}">租赁公寓</router-link>
      <router-link :to="{ name: 'index', params: { type: 'park' }}">大型园区</router-link>
      <!-- <router-link :to="{ name: 'report'}">我的报告</router-link> -->
    </div>

    <div class="member-box">
      <a class="img-box" @click="editImgUrl">
        <img v-if="userInfo.iconUrl" :src="userInfo.iconUrl">
        <img v-else src="../../assets/images/default-avatar.png">
      </a>
      <el-dropdown>
        <span class="el-dropdown-link">
          您好
          <span>{{userInfo.userCnName}}</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="editPassword">
              <img src="../../assets/images/change-password.png">
              修改密码
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout">
              <img src="../../assets/images/logout.png">
              退出登录
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="line-box"></div>

    <el-select v-model="pathName"
                class="page-box"
                placeholder="请选择"
                size="small"
                @change="pageChange">
      <el-option
        v-for="(item, index) in pageDate"
        :key="index"
        :label="item.title"
        :value="item.pathName">
      </el-option>
    </el-select>

    <!-- <div class="mess-box" v-popover:popover1>
      <i class="el-icon-message"></i>
      <span class="circle"></span>
      <el-popover
          ref="popover1"
          placement="bottom"
          width="600"
          trigger="click">
        <div class="con-box">
          <p class="title">任务</p>
          <div class="mess-list">
            <section v-for="item in noticeList">
              <div class="top">
                <img :src="item.taskIcon">
                <p>
                  <span class="people">{{item.taskTitle}}</span>
                  <span>{{item.enterpriseCname}}</span>
                </p>
              </div>
              <div class="mid">
                <p>{{item.taskDescribe}}</p>
              </div>
              <div class="bottom">
                <el-button class="edit" type="primary" icon="edit" size="small" @click="goUrl(item.taskCode)">处理</el-button>
              </div>
            </section>
          </div>
          <el-pagination
            small
            layout="prev, pager, next"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage">
          </el-pagination>
        </div>
      </el-popover> -->
    </div>
    <upload-file :path="userInfo.iconUrl" :dialog-form-visible="dialogFormVisible" @imgChange="changeImg"></upload-file>
    <password :dialog-form-visible="dialogFormVisible"></password>
  </section>
</template>
<script>
import uploadFile from './upload-file.vue'
import password from './password.vue'
import util from '../../assets/common/util.js'

export default {
  data () {
    return {
      origin: window._SettingOrigin,
      userInfo: {
        name: '',
        iconUrl: ''
      },
      noticeList: [],
      dialogFormVisible: {
        visibleF: false,
        visibleP: false
      },
      page: {
        total: 0,
        pageSize: 2,
        currentPage: 1
      },
      pathName: '',
      pageDate: [
          {
              title: '投资机构数据库',
              pathName: 'invest'
          },
          {
              title: '商业地产数据库',
              pathName: 'home'
          },
          {
              title: '商业地产证券化数据库',
              pathName: 'security'
          }
      ]
    }
  },
  created () {
    this.getUserInfo()
    if (this.$route.name == 'invest' || this.$route.name == 'invest-detail') {
      this.pathName = 'invest'
    } else if (this.$route.name == 'security') {
      this.pathName = 'security'
    } else {
      this.pathName = 'home'
    }
    // this.getNotice()
  },
  methods: {
    pageChange () {
      this.$router.push({name: this.pathName})
    },
    getUserInfo () {
      util.request({
        method: 'get',
        interface: 'getUserInfo',
        data: {}
      }).then(res => {
        this.userInfo = res.result.result
      })
    },
    logout () {
      util.request({
        method: 'post',
        interface: 'logout',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          window.location.href = '/#/login'
        }
      })
    },
    getNotice () {
      var formData = {
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage
      }

      util.request({
        method: 'get',
        interface: 'notice',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          this.noticeList = res.result.result
          this.page.total = parseInt(res.result.total)
          console.log(this.noticeList)
        } else {
          this.$message.error(res.success)
        }
      })
    },
    changePage (value) {
      this.page.currentPage = value
      this.getNotice()
    },
    goUrl (id) {
      this.$router.push({name: 'notice', params: {id: id}})
    },
    changeImg (path) {
      this.userInfo.iconUrl = path
    },
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
<style lang="scss">
  .el-dropdown-menu__item {
    font-size: 14px;

    img {
      float: left;
      width: 16px;
      height: 16px;
      margin: 10px 10px 0 2px;
    }

    div {
      line-height: 36px;
      overflow: hidden;
    }
  }

  .el-dropdown-menu {
    min-width: 120px;
  }

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

      img {
        display: block;
        height: 30px;
        width: auto;
      }
    }

    .nav-box {
      float: left;

      a {
        display: inline-block;
        font-size: 13px;
        color: #A4A4A4;
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

    .page-box {
      float: right;
    }

    .member-box {
      float: right;

      .el-dropdown-link {
        font-size: 14px;
        line-height: 50px;
        color: #A4A4A4;
        cursor: pointer;
      }

      a {
        float: left;
        font-size: 14px;
        line-height: 50px;
        color: #A4A4A4;
        cursor: pointer;

        i {
          margin-left: 10px;
          color: #999999;
        }
      }

      .img-box {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin: 13px 20px 0 0;
        line-height: 0;
        background: url(../../assets/images/head-icon.png) left top no-repeat;
        background-size: 24px 24px;
        overflow: hidden;

        img {
          display: block;
          width: 24px;
          height: 24px;
        }
      }
    }

    .line-box {
      float: right;
      width: 1px;
      height: 20px;
      margin: 15px 13px;
      background: #555555;
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
        height: 40px;
        overflow: hidden;
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
