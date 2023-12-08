<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary" @click="add"><a-icon type="plus"/>新增</a-button>
      <a-button type="danger" @click="del(selectedRowKeys)"><a-icon type="delete"/>批量删除</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="userId"
      :loading="loading"
      :columns="columns"
      :data-source="userData"
      :pagination="pagination"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <!-- 操作插槽 -->
        <template slot="action" slot-scope="userId, record">
          <a-space>
            <span class="edit-btn" @click="edit(record.userId)">
              <a-icon type="edit" theme="filled" />编辑
            </span>
            |
            <span class="del-btn" @click="del(record.userId)">
              <a-icon type="delete" theme="filled" />删除
            </span>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAllUsers } from '../../api/user'
const columns = [
  {
    title: '用户编号',
    dataIndex: 'userId',
    key: 'userId',
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    align: 'center'
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
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
      userData: [],
      selectedRowKeys: [],
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
        await getAllUsers(this.searchForm).then(res => {
          if (res.code == 1) {
            this.userData = res.data.tableData
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
