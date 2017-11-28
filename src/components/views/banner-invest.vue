<template>
  <div class="banner-box">
    <img class="img-box" src="../../assets/images/banner-bg.jpg">
    <section class="banner-f">
      <el-carousel :interval="4000" type="card" height="310px">
        <el-carousel-item v-for="(item, index) in bannerData" :key="index">
          <img class="img-invest" :src="item.imgUrl">
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>
<script>
import Tools from '../../utils/tools.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      listDatas: [],
      bannerData: [
        {
            imgUrl: '/static/images/ip_big1.jpg',
            des: '投资机构数据库'
        },
        {
            imgUrl: '/static/images/ip_big2.jpg',
            des: '商业地产数据库'
        },
        {
            imgUrl: '/static/images/ip_big3.jpg',
            des: '商业地产证券化数据库'
        }
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
  created () {
  },
  methods: {
    getData () {
      this.getEcharts()
      this.getDatas()
    },
    // 获取资金排名数据
    getDatas () {
      this.pageInfo = this.$store.getters.getPageInfo
      Tools.getJson('rents', this.pageInfo, (res) => {
        if (res.success === '1') {
          this.listDatas = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss">
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
    }
  }
}
</style>
