<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary" @click="add"><a-icon type="plus"/>新增</a-button>
      <a-button type="danger" @click="del(selectedRowKeys)"><a-icon type="delete"/>批量删除</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="robotId"
      :loading="loading"
      :columns="columns"
      :data-source="robotData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <!-- 操作插槽 -->
        <template slot="action" slot-scope="robotId, record">
          <a-space>
            <span class="edit-btn" @click="edit(record.robotId)">
              <a-icon type="edit" theme="filled" />编辑
            </span>
            |
            <span class="del-btn" @click="del(record.robotId)">
              <a-icon type="delete" theme="filled" />删除
            </span>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllRobots } from '../../api/robot'
const columns = [
  {
    title: '机器人编号',
    dataIndex: 'robotId',
    key: 'robotId',
    align: 'center'
  },
  {
    title: '机器人名称',
    dataIndex: 'robotName',
    key: 'robotName',
    align: 'center'
  },
  {
    title: '机器人IP',
    dataIndex: 'robotIp',
    key: 'robotIp',
    align: 'center'
  },
  {
    title: '电量',
    dataIndex: 'battery',
    key: 'battery',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'robotStatus',
    key: 'robotStatus',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action'}
  }
]
export default {
  data() {
    return {
      columns,
      selectedRowKeys: [],
      loading: false,
      robotData: [],
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
        await getAllRobots(this.searchForm).then(res => {
          if (res.code == 1) {
            this.robotData = res.data.tableData
            this.pagination.total = res.data.totalItems
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
