<template>
  <div class="btns-b">
    <a class="btn" :href="downUrl" :download="fileName">
      <img src="../../assets/images/download.png">
    </a>
    <a class="btn" @click="showE">
      <img src="../../assets/images/wx.png">
    </a>
    <a class="btn" @click="showModel">
      <img src="../../assets/images/mail.png">
    </a>
    <!-- <a class="btn">
      <img src="../../assets/images/print.png">
    </a> -->

    <email :visible-data="visibleData" :id-type="itemId"></email>
    <show-ewm :dialog-visible="dialogVisible" :path="urlPath"></show-ewm>
  </div>
</template>
<script>
import email from './email.vue'
import showEwm from './show-ewm.vue'

export default {
  props: ['downUrl', 'fileName', 'idType', 'path'],
  data () {
    return {
      dialogVisible: {
        value: false
      },
      visibleData: {
        value: false
      },
      itemId: '',
      urlPath: ''
    }
  },
  created () {
    this.itemId = this.idType
    this.urlPath = this.path
  },
  watch: {
    path (value) {
      this.urlPath = value
    }
  },
  methods: {
    showModel () {
      this.visibleData.value = true
    },
    showE () {
      this.dialogVisible.value = true
    }
  },
  components: {
    email,
    showEwm
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