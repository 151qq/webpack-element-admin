<template>
  <div class="hello">
    <prato-header></prato-header>
    <section class="content">
      <router-view></router-view>
    </section>
    <prato-footer></prato-footer>
  </div>
</template>

<script>
import pratoHeader from '../components/common/header'
import pratoFooter from '../components/common/footer'
require('../assets/sass/main.scss')
export default {
  data () {
    return {
    }
  },
  components: {
    pratoHeader,
    pratoFooter
  }
}
</script>

<style lang="scss">
  .content {
    min-height: 400px;
  }
</style>
