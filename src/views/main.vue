<template>
  <div class="hello">
    <sys-header></sys-header>
    <section class="main">
      <div class="menu">
        <sys-menu></sys-menu>
      </div>
      <div class="content">
        <router-view></router-view>
        <sys-footer></sys-footer>
      </div>
    </section>
  </div>
</template>

<script>
import sysHeader from '../components/common/header'
import sysFooter from '../components/common/footer'
require('../assets/sass/main.scss')
import sysMenu from '../components/common/menu'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    sysHeader,
    sysMenu,
    sysFooter
  }
}
</script>

<style lang="scss">
  .main {
    width: 100%;
    .menu {
      width: 220px;
      border-right: solid 1px #e1e1e1;
      position: fixed;
      top: 45px;
      left: 0;
    }
    .content {
      margin-left: 220px;
      margin-top: 45px;
    }
  }
  .scrollY {
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
