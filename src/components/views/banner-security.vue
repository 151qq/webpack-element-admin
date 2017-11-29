<template>
  <div class="banner-security">
    <img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
        <el-carousel :interval="4000" type="card" height="310px">
          <el-carousel-item v-for="(item, index) in bannerData" :key="index">
            <img class="img-invest" :src="item">
          </el-carousel-item>
        </el-carousel>
    </section>
  </div>
</template>
<script>

export default {
  props: ['bannerList'],
  data () {
    return {
      listDatas: [],
      bannerData: [
        '/static/images/ip_big1.jpg',
        '/static/images/ip_big2.jpg',
        '/static/images/ip_big3.jpg'
      ],
      currentIndex: 0,
      swiperOption: {
        // swiper optionss 所有的配置同swiper官方api配置
        autoplay: 5000,
        initialSlide: 1,
        loop: true,
        direction: 'horizontal',
        mousewheelControl: true,
        observeParents: true,
        onSlideChangeEnd: swiper => {
            this.currentIndex = swiper.realIndex
        }
      }
    }
  },
  methods: {
    setData () {
      this.bannerData = this.bannerList.concat(this.bannerData).splice(0, 3)
    }
  }
}
</script>
<style lang="scss">
.banner-security {
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

  .banner-f {
    position: absolute;
    width: 1160px;
    height: 370px;
    left: 50%;
    top: 50%;
    margin: -185px 0 0 -580px;
    overflow: hidden;
    background: #ffffff;

    .el-carousel {
      margin-top: 20px;

      .img-invest {
        display: block;
        height: 100%;
      }
    }
  }
}
</style>
