<template>
  <div class="btns-b">
    <a class="btn" :href="downUrl" :download="fileName">
      <img src="../../assets/images/download.png">
    </a>
    <a class="btn">
      <img src="../../assets/images/wx.png">
    </a>
    <a class="btn" @click="showModel">
      <img src="../../assets/images/mail.png">
    </a>
    <!-- <a class="btn">
      <img src="../../assets/images/print.png">
    </a> -->

    <email :visible-data="visibleData" :id-type="itemId"></email>
  </div>
</template>
<script>
import email from './email.vue'

export default {
  props: ['downUrl', 'fileName', 'idType'],
  data () {
    return {
      visibleData: {
        value: false
      },
      itemId: ''
    }
  },
  created () {
    this.itemId = this.idType
  },
  methods: {
    showModel () {
      this.visibleData.value = true
    }
  },
  components: {
    email
  }
}
</script>
<style lang="scss">
.btns-b {
  display: inline-block;

  .btn {
    height: 16px;
    display: inline-block;
    padding-left: 10px;
    border-left: 1px solid #C0CCDA;
    margin-left: 10px;

    &:first-child {
      border: none;
    }

    img {
      position: relative;
      top: -2px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>