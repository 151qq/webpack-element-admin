<template>
  <div class="menuLeft">
    <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
      <!-- <el-menu-item index="1" :route="{path: '/'}"><i class="el-icon-menu"></i>结构图</el-menu-item> -->
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
          <el-menu-item :route="{path: '/'}" index="2-1">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-edit"></i>内容管理</template>
          <el-menu-item :route="{path: '/content/category'}" index="3-1">分类管理</el-menu-item>
          <el-menu-item :route="{path: '/content/topic'}" index="3-2">话题管理</el-menu-item>
          <el-menu-item :route="{path: '/content/question'}" index="3-3">问答管理</el-menu-item>
          <el-menu-item :route="{path: '/content/article'}" index="3-4">干货管理</el-menu-item>
          <el-menu-item :route="{path: '/content/comment'}" index="3-5">评论管理</el-menu-item>
          <el-menu-item :route="{path: '/content/answer'}" index="3-6">答案管理</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="4">
        <template slot="title"><i class="el-icon-share"></i>帮助中心</template>
          <el-menu-item :route="{path: '/help/category'}" index="4-1">帮助分类</el-menu-item>
          <el-menu-item :route="{path: '/help/article'}"index="4-2">文章列表</el-menu-item>
      </el-submenu> -->
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-document"></i>数据灌入</template>
          <el-menu-item :route="{path: '/article/list'}" index="5-1">待灌文章列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
  <script>
  import $ from 'webpack-zepto'
  export default {
    mounted () {
      let winHeight = $(window).height() - 45
      $('.menuLeft').css({height: winHeight})
      $('.menuLeft').addClass('scrollY')
    }
  }
  </script>
