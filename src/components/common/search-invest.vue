<template>
  <div class="search-input-out" @click.stop="showModel">
    <section class="search-box">
      <el-input 
        placeholder="请输入需查询条件"
        v-model="keyValue"
        style="width: 600px;"
        @change="getMess"
        >
      </el-input>

      <!-- <el-button class="search-btn" type="primary" icon="search" @click.stop="goMap">
        搜索
      </el-button> -->
    </section>

    <!-- <el-select v-model="searchTypeName"
                placeholder="请选择">
      <el-option
        v-for="(item, index) in searchType"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> -->

    <div class="mess-box" v-show="messDate.length !== 0 && isShow">
      <router-link v-for="item in messDate" class="nav-r" target="_blank"
                  :to="{name: 'invest-detail', params: {id: item.enterpriseCode}}">
        {{ item.enterpriseNameReg }}
      </router-link>
    </div>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util.js'

export default {
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: [],
      pageInfo: {},
      count: 0,
      searchType: [
        {
          label: '机构名称',
          value: '1'
        },
        {
          label: '物业名称',
          value: '2'
        },
        {
          label: '证券名称',
          value: '3'
        }
      ]
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

      let formData = {
        key: this.keyValue
      }

      util.request({
        method: 'post',
        interface: 'selectEntByNameOrNameReg',
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
      }
      // getMess
      this.isShow = true
      this.count++
      this.getDatas()
    },
    showModel () {
      this.isShow = true
    }
  }
}
</script>
<style lang="scss">
.search-input-out {
  vertical-align: top;
  position: relative;
  display: inline-block;

  .search-box {
    display: inline-block;
    height: 50px;
    margin-right: 10px;
  }

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

  .el-input__inner {
    height: 50px;
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