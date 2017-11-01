<template>
  <div class="input-out" @click.stop="showModel">
    <el-input 
      placeholder="请输入需查询的楼盘地址，多个楼盘请以“，”隔开，最多可输入20个"
      v-model="keyValue"
      style="width: 600px;"
      @change="getMess"
      >
    </el-input>
    <el-button class="search-btn" type="primary" icon="search" @click.stop="goMap">
      搜索
    </el-button>
    <div class="mess-box" v-show="messDate.length !== 0 && isShow">
      <router-link v-for="item in messDate" class="nav-r" target="_blank" :to="{name: 'info', params: {type: pageInfo.type, id: item.housesId}}">{{ item.housesDesc }}</router-link>
    </div>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util.js'

export default {
  props: {
    isPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: [],
      pageInfo: {},
      count: 0
    }
  },
  created () {
    var _self = this
    $('body').click(function () {
      if (!_self.isPage) {
        _self.keyValue = ''
      }
      _self.messDate = []
      _self.isShow = false
    })
  },
  methods: {
    // 获取搜索数据
    getDatas () {
      // 记录被调用序号
      var count = this.count

      this.pageInfo = this.$store.getters.getPageInfo

      let formData = {
        key: this.keyValue
      }

      util.request({
        method: 'post',
        interface: 'searchMap',
        data: formData
      }).then(res => {
        if (res.result.success == '1') {
          if (count !== this.count) {
            return false
          }
          this.messDate = res.result.result
        } else {
          this.$message.error(res.result.mess)
        }
      })
    },
    getMess () {
      if (this.isPage) {
        return false
      }

      if (this.keyValue === '') {
        this.isShow = false
        return false
      } else if (this.keyValue.split('，').length > 20) {
        this.$message.error('最多支持20个关键字搜索')
      }
      // getMess
      this.isShow = true
      this.count++
      this.getDatas()
    },
    showModel () {
      this.isShow = true
    },
    hideMess (e) {
      this.isShow = false
    },
    goMap () {
      if (this.keyValue === '') {
        this.$message.error('请输入搜索关键字')
        return false
      }

      this.$store.dispatch('setMapInfo', this.messDate)
      if (this.isPage) {
        this.isShow = false
        this.$emit('mapChange', this.keyValue)
        return false
      }

      var url = {
        name: 'map',
        params: {
          type: this.pageInfo.type
        }
      }
      this.isShow = false
      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss">
  .input-out {
    position: relative;
    display: inline-block;

    .mess-box {
      position: absolute;
      left: 0;
      top: 49px;
      width: 590px;
      box-sizing: border-box;
      padding: 15px 0;
      border: 1px solid #C0CCDA;
      text-align: left;
      background: #ffffff;
      z-index: 10;
      
      .nav-r {
        display: block;
        padding: 0 15px;
        font-size: 14px;
        line-height: 30px;
        color: #333333;
        cursor: pointer;

        &:hover {
          background: #C0CCDA;
        }
      }
    }

    .el-input {
      display: inline-block;
    }

    .search-btn {
      position: relative;
      float: right;
      margin-left: -10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 50px;
      font-size: 16px;
      padding: 0 23px;
    }
  }
</style>