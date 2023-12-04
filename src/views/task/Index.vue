<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary"><a-icon type="plus" />新增</a-button>
      <a-button type="danger"><a-icon type="delete" />批量删除</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="taskId"
      :columns="columns"
      :data-source="taskData"
      :pagination="pagination"
      >
        <template slot="taskStatus" slot-scope="taskStatus, record">
          <a-badge v-if="record.taskStatus == '取货中' || '配送中'" status="processing" />
          {{ record.taskStatus }}
        </template>
        <template slot="action" slot-scope="taskId, record">
          <a-space>
            <span class="edit-btn" @click="edit(record.taskId)">
              <a-icon type="edit" theme="filled" />修改
            </span>
            |
            <span class="del-btn" @click="del(record.taskId)">
              <a-icon type="delete" theme="filled" />删除
            </span>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllTasks } from '../../api/task'
const columns = [
  {
    title: '任务编号',
    dataIndex: 'taskId',
    key: 'taskId',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center'
  },
  {
    title: '发货点',
    dataIndex: 'deliveryDpt',
    key: 'deliveryDpt',
    align: 'center'
  },
  {
    title: '收货点',
    dataIndex: 'receiveDpt',
    key: 'receiveDpt',
    align: 'center'
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    align: 'center',
    scopedSlots: { customRender: 'taskStatus'}
  },
  {
    title: '完成时间',
    dataIndex: 'finishTime',
    key: 'finishTime',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '12%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data() {
    return {
      columns,
      taskData: [],
      pagination: {
        total: 0,
        current: 1,// 当前页码
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
    getData(pageIndex) {
      this.searchForm.pageIndex = pageIndex
      getAllTasks(this.searchForm).then(res => {
        if (res.code == 1) {
          this.taskData = res.data.tableData
          this.pagination.total = res.data.totalItems
        }
      })
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
