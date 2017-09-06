<template>
  <div class="popup-box" v-show="isShow.value">
    <div class="popup-bg" @click="closePoP"></div>
    <div class="popup-in" :style="{width: width, backgroundColor: color, top: top}">
      <p class="title">{{ title }}</p>
      <a class="del-btn" v-if="isDel" @click="closePoP">X</a>
      <slot></slot>
      <p class="btn-box" v-if="isBtn">
        <a class="right" @click="rightCF">{{ rightText }}</a>
        <a class="left" @click="leftCF">{{ leftText }}</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '600px'
    },
    top: {
      type: String,
      default: '20%'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    title: {
      type: String,
      default: '提示'
    },
    isDel: {
      type: Boolean,
      default: true
    },
    isBtn: {
      type: Boolean,
      default: true
    },
    rightText: {
      type: String,
      default: '确定'
    },
    leftText: {
      type: String,
      default: '取消'
    },
    isShow: {
      type: Object,
      default () {
        return {
          value: false
        }
      }
    },
    rightCb: {
      type: Function,
      default () {
        this.closePoP()
      }
    },
    leftCb: {
      type: Function,
      default () {
        this.closePoP()
      }
    }
  },
  mounted () {
    // console.log(this.rightCb, 'pop')
  },
  methods: {
    closePoP () {
      this.isShow.value = false
    },
    rightCF () {
      this.rightCb()
    },
    leftCF () {
      this.leftCb()
    }
  }
}
</script>
<style lang="scss">
.popup-box {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
    transition: all 0.3s;

    .popup-bg {
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.5;
    }

    .popup-in {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        border-radius: 10px;
        padding: 20px 30px;

        .title {
            font-size: 16px;
            color: #000000;
            height: 20px;
            line-height: 20px;
            margin-bottom: 20px;
        }

        .del-btn {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 16px;
            color: #000000;
            height: 20px;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }
        }

        .btn-box {
            overflow: hidden;
            margin-top: 20px;

            a {
                float: right;
                margin-left: 20px;
                background: #d0d0d0;
                padding: 6px 14px;
                border-radius: 3px;
                font-size: 14px;
                color: #ffffff;
                transition: all 0.3s;
                cursor: pointer;

                &:hover {
                    opacity: 0.8;
                }
            }

            .right {
                background: #20a0ff;
            }
        }
    }
}
</style>