<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary">批量查收</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="msgId"
      :loading="loading"
      :columns="columns"
      :data-source="msgData"
      :pagination="pagination">
        <template slot="action" slot-scope="msgId, record">
          <a-button v-if="record.status == '已查收'" size="small" disabled>确认查收</a-button>
          <a-button v-else type="primary" size="small" @click="confirm(record.msgId)">确认查收</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllMsgs } from '@/api/msg'
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
      loading: false,
      msgData: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showTotal: total => `共有${total}条数据`
      },
      searchForm: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },

  methods: {
    // 分页查询
    async getData(pageIndex) {
      this.loading = true
      this.searchForm.pageIndex = pageIndex
      try {
        await getAllMsgs(this.searchForm).then(res => {
          if (res.code == 1) {
            this.msgData = res.data.tableData
          }
        })
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    }
  },

  mounted() {
    this.getData(1)
  }
}
</script>

<style lang="less">
@import url('../../styles/manage.less');
</style>
