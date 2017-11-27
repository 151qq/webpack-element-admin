<template>
  <section class="sec-list-box">
    <div class="search-select-box">
      <search-security></search-security>
    </div>
    <!-- <div class="list-box">
      <a class="list-card"
                  v-for="(item, index) in securityList"
                  :href="item.href">
        <img class="img-left" :src="item.imgUrl">
        <div class="con-right">
          <div class="out-box list-in">
            <p class="base-b mid-b">
                <span class="title">产品名称：</span>
                <span class="base-content">{{item.name}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">证券代码：</span>
                <span class="base-content">{{item.code}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">相关物业：</span>
                <span class="base-content">{{item.property}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">地址：</span>
                <span class="base-content">{{item.address}}</span>
            </p>
            <p class="base-b big-b">
                <span class="title">发行机构：</span>
                <span class="base-content">{{item.publish}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">状态：</span>
                <span class="base-content">{{item.isList ? '已上市' : '未上市'}}</span>
            </p>
            <p class="base-b mid-b">
                <span class="title">最新市值：</span>
                <span class="base-content">{{item.value}}万元</span>
            </p>
          </div>
        </div>
      </a>
    </div> -->
    <el-row class="el-box">
      <el-col
          :class="index % 4 == 0 ? 'card-b clearM' : 'card-b'"
          :span="6"
          v-for="(o, index) in securityList">
        <router-link class="linkA" target="_blank" :to="{ name: 'security-detail', params: { id: o.id }}">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.imgUrl" class="image">
            <div style="padding: 14px;">
              <span>{{ o.title }}</span>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import Tools from '../../utils/tools.js'
import searchSecurity from '../../components/common/search-security.vue'

export default {
  data () {
    return {
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
      ],
      securityList: [
        {
          id: 0,
          imgUrl: '/static/images/detial1.png',
          title: '证券一'
        },
        {
          id: 1,
          imgUrl: '/static/images/detial1.png',
          title: '证券二'
        },
        {
          id: 2,
          imgUrl: '/static/images/detial1.png',
          title: '证券三'
        },
        {
          id: 3,
          imgUrl: '/static/images/detial1.png',
          title: '证券四'
        },
        {
          id: 4,
          imgUrl: '/static/images/detial1.png',
          title: '证券五'
        },
        {
          id: 5,
          imgUrl: '/static/images/detial1.png',
          title: '证券六'
        },
        {
          id: 5,
          imgUrl: '/static/images/detial1.png',
          title: '证券七'
        },
        {
          id: 7,
          imgUrl: '/static/images/detial1.png',
          title: '证券一'
        }
      ],
      searchTypeName: '1'
    }
  },
  created () {
    document.title = '商业楼盘证券'
  },
  methods: {
    
  },
  components: {
    searchSecurity
  }
}
</script>
<style lang="scss">
.sec-list-box {
  width: 1160px;
  margin: 30px auto;

  .search-select-box {
    text-align: center;
  }

  .el-box {
    margin-top: 30px;
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
}
</style>
