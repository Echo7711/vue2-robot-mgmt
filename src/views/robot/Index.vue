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

    <!-- 新增/编辑弹窗 -->
    <a-modal
    width="35rem"
    v-model="formModal"
    :title="modalTitle"
    @ok="save">
      <a-form-model ref="form" v-model="form" :rules="rules" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
        <a-form-model-item label="机器人编号" prop="robotId">
          <a-input v-model="form.robotId"></a-input>
        </a-form-model-item>
        <a-form-model-item label="机器人名称" prop="robotName">
          <a-input v-model="form.robotName"></a-input>
        </a-form-model-item>
        <a-form-model-item label="机器人IP地址" prop="robotIp">
          <a-input v-model="form.robotIp"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getAllRobots, getOneRobot, addRobot, editRobot, delRobot } from '../../api/robot'
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
      },
      formModal: false,
      modalTitle: '',
      form: {
        robotId: '',
        robotName: '',
        robotIp: ''
      },
      rules: {
        robotId:[{required: true, message: '编号不能为空', trigger: 'blur'}],
        robotName:[{required: true, message: '名称不能为空', trigger: 'blur'}],
        robotIp:[{required: true, message: 'IP地址不能为空', trigger: 'blur'}]
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
    },

    // 重置表单
    resetForm() {
      if(this.$refs.form) {
        this.$refs.fomr.resetFields()
        this.form.robotId = ''
        this.form.robotName = ''
        this.form.robotIp = ''
      }
    },

    // 新增
    add() {
      this.modalTitle = '新增机器人'
      this.resetForm()
      this.formModal = true
    },

    // 编辑
    edit(robotId) {
      this.modalTitle = '编辑机器人信息'
      this.resetForm()
      getOneRobot({robotId: robotId}).then(res => {
        this.form = res.data
        this.formModal = true
      })
    },

    // 新增/编辑提交
    save() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          if(this.modalTitle == '新增机器人') {
            await addRobot(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            }).catch(e => {
              console.log(e)
            })
          } else if(this.modalTitle == '编辑机器人信息') {
            await editRobot(this.form).then(res => {
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

    // 删除
    del(robotId) {
      let ids = []
      if(robotId instanceof Array) {
        ids = robotId
      } else {
        ids.push(robotId)
      }
       if (ids.length == 0) {
        this.$message.error('请先选择一条记录')
      } else {
        this.$confirm({
          title: '提示',
          content: '确认删除所选机器人信息吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await delRobot(ids).then(res => {
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
