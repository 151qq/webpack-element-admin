<template>
  <div class="echar-box" :id="idName"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: ['idName'],
  data () {
    return {
      option: {
        title: {
          text: '什么什么图表'
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
          data: ['租金', '置空率', 'GDP', 'GPI']
        },
        xAxis: {
          data: ['三月', '四月', '五月', '六月', '七月', '八月', '九月']
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 500,
          interval: 100,
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
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            name: '置空率',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#c4cddc'
              }
            },
            data: [50, 75, 100, 150, 200, 250, 150]
          },
          {
            name: '租金',
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
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.idName))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    })
  }
}
</script>
<style lang="scss">
  .echar-box {
    width: 800px;
    height: 390px;
    padding: 27px;
    box-sizing: border-box;
  }
</style>