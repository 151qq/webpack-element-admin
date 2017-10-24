<template>
  <section>
    <banner-house ref="banner"></banner-house>

    <section class="card-list">

      <el-button class="set-btn" type="primary" size="small" @click="showModel">
        设置
      </el-button>

      <div class="input-box">

        <search-box></search-box>

        <router-link class="map-btn" :to="{ name: 'map', params: { type: type }, query: {city: activeName}}">
          <img src="../../assets/images/map-icon.png">
          地图
        </router-link>
      </div>

      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane
            class="card-outer"
            v-for="item in selectedCity"
            :label="citys[item].title"
            :name="citys[item].title">
        </el-tab-pane>
      </el-tabs>

      <el-row class="el-box">
        <el-col
            :class="index % 4 == 0 ? 'card-b clearM' : 'card-b'"
            :span="6"
            v-for="(o, index) in articles">
          <router-link class="linkA" target="_blank" :to="{ name: 'detail', params: { id: o.id }}">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="o.imgUrl" class="image">
              <div style="padding: 14px;">
                <span>{{ o.title }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ o.date }}</time>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </section>

    <address-form
        :citys="citys"
        :check-list="selectedCity"
        :dialog-form-visible="dialogFormVisible"
        @sendD="changeD">
    </address-form>

  </section>
</template>
<script>
import bannerHouse from '../../components/views/banner-house.vue'
import searchBox from '../../components/common/search-box.vue'
import addressForm from '../../components/views/address.vue'
import Tools from '../../utils/tools.js'

export default {
  data () {
    return {
      activeName: '',
      citys: [],
      selectedCity: [],
      restaurants: [],
      dialogFormVisible: {
        visibleA: false
      },
      type: '',
      pageInfo: {},
      articles: []
    }
  },
  created () {
    this.getCitys()
  },
  watch: {
    $route (to, from) {
      this.getCitys()
      this.$refs.banner.getData()
      console.log(1)
    },
    activeName (value) {
      if (!value || value === '0') {
        return false
      }
      this.pageInfo.city = this.filterCity()
      this.$store.dispatch('setPageInfo', this.pageInfo)
      this.$refs.banner.getData()
      console.log(value, 2)
    }
  },
  methods: {
    // 页面初始数据设置
    setData () {
      // 初始tab
      this.type = this.$route.params.type
      this.pageInfo = {
        type: this.type,
        city: this.filterCity()
      }

      this.$store.dispatch('setPageInfo', this.pageInfo)
    },
    filterCity () {
      let result = ''
      for (var i = 0, leng = this.citys.length; i < leng; i++) {
        if (this.citys[i].title === this.activeName) {
          result = this.citys[i].id
          break
        }
      }
      return result
    },
    // 获取banner楼盘数据
    getPMess () {
      Tools.getJson('url', this.pageInfo, (datas) => {

      })
    },
    // 获取城市及报告数据
    getCitys () {
      let formData = {
        type: this.pageInfo.type
      }

      Tools.getJson('reports', formData, (res) => {
        if (res.success === '1') {
          // 设置所有城市
          this.citys = res.result.citys
          this.articles = res.result.articles
          // 设置当前显示
          this.selectedCity = [0]
          this.activeName = this.citys[0].title
          this.setData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 设置城市弹窗
    showModel () {
      this.dialogFormVisible.visibleA = true
    },
    // 改变城市子组件数据传回
    changeD (data) {
      this.selectedCity = data
      this.activeName = this.citys[data[0]].title
    }
  },
  components: {
    bannerHouse,
    addressForm,
    searchBox
  }
}
</script>
<style lang="scss" scoped>
.card-list {
  position: relative;
  display: block;
  width: 1160px;
  min-height: 180px;
  margin: 4px auto 0;

  .input-box {
    position: absolute;
    width: 100%;
    right: 0;
    top: 72px;
    text-align: center;
    z-index: 100;
    padding-right: 100px;
    box-sizing: border-box;

    .map-btn {
      position: absolute;
      right: 150px;
      top: 0;
      box-sizing: border-box;
      width: 120px;
      height: 50px;
      border: 1px solid #0053FF;
      border-radius: 3px;
      color: #0053FF;
      line-height: 50px;
      font-size: 16px;

      img {
        margin-right: 6px;
      }
    }
  }

  .el-tabs__header {
    border: none;
  }

  .set-btn {
    position: absolute;
    right: 0;
    top: 12px;
    z-index: 101;
  }

  .el-input-group__append {
    .el-button--primary {
      color: #fff;
      background-color: #20a0ff;
      border-color: #20a0ff;
    }
  }
}

.card-box {
  display: block;
  width: 100%;
}

.card-outer {
  margin-top: 117px;
}

.card-b {
  width: 269px;
  margin-left: 28px;
  margin-bottom: 20px;
}

.el-box {
  margin-bottom: 60px;
}

.clearM {
  margin-left: 0;
}

.linkA {
  display: block;

  span {
    display: block;
    font-size: 16px;
    color: #000000;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow:hidden;
  }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 248px;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
