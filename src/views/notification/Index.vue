<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary">批量已读</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="msgId"
      :columns="columns"
      :data-source="msgData"
      :pagination="pagination">
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '编号',
    dataIndex: 'msgId',
    key: 'msgId',
    align: 'center'
  },
  {
    title: '消息类型',
    dataIndex: 'msgType',
    key: 'msgType',
    align: 'center'
  },
  {
    title: '报告时间',
    dataIndex: 'callTime',
    key: 'callTime',
    align: 'center'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: '解决时间',
    dataIndex: 'finishTime',
    key: 'finishTime',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data() {
    return {
      columns,
      msgData: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      searchForm: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  }
}
</script>

<style lang="less">
@import url('../../styles/manage.less');
</style>
