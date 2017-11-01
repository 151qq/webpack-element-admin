<template>
    <section class="map-box">
        <div class="input-box">
            <search-box :is-page="true" @mapChange="setKey"></search-box>

            <span class="dropdown-link" @click="searSlide">
                高级检索<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
        </div>
        <div :class="isShow ? 'sear-box hide-sear' : 'sear-box'">
            <section class="sec">
                <label class="t-n">区域:</label>
                <!-- <div class="s-c">
                    <p class="area-t">
                        <a @click="nowIndex = 'all'" :class="nowIndex === 'all' ? 'active' : ''">全部</a>
                        <a v-for="item in typeData.area" @click="tabChange(item.city)"
                            :class="item.city === nowIndex ? 'active' : ''">{{item.city}}</a>
                    </p>
                    <p v-for="item in typeData.area" class="area-b" v-if="item.city === nowIndex">
                        <a @click="countyIndex = 'all'" :class="countyIndex === 'all' ? 'active' : ''">全部</a>
                        <a v-for="o in item.county"
                            :class="o === countyIndex ? 'active' : ''"
                            @click="countyIndex = o">{{o}}</a>
                    </p>
                </div> -->
                <div class="s-c">
                    <span>
                      <el-checkbox class="all-c" label="全部" v-model="ischeckA"
                          @change="levelAll('ischeckA', 'circleCode', 'tradeList')"></el-checkbox>
                    </span>
                    <el-checkbox-group class="more-box" v-model="formData.fileter.circleCode"
                        @change="levelChange('ischeckA', 'circleCode', 'tradeList')">
                        <el-checkbox v-for="(item, index) in typeData.tradeList"
                                      :label="item.nodeCode"
                                      >{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">等级:</label>
                <div class="s-c">
                    <span>
                      <el-checkbox class="all-c" label="全部" v-model="ischeckD"
                          @change="levelAll('ischeckD', 'housesGrade', 'level')"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="formData.fileter.housesGrade"
                        @change="levelChange('ischeckD', 'housesGrade', 'level')">
                        <el-checkbox v-for="(item, index) in typeData.level"
                                      :label="item.dictKeyCode"
                                      >{{item.dictKeyValue}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">租金:</label>
                <div class="s-c">
                    <span>
                      <el-checkbox class="all-c" label="全部" v-model="ischeckZ"
                          @change="levelAll('ischeckZ', 'rentValue', 'rent')"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="formData.fileter.rentValue"
                        @change="levelChange('ischeckZ', 'rentValue', 'rent')">
                        <el-checkbox v-for="(item, index) in typeData.rent"
                                      :label="item.dictKeyCode"
                                      >{{item.dictKeyValue}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">持有:</label>
                <div class="s-c">
                    <span>
                      <el-checkbox class="all-c" label="全部" v-model="ischeckC"
                          @change="levelAll('ischeckC', 'propertyHolder', 'hold')"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="formData.fileter.propertyHolder"
                        @change="levelChange('ischeckC', 'propertyHolder', 'hold')">
                        <el-checkbox v-for="(item, index) in typeData.hold"
                                      :label="item.dictKeyCode"
                                      >{{item.dictKeyValue}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">面积:</label>
                <div class="s-c">
                    <span>
                      <el-checkbox class="all-c" label="全部" v-model="ischeckM"
                          @change="levelAll('ischeckM', 'area', 'measure')"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="formData.fileter.area"
                        @change="levelChange('ischeckM', 'area', 'measure')">
                        <el-checkbox v-for="(item, index) in typeData.measure"
                                      :label="item.dictKeyCode"
                                      >{{item.dictKeyValue}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
        </div>
        <div id="container"></div>
    </section>
</template>
<script>
import WindowOverlay from '../../utils/common/mapOverlay.js'
import searchBox from '../../components/common/search-box.vue'
import Tools from '../../utils/tools.js'
import util from '../../assets/common/util.js'

export default {
  data () {
    return {
      isShow: false,
      checkD: [],
      checkZ: [],
      checkC: [],
      checkM: [],
      ischeckA: false,
      ischeckD: false,
      ischeckZ: false,
      ischeckC: false,
      ischeckM: false,
      pageInfo: {},
      typeData: {
        measure: [],
        floors: [],
        propertys: [],
        level: [],
        rent: [],
        hold: [],
        tradeList: []
      },
      count: 0,
      formData: {
        key: '',
        fileter: {
          cityCode: [],
          circleCode: [],
          housesGrade: [],
          rentValue: [],
          propertyHolder: [],
          area: []
        }
      }
    }
  },
  created () {
    this.setData()
    this.getTypes()
  },
  mounted () {
    this.$nextTick(() => {
      var map = new window.BMap.Map('container')
      this.map = map
      var point = new window.BMap.Point(116.409, 39.918)
      map.centerAndZoom(point, 15)
      map.addControl(new window.BMap.NavigationControl())
      this.drawMap()
    })
  },
  methods: {
    getTypes () {
      let formData = {
        city: this.$route.query.city
      }

      Tools.getJson('searchHousesKey', formData, (res) => {
        if (res.success == '1') {
          this.typeData = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getMap () {
      var count = this.count

      util.request({
        method: 'post',
        interface: 'searchMap',
        data: this.formData
      }).then(res => {
        if (res.result.success == '1') {
          if (count !== this.count) {
            return false
          }
          this.$store.dispatch('setMapInfo', res.result.result)
          this.drawMap()
        } else {
          this.$message.error(res.result.message)
        }
      })
    },
    tabChange (index) {
      this.nowIndex = index
      this.countyIndex = 'all'
    },
    levelAll (check, form, show) {
      if (this[check]) {
        this.formData.fileter[form] = this.typeData[show].map((item) => {
          if (item.nodeCode) {
            return item.nodeCode
          }
          return item.dictKeyCode
        })
      } else {
        this.formData.fileter[form] = []
      }
      this.count++
      this.getMap()
    },
    levelChange (check, form, show) {
      this[check] = this.formData.fileter[form].length == this.typeData[show].length
      this.count++
      this.getMap()
    },
    setKey (key) {
      if (key) {
        this.formData.key = key
      }
      this.getMap()
    },
    drawMap () {
      this.map.clearOverlays()
      this.drawOverlay(this.map, this.$store.getters.getMapInfo)
    },
    drawOverlay (map, datas) {
      var type = this.$route.params.type
      var pointList = []

      if (!datas || !datas.length) {
        var point = new window.BMap.Point(116.409, 39.918)
        map.centerAndZoom(point, 15)
        return
      }
      datas.forEach((item) => {
        var href = {
          name: 'info',
          params: {
            type: type,
            id: item.housesId
          }
        }

        var opts = {
          width: 160,
          height: 100,
          template: this.createTemplate(href, item.housesDesc, item.rentValue, item.rentUnit)
        }

        var point = new window.BMap.Point(item.housesGps.split[1], item.housesGps[0])
        pointList.push(point)
        var windowInfo = new WindowOverlay(point, opts)

        map.addOverlay(windowInfo)
      })
      var view = map.getViewport(pointList)
      map.setCenter(view.center)
      map.setZoom(view.zoom)
    },
    // 页面初始数据设置
    setData () {
      this.pageInfo = this.$store.getters.getPageInfo
    },
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
      span4.style.width = '60px'
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
      a.innerHTML = title.length > 6 ? title.substring(0, 6) + '...' : title
      a.onclick = () => {
        this.$router.push(href)
      }

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
  },
  components: {
    searchBox
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

        .dropdown-link {
            float: right;
            width: 120px;
            height: 36px;
            border: 1px solid #0053FF;
            border-radius: 3px;
            color: #0053FF;
            line-height: 36px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            transition: all 0.15s;
            margin-top: 7px;

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
                cursor: pointer;
              }

              .active {
                color: #20a0ff;
              }
            }

            .more-box {
              .el-checkbox {
                margin-left: 0;
                margin-right: 15px;
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
                cursor: pointer;
              }

              .active {
                color: #20a0ff;
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