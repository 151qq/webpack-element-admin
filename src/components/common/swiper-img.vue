<template>
  <popup
      :is-show="popupO.isShow"
      :is-del="false"
      :is-btn="false"
      :color="'transparent'"
      :width="'800px'"
      :top="'10%'">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in bigImgs"><img :src="item"></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </popup>
</template>
<script>
import popup from './popup.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    isShow: Object,
    index: Number,
    bigImgs: Array
  },
  data () {
    return {
      notNextTick: true,
      swiperOption: {
        // swiper optionss 所有的配置同swiper官方api配置
        direction: 'horizontal',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        mousewheelControl: true,
        observeParents: true
      },
      popupO: {
        isShow: this.isShow
      }
    }
  },
  watch: {
    index () {
      this.$refs.mySwiper.swiper.slideTo(this.index)
    }
  },
  components: {
    popup,
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss" scoped>
  .swiper-slide img {
    width: 100%;
  }

  .swiper-button-prev {
    left: -70px;
    background-color: #000000;
    padding: 30px;
    margin-top: -5px;
    opacity: 0.9;
  }

  .swiper-button-next {
    right: -70px;
    background-color: #000000;
    padding: 30px;
    margin-top: -5px;
    opacity: 0.9;
  }

  .swiper-button-disabled {
    pointer-events: all;
    opacity: 0.35;
  }
</style>