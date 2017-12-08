<template>
  <div class="echar-box" :id="idName"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: ['idName', 'echartsDate'],
  data () {
    return {
      isNoFirst: false,
      option: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '11%',
          right: '10%'
        },
        legend: {
          right: 0,
          data: []
        },
        yAxis: {
          type: 'category',
          axisTick: {
              alignWithLabel: true
          },
          data: []
        },
        xAxis: [],
        series: []
      },
      colors: ['#1563CA', '#33b358', '#50E3C2', '#F8E71C'],
      perBack: ['万元', '%'],
      barStyle: {
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#83bff3'},
                {offset: 1, color: '#83bff0'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff0'},
                {offset: 0.7, color: '#83bff3'},
                {offset: 1, color: '#83bff6'}
              ]
            )
          }
        },
        barWidth: '50%'
      },
      pageInfo: {},
      colorNum: 0
    }
  },
  methods: {
    // 获取echarts数据
    setEcharts () {
      let datas = this.echartsDate
      // let datas = {
      //   "legend" : [ "估值率" ],
      //   "xAxis" : [ "1月", "2月", "3月", "4月", "5月"],
      //   "seriesBar" : [
      //     {
      //       "name" : "估值率",
      //       "data" : [1, 2, 3, 4, 5]
      //     }
      //   ],
      //   "seriesLine" : []
      // }
      // 设置标题
      // this.option.title.text = datas.title
      // 设置legend
      this.option.legend.data = datas.legend
      // 设置横轴数据
      this.option.yAxis.data = datas.xAxis

      // 设置纵轴数据
      this.option.series = [].concat(this.setStyle(datas.seriesBar, 'barStyle', this.colors), this.setStyle(datas.seriesLine, 'lineStyle', this.colors))

      this.drawEchart()
    },
    setStyle (arrs, type, colors) {
      if (!arrs) {
        return false
      }

      var arrList = arrs.map((item, index) => {

        var yAxisOjb = {
          type: 'value',
          name: item.name,
          axisLine: {
              lineStyle: {
                  color: colors && colors[this.colorNum] ? colors[this.colorNum] : '#1563CA'
              }
          },
          axisLabel: {
              formatter: '{value} ' + this.perBack[this.colorNum]
          }
        }

        this.option.xAxis.push(yAxisOjb)

        item.yAxisIndex = this.colorNum

        if (type == 'lineStyle') {
          var itemStyle = {
            type: 'line',
            itemStyle: {
              normal: {
                color: colors && colors[this.colorNum] ? colors[this.colorNum] : '#1563CA'
              }
            },
            lineStyle: {
              normal: {
                width: 4
              }
            }
          }

          return Object.assign(item, itemStyle)
        }

        this.colorNum++

        return Object.assign(item, this[type])
      })

      return arrList
    },
    drawEchart () {
      // 使用刚指定的配置项和数据显示图表。
      if (!this.isInit) {
        // 基于准备好的dom，初始化echarts实例
        var dom = document.getElementById(this.idName)
        this.myChart = echarts.init(dom)
      }
      this.myChart.setOption(this.option)
      this.isInit = true
    }
  }
}
</script>
<style lang="scss">
  .echar-box {
    width: 100%;
    height: 350px;
    box-sizing: border-box;
  }
</style>
