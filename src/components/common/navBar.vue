<template>
  <section class="nav-bar">
    <h1 class="title">
      <b v-text="title"></b>
      <span class="label" v-text="label"></span>
    </h1>

    <el-breadcrumb class="crumb" separator="/">
      <template v-for="item in crumbs" >
        <el-breadcrumb-item :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </section>
</template>

<script>
  export default {
    props: {
      title: String,
      label: String,
      crumbs: Array
    }
  }
</script>
<style lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #eff2f7;
  height: 50px;
  border-bottom: solid 1px #e1e1e1;

  .title {
    font-size: 24px;
    font-weight: 600px;
  }
  .label {
    font-size: 14px;
    text-align: left;
    font-weight: normal;
    text-indent: 20px;
    display: inline-block;
    color: #666;
  }
}
</style>
