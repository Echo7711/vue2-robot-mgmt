<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary" @click="add"><a-icon type="plus"/>新增</a-button>
      <a-button type="danger" @click="del(selectedRowKeys)"><a-icon type="delete"/>批量删除</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="pointId"
      :loading="loading"
      :columns="columns"
      :data-source="pointData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <!-- 停泊插槽 -->
        <template slot="isParked"  slot-scope="text, record">
          <span v-if="record.isParked == 1">已停泊</span>
          <span v-else>未停泊</span>
        </template>
        <!-- 锁定插槽 -->
        <template slot="isLocked"  slot-scope="text, record">
          <span v-if="record.isLocked == 1">已锁定</span>
          <span v-else>锁定</span>
        </template>
        <!-- 操作插槽 -->
        <template slot="action" slot-scope="text, record">
          <a-space>
            <span class="edit-btn" @click="edit(record.pointId)">
              <a-icon type="edit" theme="filled" />编辑
            </span>
            |
            <span class="del-btn" @click="del(record.pointId)">
              <a-icon type="delete" theme="filled" />删除
            </span>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllPoints } from '../../api/point'
const columns = [
  {
    title: '编号',
    dataIndex: 'pointId',
    key: 'pointId',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'pointName',
    key: 'pointName',
    align: 'center'
  },
  {
    title: '坐标',
    dataIndex: 'axis',
    key: 'axis',
    align: 'center'
  },
  {
    title: '停泊状态',
    dataIndex: 'isParked',
    key: 'isParked',
    align: 'center',
    scopedSlots: { customRender: 'isParked'}
  },
  {
    title: '锁定状态',
    dataIndex: 'isLocked',
    key: 'isLocked',
    align: 'center',
    scopedSlots: { customRender: 'isLocked'}
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
    // 批量选择
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    // 分页查询
    async getData(pageIndex) {
      this.loading = true
      this.searchForm.pageIndex = pageIndex
      try {
        await getAllPoints(this.searchForm).then(res => {
          if (res.code == 1) {
            this.pointData = res.data.tableData
            this.pagination.total = res.data.totalItems
            for (let item of this.pointData) {
              item.axis = '[' + item.x + ',' + item.y + ']'
            }
          }
        })
      } catch (e) {
        this.$meessage.error(e)
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
