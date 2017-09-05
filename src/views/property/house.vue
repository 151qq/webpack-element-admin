<template>
  <section>
    <banner-house></banner-house>

    <section class="card-list">

      <el-button class="set-btn" type="primary" size="mini" @click="showModel">
        设置
      </el-button>

      <div class="input-box">
        <el-input 
          placeholder="请输入需查询的楼盘地址，多个楼盘请以“，”隔开，最多可输入20个"
          v-model="keyValue"
          style="width: 600px;"
          @change="getMess">
        </el-input>
        <el-button class="search-btn" type="primary" icon="search" @click="getArticles(keyValue)">
          搜索
        </el-button>
        <router-link class="map-btn" :to="{ name: 'map'}">
          <img src="../../assets/images/map-icon.png">
          地图
        </router-link>
        <div class="mess-box" v-if="messDate.length !== 0 && isShow">
          <p v-for="item in messDate" @click="getArticles(item)">{{ item }}</p>
        </div>
      </div>

      <el-tabs class="card-box" v-model="activeName">
        <el-tab-pane 
            class="card-outer"
            v-for="item in selectedCity"
            :label="item"
            :name="item">
          <el-row>
            <el-col 
                :class="index % 4 == 0 ? 'card-b clearM' : 'card-b'"
                :span="6"
                v-for="(o, index) in dataCity[citys.indexOf(item)].articles">
              <router-link class="linkA" :to="{ name: 'info', params: { id: o.id || 0 }}">
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../../assets/images/house1.png" class="image">
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
        </el-tab-pane>
      </el-tabs>
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
import addressForm from '../../components/views/address.vue'

export default {
  data () {
    return {
      activeName: '',
      citys: ['北京', '上海', '深圳'],
      selectedCity: ['北京', '上海'],
      dataCity: [
        {
          name: '北京',
          articles: [
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度',
              id: 0
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            }
          ]
        },
        {
          name: '上海',
          articles: [
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            }
          ]
        },
        {
          name: '深圳',
          articles: [
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            },
            {
              imgUrl: '../../assets/images/house1.png',
              title: '大中华区物业摘要望',
              date: '第一季度'
            }
          ]
        }
      ],
      restaurants: [],
      keyValue: '',
      messDate: [
        '第一个提示',
        '第一个提示',
        '第一个提示'
      ],
      dialogFormVisible: {
        visibleA: false
      },
      isShow: false
    }
  },
  created () {
    // 初始tab
    this.activeName = this.selectedCity[0]
  },
  methods: {
    showModel () {
      this.dialogFormVisible.visibleA = true
    },
    getMess () {
      // getMess
      this.isShow = true
    },
    getArticles (item) {
      // getarticles
      this.isShow = false
    },
    hideMess () {
      setTimeout(() => {
        this.isShow = false
      }, 0)
    },
    changeD (data) {
      this.selectedCity = data
    }
  },
  components: {
    bannerHouse,
    addressForm
  }
}
</script>
<style lang="scss" scoped>
.card-list {
  position: relative;
  display: block;
  width: 1160px;
  margin: 4px auto 0;

  .input-box {
    position: absolute;
    width: 100%;
    right: 0;
    top: 72px;
    text-align: center;
    z-index: 100;

    .mess-box {
      position: absolute;
      left: 243px;
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

    .map-btn {
      position: absolute;
      right: 140px;
      top: 0;
      box-sizing: border-box;
      width: 80px;
      height: 36px;
      border: 1px solid #20a0ff;
      border-radius: 3px;
      color: #20a0ff;
      line-height: 36px;
      font-size: 14px;

      img {
        margin-right: 4px;
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

.clearM {
  margin-left: 0;
}

.linkA {
  display: block;

  span {
    color: #1F2D3D;
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