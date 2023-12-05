<template>
  <div class="manage">
    <a-space class="manage-action">
      <a-button type="primary" @click="add"><a-icon type="plus"/>新增</a-button>
      <a-button type="danger" @click="del(selectedRowKeys)"><a-icon type="delete"/>批量删除</a-button>
    </a-space>
    <div class="manage-list">
      <a-table
      bordered
      rowKey="taskId"
      :loading="loading"
      :columns="columns"
      :data-source="taskData"
      :pagination="pagination"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <!-- 状态插槽 -->
        <template slot="taskStatus" slot-scope="taskStatus, record">
          <a-badge v-if="record.taskStatus == '取货中' || '配送中'" status="processing" />
          {{ record.taskStatus }}
        </template>
        <!-- 操作插槽 -->
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

    <!-- 新增/修改弹窗 -->
    <a-modal
    width="30rem"
    v-model="formModal" 
    :title="modalTitle"
    @ok="save">
      <a-form-model ref="formRef" v-model="form">
        <a-form-model-item label="发货仓库" name="pickupWhId">
          <a-select v-model="form.pickupWhId">
            <a-select-option key="" value="">1</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="发货点" name="pickupPointId">
          <a-select v-model="form.pickupPointId">
            <a-select-option key="" value="">1</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="收货仓库" name="receiptWhId">
          <a-select v-model="form.reciptWhId">
            <a-select-option key="" value="">1</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

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
      selectedRowKeys: [],
      loading: false,
      taskData: [],
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
      },
      formModal: false,
      modalTitle: '',
      form: {
        pickupWhId: '',
        pickupPointId: '',
        reciptWhId: ''
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
        await getAllTasks(this.searchForm).then(res => {
          if (res.code == 1) {
            this.taskData = res.data.tableData
            this.pagination.total = res.data.totalItems
          }
        })
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },

    // 新增
    add() {
      this.modalTitle = '新增任务'
      this.formModal = true
    },

    // 修改
    edit() {

    },

    // 新增/修改提交
    save() {

    },

    // (批量)删除
    del() {

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
