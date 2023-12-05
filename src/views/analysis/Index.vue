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
      <a-card  style="backgroundColor: #F2E8FE;">
        <span>累计配送量</span>
        <p>{{ totalCount.weightCount }}千克</p>
      </a-card>
      <a-card  style="backgroundColor: #FFEFEF;">
        <span>累计工作时长</span>
        <p>{{ totalCount.timeCount }}</p>
      </a-card>
    </div>
    <div class="part2"></div>
    <div class="part3"></div>
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
        timeCount: '10天9时9分'
      }
    }
  }
}
</script>

<style lang="less">
@import url('../../styles/analysis.less');
</style>
