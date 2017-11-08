<template>
  <section class="sec-list-box">
    <div class="search-select-box">
      <el-input placeholder="请输入内容"
                class="search-key"
                v-model="input5"
                size="small">
        <el-button slot="append" icon="search">搜索</el-button>
      </el-input>

      <el-select v-model="searchTypeName"
                  placeholder="请选择"
                  class="search-type"
                  size="small">
        <el-option
          v-for="(item, index) in searchType"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="list-box">
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
    </div>
  </section>
</template>
<script>
import Tools from '../../utils/tools.js'

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
          imgUrl: '/static/images/bench1.png',
          name: '第一证券',
          code: '2243433',
          property: '第一物业',
          address: '北京市朝阳区soho大厦',
          publish: '伦敦交易所',
          status: 1,
          value: 1223,
          href: 'www.baidu.com'
        },
        {
          id: 1,
          imgUrl: '/static/images/bench1.png',
          name: '第一证券',
          code: '2243433',
          property: '第一物业',
          address: '北京市朝阳区soho大厦',
          publish: '伦敦交易所',
          status: 1,
          value: 1223,
          href: 'www.baidu.com'
        },
      ],
      searchTypeName: '1'
    }
  },
  created () {
    
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
.sec-list-box {
  width: 1160px;
  margin: 30px auto;

  .search-select-box {
    text-align: center;

    .el-input__inner {
      height: 36px;
    }

    .search-key {
      width: 600px;
      height: 36px;
    }

    .search-type {
      display: inline-block;
    }
  }

  .list-box {
    margin-top: 30px;
  }

  .list-card {
    display: block;
    padding-bottom: 15px;
    margin-top: 15px;
    overflow: hidden;
    border-bottom: 1px solid #EFF2F7;

    .img-left {
      width: 200px;
      height: 130px;
      float: left;
    }

    .con-right {
      width: 887px;
      float: right;
      height: 130px;
    }
  }

  .out-box {
    overflow: hidden;

    .base-b {
        float: left;
        width: 270px;
        margin-right: 20px;
        margin-bottom: 10px;

        .title {
            float: left;
            width: 120px;
            font-size: 14px;
            line-height: 24px;
            color: #666666;
        }

        .base-content {
            float: right;
            width: 150px;
            font-size: 14px;
            line-height: 24px;
            color: #000000;
        }
    }

    .big-b {
        width: 740px;

        .base-content {
            width: 620px;
        }
    }

    .mid-b {
        width: 380px;

        .base-content {
            width: 260px;
        }
    }
  }
}
</style>
