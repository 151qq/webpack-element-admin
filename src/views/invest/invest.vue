<template>
  <section class="invest-list-box">
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
    <el-row class="el-box">
      <el-col
          :class="index % 4 == 0 ? 'card-b clearM' : 'card-b'"
          :span="6"
          v-for="(o, index) in investList">
        <router-link class="linkA" target="_blank" :to="{ name: 'invest-detail', params: { id: o.id }}">
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
      investList : [
        {
          id: 0,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构一'
        },
        {
          id: 1,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构二'
        },
        {
          id: 2,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构三'
        },
        {
          id: 3,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构四'
        },
        {
          id: 4,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构五'
        },
        {
          id: 5,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构六'
        },
        {
          id: 5,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构七'
        },
        {
          id: 7,
          imgUrl: '/static/images/detial1.png',
          title: '投资机构一'
        }
      ],
      searchTypeName: '1'
    }
  },
  created () {
    document.title = '投资机构'
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
.invest-list-box {
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
