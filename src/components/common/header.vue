<template>
  <el-row class="header">
    <el-col :span="3"><div class="grid-content bg-purple">云沃客管理系统</div></el-col>
    <el-col :span="2" :offset="19">欢迎您~</el-col>
  </el-row>
</template>
<script>
export default {
}
</script>
<style lang="scss">
  .header {
    height: 45px;
    width: 100%;
    line-height: 45px;
    background: #58B7FF;
    color: #fff;
    padding: 0 20px;
    position: fixed;
    top: 0;
    z-index: 20;
  }
</style>
