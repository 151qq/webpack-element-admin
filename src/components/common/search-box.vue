<template>
  <div class="input-out">
    <el-input 
      placeholder="请输入需查询的楼盘地址，多个楼盘请以“，”隔开，最多可输入20个"
      v-model="keyValue"
      style="width: 600px;"
      @change="getMess"
      >
    </el-input>
    <el-button class="search-btn" type="primary" icon="search" @click="goMap()">
      搜索
    </el-button>
    <div class="mess-box" v-if="messDate.length !== 0 && isShow">
      <p v-for="item in messDate" @click="setMap(item)">{{ item.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['activeName', 'type'],
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: []
    }
  },
  methods: {
    getMess () {
      // getMess
      let _self = this
      this.isShow = true
      var options = {
        onSearchComplete (results) {
          // 判断状态是否正确
          _self.messDate = results.vr
        }
      }
      var local = new window.BMap.LocalSearch(this.activeName, options)
      local.search(this.keyValue)
    },
    hideMess (e) {
      console.log(e)
      this.isShow = false
    },
    setMap (item) {
      window._MapData = [item]
      var url = {
        name: 'map',
        params: {
          type: this.type
        }
      }
      this.$router.push(url)
    },
    goMap () {
      window._MapData = this.messDate
      console.log(this.$router)

      var url = {
        name: 'map',
        params: {
          type: this.type
        }
      }
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
      top: 36px;
      width: 596px;
      box-sizing: border-box;
      padding: 15px 0;
      border: 1px solid #C0CCDA;
      text-align: left;
      background: #ffffff;
      
      p {
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
      display: inline-block;
      margin-left: -10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>