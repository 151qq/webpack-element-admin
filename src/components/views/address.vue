<template>
    <el-dialog title="选择定制城市" v-model="dialogFormVisible.visibleA" size="tiny">
        <el-checkbox-group v-model="checkL">
          <el-checkbox class="check-box" v-for="(item, index) in citys" :label="item"></el-checkbox>
        </el-checkbox-group>
        <div class="mess">{{mess}}</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeWindow">取 消</el-button>
            <el-button type="primary" @click="editWindow">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  props: {
    citys: {
      type: Array,
      default: []
    },
    checkList: {
      type: Array,
      default: []
    },
    dialogFormVisible: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      checkL: [],
      mess: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.checkL = this.checkList.concat([])
    }, 0)
  },
  methods: {
    closeWindow () {
      this.checkL = this.checkList.concat([])
      this.dialogFormVisible.visibleA = false
    },
    editWindow () {
      this.$emit('sendD', this.checkL.concat([]))
      this.dialogFormVisible.visibleA = false
    }
  },
  watched: {
    checkL (data) {
      if (data.length >= 5) {
        this.mess = '*最多只能选五个城市'
      } else {
        this.mess = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .check-box {
    display: block;
    margin: 0 0 10px !important;
  }
</style>