<template>
  <div class="ewm-upload-box" :style="{width:width}">
    <label :for="idName">
      <img v-if="!curPath" class="img-big"
          src="../../assets/images/img-default.jpg">
      <img v-else class="img-big" :src="curPath">    
    </label>
    <input class="input-u" :id="idName" type="file" name="" @change="postImg">

    <input class="title-box" v-model="curTitle" @input="changeTitle" :placeholder="placeHolder">
  </div>
</template>
<script>
import util from '../../assets/common/util'

export default {
    props: ['path', 'titleName', 'idName', 'width', 'isDelete', 'placeHolder'],
    data() {
      return {
        curPath: '',
        curTitle: ''
      }
    },
    mounted () {
      this.curPath = this.path
      this.curTitle = this.titleName
    },
    watch: {
      path () {
        this.curPath = this.path
        this.curTitle = this.titleName
      }
    },
    methods: {
      changeTitle () {
        var data = {
          url: this.curPath,
          title: this.curTitle
        }

        this.$emit('changeImg', data)
      },
      postImg (e) {
        var opotion = {
          url: 'uploadArticleAreaImage',
          event: e,
          data: {
            fileCode: localStorage.getItem('id')
          }
        }

        util.uploadFile(opotion).then(res => {
          let imgUrl = res.result.result[0]
          this.curPath = imgUrl
          var data = {
            url: this.curPath,
            title: this.curTitle
          }
          this.$emit('changeImg', data)
        })
      }
    }
}
</script>

<style lang="scss">
.ewm-upload-box {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #f5f5f5;
  border-radius: 3px;

  .img-big {
    display: block;
    width: 100%;
    height: 160px;
  }

  .input-u {
    display: none;
  }

  .title-box {
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    border-top: 1px solid #f5f5f5;
    display: block;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}
</style>