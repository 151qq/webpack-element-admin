<template>
    <section class="map-box">
        <div class="input-box">
            <el-input 
              placeholder="请输入需查询的楼盘地址"
              v-model="keyValue"
              style="width: 600px;"
              >
            </el-input>
            <el-button class="search-btn" type="primary" icon="search" @click="getAddres(keyValue)">
              搜索
            </el-button>

            <span class="dropdown-link" @click="searSlide">
                高级检索<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
        </div>
        <div :class="isShow ? 'sear-box hide-sear' : 'sear-box'">
            <section class="sec">
                <label class="t-n">区域:</label>
                <div class="s-c">
                    <p class="area-t">
                        <a>全部</a>
                        <a>海淀</a>
                        <a>朝阳</a>
                    </p>
                    <p class="area-b">
                        <a>全部</a>
                        <a>海淀</a>
                        <a>朝阳</a>
                    </p>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">等级:</label>
                <div class="s-c">
                    <el-checkbox class="all-c" label="全部" v-model="ischeckD"></el-checkbox>
                    <el-checkbox-group v-model="checkD">
                        <el-checkbox label="超甲"></el-checkbox>
                        <el-checkbox label="甲级"></el-checkbox>
                        <el-checkbox label="乙级"></el-checkbox>
                        <el-checkbox label="丙级及以下"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">租金:</label>
                <div class="s-c">
                    <el-checkbox class="all-c" label="全部" v-model="ischeckZ"></el-checkbox>
                    <el-checkbox-group v-model="checkZ">
                        <el-checkbox label=">20"></el-checkbox>
                        <el-checkbox label="20~15"></el-checkbox>
                        <el-checkbox label="15~10"></el-checkbox>
                        <el-checkbox label="10~5"></el-checkbox>
                        <el-checkbox label="5以下"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">持有:</label>
                <div class="s-c">
                    <el-checkbox class="all-c" label="全部" v-model="ischeckC"></el-checkbox>
                    <el-checkbox-group v-model="checkC">
                        <el-checkbox label="整体持有"></el-checkbox>
                        <el-checkbox label="散售"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">面积:</label>
                <div class="s-c">
                    <el-checkbox class="all-c" label="全部" v-model="ischeckM"></el-checkbox>
                    <el-checkbox-group v-model="checkM">
                        <el-checkbox label=">10万平方米"></el-checkbox>
                        <el-checkbox label="8~10万平方米"></el-checkbox>
                        <el-checkbox label="5~8万平方米"></el-checkbox>
                        <el-checkbox label="<3万平方米"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
        </div>
        <div id="container"></div>
    </section>
</template>
<script>
import WindowOverlay from '../../utils/common/mapOverlay.js'

export default {
  data () {
    return {
      isShow: false,
      checkD: [],
      checkZ: [],
      checkC: [],
      checkM: [],
      ischeckD: false,
      ischeckZ: false,
      ischeckC: false,
      ischeckM: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      var map = new window.BMap.Map('container')
      var point = new window.BMap.Point(116.409, 39.918)
      map.centerAndZoom(point, 15)

      var opts = {
        width: 140,
        height: 100,
        template: this.createTemplate('href', '唤云高花园小区', 12.3, 13.2)
      }

      var windowInfo = new WindowOverlay(point, opts)

      map.addOverlay(windowInfo)
    })
  },
  methods: {
    searSlide () {
      this.isShow = !this.isShow
    },
    createP (title, price) {
      var p1 = document.createElement('p')
      p1.style.height = '30px'
      p1.style.fontSize = '13px'
      p1.style.lineHeight = '30px'

      var span2 = document.createElement('span')
      span2.style.float = 'left'
      span2.style.width = '30px'
      span2.style.color = '#99A9BF'
      span2.innerHTML = title

      var span3 = document.createElement('span')
      span3.style.float = 'left'
      span3.style.width = '30px'
      span3.style.textAlign = 'right'
      span3.style.color = '#FF4949'
      span3.innerHTML = price

      var span4 = document.createElement('span')
      span4.style.float = 'right'
      span4.style.width = '47px'
      span4.style.textAlign = 'right'
      span4.style.color = '#99A9BF'
      span4.innerHTML = '元 ㎡/天'
      p1.appendChild(span2)
      p1.appendChild(span3)
      p1.appendChild(span4)

      return p1
    },
    createTemplate (href, title, price1, price2) {
      var a = document.createElement('a')
      a.style.display = 'block'
      a.style.background = '#0053FF'
      a.style.color = '#ffffff'
      a.style.lineHeight = '36px'
      a.style.height = '36px'
      a.style.fontSize = '14px'
      a.style.padding = '0 14px'
      a.setAttribute('href', href)
      a.innerHTML = title

      var span1 = document.createElement('span')
      span1.style.float = 'right'
      span1.innerHTML = '>'
      a.appendChild(span1)

      var div = document.createElement('div')
      div.style.padding = '4px 14px'

      div.appendChild(this.createP('租金', price1))
      div.appendChild(this.createP('估值', price2))

      var outDiv = document.createElement('div')
      outDiv.appendChild(a)
      outDiv.appendChild(div)
      return outDiv
    }
  }
}
</script>
<style lang="scss" scoped>
.map-box {
    #container {
      height: 520px;
      margin-top: 10px;
    }

    .el-dropdown {
        display: block;
        width: 1160px;
        margin: 10px auto 0;

    }
    .input-box {
        display: block;
        width: 1160px;
        margin: 10px auto 0;

        .el-input {
          display: inline-block;
        }

        .search-btn {
          position: relative;
          display: inline-block;
          margin-left: -10px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .dropdown-link {
            float: right;
            width: 120px;
            height: 36px;
            border: 1px solid #20a0ff;
            border-radius: 3px;
            color: #20a0ff;
            line-height: 36px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            transition: all 0.15s;

            i {
                margin-left: 10px;
            }

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .sear-box {
        height: 0;
        opacity: 0;
        display: block;
        width: 1160px;
        margin: 10px auto 0;
        transition: all 0.5s ease;

        .sec {
          overflow: hidden;
          padding: 4px 0;
          border-top: 1px solid #EFF2F7;
        }

        .t-n {
            float: left;
            width: 40px;
            font-size: 12px;
            color: #475669;
            line-height: 30px;
        }

        .s-c {
            float: right;
            width: 1110px;

            .area-t {
              padding: 0 6px;

              a {
                display: inline-block;
                font-size: 12px;
                color: #475669;
                line-height: 30px;
                margin-right: 40px;
              }
            }

            .area-b {
              background: #F0F0F0;
              padding: 6px;

              a {
                display: inline-block;
                font-size: 12px;
                color: #475669;
                line-height: 30px;
                margin-right: 40px;
              }
            }
        }

        .el-checkbox-group {
          display: inline-block;
          line-height: 30px;

          span {
            font-size: 12px;
            color: #475669;
          }
        }

        .all-c {
          display: inline-block;
          margin-right: 15px;
          line-height: 30px;

          span {
            font-size: 12px;
            color: #475669;
          }
        }
    }

    .hide-sear {
      height: auto;
      opacity: 1;
    }
}
</style>