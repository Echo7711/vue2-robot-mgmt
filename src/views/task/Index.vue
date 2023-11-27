<template>
  <div class="manage">
    <div class="manage-action">
      <a-button type="primary"><a-icon type="plus" />新增</a-button>
      <a-button type="danger"><a-icon type="edit" />删除</a-button>
    </div>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="taskId"
      :columns="columns"
      :data-source="taskData"
      >
        <template slot="action" slot-scope="taskId, record">
          <a-space>
            <a-button size="small" @click="edit(record.taskId)">修改</a-button>
            <a-button size="small" @click="del(record.taskId)">删除</a-button>
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
    alert: 'center'
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    align: 'center'
  },
  {
    title: '完成时间',
    dataIndex: 'finishTime',
    key: 'finishTime',
    align: 'center'
  },
  {
    title: '数据操作',
    dataIndex: 'action',
    key: 'action',
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
        pageSize: 10
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
