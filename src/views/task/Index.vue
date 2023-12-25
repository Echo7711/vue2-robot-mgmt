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
        <template slot="taskStatus" slot-scope="text, record">
          <a-badge v-if="record.taskStatus == '取货中'|| record.taskStatus =='配送中'" status="processing" />
          <a-badge v-if="record.taskStatus == '已完成'" status="success" />
          <a-badge v-if="record.taskStatus == '已取消'" status="default" />
          {{ record.taskStatus }}
        </template>
        <!-- 操作插槽 -->
        <template slot="action" slot-scope="text, record">
          <a-space>
            <span class="edit-btn" @click="edit(record.taskId)">
              <a-icon type="edit" theme="filled" />编辑
            </span>
            |
            <span class="del-btn" @click="del(record.taskId)">
              <a-icon type="delete" theme="filled" />删除
            </span>
          </a-space>
        </template>
      </a-table>
    </div>

    <!-- 新增/编辑弹窗 -->
    <a-modal
    width="30rem"
    v-model="formModal" 
    :title="modalTitle"
    @ok="save">
      <a-form-model ref="form" v-model="form" :rules="rules" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
        <a-form-model-item label="发货仓库" prop="deliveryWhId">
          <a-select v-model="form.deliveryWhId">
            <a-select-option key="" value="">1</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="发货点" prop="deliveryPointId">
          <a-select v-model="form.deliveryPointId">
            <a-select-option key="" value="">1</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="收货仓库" prop="receiveWhId">
          <a-select v-model="form.receiveWhId">
            <a-select-option key="" value="">1</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
import { getAllTasks, getOneTask, addTask, editTask, delTask } from '../../api/task'
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
    title: '发货仓库',
    dataIndex: 'deliveryWhName',
    key: 'deliveryWhName',
    align: 'center'
  },
  {
    title: '收货仓库',
    dataIndex: 'receiveWhName',
    key: 'receiveWhName',
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
        deliveryWhId: '',
        deliveryPointId: '',
        receiveWhId: ''
      },
      rules: {
        deliveryWhId: [{required: true, message: '发货仓库不能为空', trigger: 'change'}],
        deliveryPointId: [{required: true, message: '发货点不能为空', trigger: 'change'}],
        receiveWhId: [{required: true, message: '收货仓库不能为空', trigger: 'change'}]
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
          this.taskData = res.data.tableData
          this.pagination.total = res.data.totalItems
        })
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },

    // 重置表单
    resetForm() {
      if(this.$refs.form) {
        this.$refs.form.resetFields()
        this.form.deliveryWhId = ''
        this.form.deliveryPointId = ''
        this.form.receiveWhId = ''
      }
    },

    // 新增
    add() {
      this.modalTitle = '新增任务'
      this.resetForm()
      this.formModal = true
    },

    // 编辑
    edit(taskId) {
      this.modalTitle = '编辑任务信息'
      this.resetForm()
      getOneTask({taskId: taskId}).then(res => {
        this.form = res.data
        this.formModal = true
      })
    },

    // 新增/编辑提交
    save() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          if(this.modalTitle == '新增任务') {
            await addTask(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            }).catch(e => {
              console.log(e)
            })
          } else if(this.modalTitle == '编辑任务信息') {
            await editTask(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            }).catch(e => {
              console.log(e)
            })
          }
          return true
        } else {
          return false
        }
      })
    },

    // (批量)删除
    del(taskId) {
      let ids = []
      if(taskId instanceof Array) {
        ids = taskId
      } else {
        ids.push(taskId)
      }
       if (ids.length == 0) {
        this.$message.error('请先选择一条信息')
      } else {
        this.$confirm({
          title: '提示',
          content: '确认注销所选电梯吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await delTask(ids).then(res => {
              this.$message.success(res.msg)
              this.selectedRowKeys = []
              this.getData(1)
            })
          },
          onCancel () {}
        })
      }
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
