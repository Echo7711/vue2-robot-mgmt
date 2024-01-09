<template>
  <div class="analysis">
    <div class="part1">
      <a-card style="backgroundColor: #EEFDFE;">
        <span>累计任务量</span>
        <p>{{ totalCount.taskCount }}次</p>
      </a-card>
      <a-card style="backgroundColor: #FFEFEF;">
        <span>累计服务量</span>
        <p>{{ totalCount.serviceCount }}位</p>
      </a-card>
      <a-card style="backgroundColor: #F2E8FE;">
        <span>累计配送量</span>
        <p>{{ totalCount.weightCount }}千克</p>
      </a-card>
      <a-card style="backgroundColor: #FFEFEF;">
        <span>累计工作时长</span>
        <p>{{ totalCount.timeCount }}</p>
      </a-card>
    </div>
    <div class="part2">
      <div id="lineItem" style="width: 80%;height: 40rem;"></div>
      <div class="part3">
        <div id="pieItem" style="width: 80%;height: 20rem;"></div>
        <div id="barItem" style="width: 80%;height: 25rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalCount: {
          taskCount: 0,
          serviceCount: 0,
          weightCount: 0,
          timeCount: '10天9时9分',
          pieChart: null,
          pieOption: null,
          lineChart: null,
          lineOption: null,
          barChart: null,
          barOption: null
        }
      }
    },

    methods: {
      // 折线
      initLineChart() {
        if (this.lineChart != null && this.lineChart != '' && this.lineChart != undefined) {
          this.lineChart.dispose()
        }
        this.lineChart = this.$echarts.init(document.getElementById('lineItem'))
        this.lineOption = {
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [0, 200, 224, 218, 135, 147, 260, 150, 230, 214, 218, 5],
            type: 'line'
          }]
        }
        this.lineChart.setOption(this.lineOption)
      },

      // 柱状
      initBarChart() {
        if (this.barChart != null && this.barChart != '' && this.barChart != undefined) {
          this.barChart.dispose()
        }
        this.barChart = this.$echarts.init(document.getElementById('barItem'))
        this.barOption = {
          title: {
            text: '周配送量趋势',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        }
        this.barChart.setOption(this.barOption)
      },

      // 饼图
      initPieChart() {
        if (this.pieChart != null && this.pieChart != '' && this.pieChart != undefined) {
          this.pieChart.dispose()
        }
        this.pieChart = this.$echarts.init(document.getElementById('pieItem'))
        this.pieOption = {
          title: {
            text: '任务类型分布',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [{
            name: '任务表单',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048,name: '配送' },
              { value: 735,name: '退货' },
              { value: 580,name: '补货'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
        this.pieChart.setOption(this.pieOption)
      }
    },

    mounted() {
      this.initLineChart()
      this.initBarChart()
      this.initPieChart()
    }
  }
</script>

<style lang="less">
  @import url('../../styles/analysis.less');
</style>