<template>
  <div class="img-box">
    <section class="img-boxs">
      <p>外观</p>
      <div>
        <img v-for="item in imgs.appearance" @click="showImg" :src="item">
      </div>
    </section>
    <section class="img-boxs">
      <p>公共区域</p>
      <div>
        <img v-for="item in imgs.public" @click="showImg" :src="item">
      </div>
    </section>
    <section class="img-boxs">
      <p>周边环境</p>
      <div>
        <img v-for="item in imgs.surround" @click="showImg" :src="item">
      </div>
    </section>

    <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
  </div>
</template>
<script>
import swiperImg from '../../components/common/swiper-img.vue'
import $ from 'Jquery'

export default {
  props: ['imgs', 'bigImgs'],
  data () {
    return {
      notNextTick: true,
      swiperOption: {
        // swiper optionss 所有的配置同swiper官方api配置
        direction: 'horizontal',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        mousewheelControl: true,
        onTransitionStart (swiper) {
          console.log(swiper)
        }
      },
      isShow: {
        value: false
      },
      index: 2
    }
  },
  methods: {
    showImg (e) {
      this.index = $('.img-box img').index($(e.target))
      this.isShow.value = true
    }
  },
  components: {
    swiperImg
  }
}
</script>
<style lang="scss" scoped>
  @import url("../../assets/sass/common/swiper.min.css");

  .img-box {
    position: relative;
    width: 1160px;
    margin: 10px auto;

    .img-boxs {

      p {
        font-size: 20px;
        color: #000000;
        line-height: 28px;
        margin-bottom: 20px;
      }

      div {
        width: 110%;
        overflow: hidden;

        img {
          float: left;
          width: 270px;
          height: 180px;
          margin: 0 26px 20px 0;
          cursor: pointer;
        }
      }
    }
  }
</style>