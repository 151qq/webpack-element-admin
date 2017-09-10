<template>
    <section class="map-box">
        <div class="input-box">
            <search-box :is-page="true" @mapChange="drawMap"></search-box>

            <span class="dropdown-link" @click="searSlide">
                高级检索<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
        </div>
        <div :class="isShow ? 'sear-box hide-sear' : 'sear-box'">
            <section class="sec">
                <label class="t-n">区域:</label>
                <div class="s-c">
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
                </div>
            </section>
            <section class="sec">
                <label class="t-n">等级:</label>
                <div class="s-c">
                    <span @click="levelAll('D', 'level')">
                      <el-checkbox class="all-c" label="全部" v-model="ischeckD"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="checkD" @change="levelChange('D', 'level')">
                        <el-checkbox v-for="item in typeData.level" :label="item"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">租金:</label>
                <div class="s-c">
                    <span @click="levelAll('Z', 'rent')">
                      <el-checkbox class="all-c" label="全部" v-model="ischeckZ"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="checkZ" @change="levelChange('Z', 'rent')">
                        <el-checkbox v-for="item in typeData.rent" :label="item"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">持有:</label>
                <div class="s-c">
                    <span @click="levelAll('C', 'hold')">
                      <el-checkbox class="all-c" label="全部" v-model="ischeckC"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="checkC" @change="levelChange('C', 'hold')">
                        <el-checkbox v-for="item in typeData.hold" :label="item"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </section>
            <section class="sec">
                <label class="t-n">面积:</label>
                <div class="s-c">
                    <span @click="levelAll('M', 'measure')">
                      <el-checkbox class="all-c" label="全部" v-model="ischeckM"></el-checkbox>
                    </span>
                    <el-checkbox-group v-model="checkM" @change="levelChange('M', 'measure')">
                        <el-checkbox v-for="item in typeData.measure" :label="item"></el-checkbox>
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
      ischeckM: false,
      pageInfo: {},
      typeData: {},
      nowIndex: 'all',
      countyIndex: 'all',
      formData: {
        areaCity: 'all',
        areaCounty: 'all',
        level: 'all',
        rent: 'all',
        hold: 'all',
        measure: 'all'
      },
      count: 0
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
  watch: {
    nowIndex (value) {
      this.formData.areaCity = value
      this.getMap()
      this.count++
    },
    countyIndex (value) {
      this.formData.areaCounty = value
      this.getMap()
      this.count++
    }
  },
  methods: {
    getTypes () {
      let formData = {
        type: this.pageInfo.type,
        city: this.pageInfo.city
      }

      Tools.getJson('typeMap', formData, (res) => {
        if (res.statusCode === 0) {
          this.typeData = res.datas
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    getMap () {
      var count = this.count
      this.formData.type = this.pageInfo.type
      this.formData.city = this.pageInfo.city
      this.formData.vr = this.$store.getters.getMapInfo

      Tools.getJson('searchMap', this.formData, (res) => {
        if (res.statusCode === 0) {
          if (count !== this.count) {
            return false
          }
          this.$store.dispatch('setMapInfo', res.datas)
          this.drawMap()
        } else {
          this.$message.error(res.mess)
        }
      })
    },
    tabChange (index) {
      this.nowIndex = index
      this.countyIndex = 'all'
    },
    levelAll (q, h) {
      if (this['ischeck' + q]) {
        this.formData[h] = 'all'
        this['check' + q] = [].concat(this.typeData[h])
      } else {
        this.formData[h] = 'all'
        this['check' + q] = []
      }
      this.count++
      this.getMap()
    },
    levelChange (q, h) {
      if (this['check' + q].lenght === 0) {
        this.formData[h] = 'all'
        this['ischeck' + q] = false
      } else if (this['check' + q].length === this.typeData[h].length) {
        this.formData[h] = 'all'
        this['ischeck' + q] = true
      } else {
        this.formData[h] = this['check' + q].join(',')
        this['ischeck' + q] = false
      }
      this.count++
      this.getMap()
    },
    drawMap () {
      this.map.clearOverlays()
      this.drawOverlay(this.map, this.$store.getters.getMapInfo)
    },
    drawOverlay (map, datas) {
      var type = this.pageInfo.type
      datas.forEach((item) => {
        var href = {
          name: 'info',
          params: {
            type: type,
            id: item.id
          }
        }

        var opts = {
          width: 140,
          height: 100,
          template: this.createTemplate(href, item.title, item.price1, item.price2)
        }

        var point = new window.BMap.Point(item.point.lng, item.point.lat)
        map.panTo(point)
        var windowInfo = new WindowOverlay(point, opts)

        map.addOverlay(windowInfo)
      })
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
      a.innerHTML = title.length > 6 ? title.substring(0, 6) + '...' : title
      a.onclick = () => {
        console.log(href)
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
                cursor: pointer;
              }

              .active {
                color: #20a0ff;
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