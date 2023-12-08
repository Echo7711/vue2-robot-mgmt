<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary" @click="add"><a-icon type="plus"/>新增</a-button>
      <a-button type="danger" @click="del(selectedRowKeys)"><a-icon type="delete"/>批量删除</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="houseId"
      :loading="loading"
      :columns="columns"
      :data-source="houseData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <!-- 操作插槽 -->
        <template slot="action" slot-scope="houseId, record">
          <a-space>
            <span class="edit-btn" @click="edit(record.houseId)">
              <a-icon type="edit" theme="filled" />编辑
            </span>
            |
            <span class="del-btn" @click="del(record.houseId)">
              <a-icon type="delete" theme="filled" />删除
            </span>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllHouses } from '../../api/house'
const columns = [
  {
    title: '仓库编号',
    dataIndex: 'houseId',
    key: 'houseId',
    align: 'center'
  },
  {
    title: '仓库名称',
    dataIndex: 'houseName',
    key: 'houseName',
    align: 'center'
  },
  {
    title: '所在地图',
    dataIndex: 'mapId',
    key: 'mapId',
    align: 'center'
  },
  {
    title: '所在楼宇',
    dataIndex: 'building',
    key: 'building',
    align: 'center'
  },
  {
    title: '所在楼层',
    dataIndex: 'floor',
    key: 'floor',
    align: 'center'
  },
  {
    title: '管理员',
    dataIndex: 'administrator',
    key: 'administrator',
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
      houseData: [],
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
        await getAllHouses(this.searchForm).then(res => {
          if (res.code == 1) {
            this.houseData = res.data.tableData
            this.pagination.total = res.data.totalItems
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
