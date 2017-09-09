<template>
  <div class="echar-box" :id="idName"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: ['idName', 'echartsDate'],
  data () {
    return {
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
          left: '5%',
          right: '0%'
        },
        legend: {
          right: 0,
          data: []
        },
        xAxis: {
          data: []
        },
        yAxis: {
          type: 'value',
          min: 0,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#999'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: []
      },
      lineStyle: {
        type: 'line',
        itemStyle: {
          normal: {
            color: '#c4cddc'
          }
        }
      },
      barStyle: {
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#2378f7'},
                {offset: 0.7, color: '#2378f7'},
                {offset: 1, color: '#83bff6'}
              ]
            )
          }
        }
      },
      pageInfo: {}
    }
  },
  created () {
    this.setEcharts()
  },
  watch: {
    echartsDate () {
      this.setEcharts()
    }
  },
  methods: {
    // 获取echarts数据
    setEcharts () {
      let datas = this.echartsDate
      // 设置标题
      this.option.title.text = datas.title
      // 设置legend
      this.option.legend.data = datas.legend.data
      // 设置横轴数据
      this.option.xAxis.data = datas.xAxis.data
      // 设置纵轴数据
      this.option.series = [].concat(this.setStyle(datas.seriesLine, 'lineStyle'), this.setStyle(datas.seriesBar, 'barStyle'))

      this.drawEchart()
    },
    setStyle (arrs, type) {
      var arrList = arrs.map((item) => {
        return Object.assign(item, this[type])
      })
      return arrList
    },
    drawEchart () {
      this.$nextTick(() => {
        // 基于准备好的dom，初始化echarts实例
        var dom = document.getElementById(this.idName)
        var myChart = echarts.init(dom)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option)
      })
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