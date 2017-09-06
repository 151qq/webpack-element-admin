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
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <swiper-slide><img src="../../assets/images/img1.png"></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </popup>
</template>
<script>
import popup from './popup.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    isShow: Object,
    index: Number
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
  mounted () {
    this.$refs.mySwiper.swiper.slideTo(this.index)
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
</style>