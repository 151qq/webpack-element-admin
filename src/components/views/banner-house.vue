<template>
  <div class="banner-box">
  	<img class="img-box" src="../../assets/images/banner-bg.png">
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .banner-box {
  	position: relative;
  	width: 100%;
  	height: 450px;

  	.img-box {
  	  position: absolute;
  	  left: 50%;
  	  top: 0;
  	  margin-left: -50%;
      display: block;
      width: 1440px;
      height: 450px;
  	}
  }
</style>