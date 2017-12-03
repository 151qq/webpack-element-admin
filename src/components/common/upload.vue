<template>
  <div>
    <section class="upload-box">
      <label class="img-big" :for="idFor">
        <img v-if="!curPath && !bgPath"
            src="../../assets/images/img-default.jpg">
        <img v-if="!curPath && bgPath"
            src="../../assets/images/page-img.jpg">
        <img v-else class="img-big" :src="curPath">
      </label>
      <input type="file" class="ben-input" :id="idFor" @change="postImg($event)">
      <section v-if="isBtn">
        <el-button v-if="!noSave"
            class="op-btn"
            type="info"
            :plain="true"
            size="small"
            icon="document"
            @click="savePath">保存</el-button>
        <el-button v-if="!noDel"
            class="op-btn"
            type="danger"
            :plain="true"
            size="small"
            icon="delete"
            @click="deleImg">删除</el-button>

        <el-button v-if="!noDel"
            class="op-btn"
            type="danger"
            :plain="true"
            size="small"
            icon="delete"
            @click="deleImg">移动</el-button>
      </section>
    </section>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util'

export default {
    props: ['path', 'num', 'noDel', 'idx', 'isBtn', 'bgPath', 'noSave', 'idName', 'isHouseId'],
    data() {
      return {
        isShow: false,
        curPath: '',
        idFor: ''
      }
    },
    mounted () {
      this.idFor = this.idName ? this.idName : 'upload-file-single'
      this.curPath = this.path
    },
    watch: {
      path () {
        this.curPath = this.path
      },
      idName () {
        this.idFor = this.idName ? this.idName : 'upload-file-single'
      }
    },
    methods: {
      deleImg () {
        var data = {
          index: this.num,
          id: this.idx
        }
        this.$emit('delImg', data)
      },
      postImg (e) {
        var opotion = {
          url: 'uploadArticleAreaImage',
          event: e
        }

        if (this.isHouseId) {
          opotion.data = {}
          opotion.data.fileCode = localStorage.getItem('id')
        }

        util.uploadFile(opotion).then(res => {
          let imgUrl = res.result.result[0]
          this.curPath = imgUrl
          var data = {
            index: this.num,
            url: this.curPath,
            id: this.idx
          }
          this.$emit('changeImg', data)
        })
      },
      resetPath () {
        this.curPath = ''
        var data = {
          index: this.num,
          url: '',
          id: this.idx
        }
        this.$emit('changeImg', data)
      },
      savePath () {
        this.$emit('saveImg')
      }
    }
}
</script>

<style lang="scss">
.upload-box {
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .img-big {
    display: block;
    width: 100%;
    height: auto;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .ben-input {
    display: none;
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}
</style>