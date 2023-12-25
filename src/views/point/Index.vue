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

    <!-- 新增/编辑弹窗 -->
    <a-modal
    width="35rem"
    v-model="formModal"
    :title="modalTitle"
    @ok="save">
      <a-form-model ref="form" :v-model="form" :rules="rules" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
        <a-form-model-item label="停泊点名称" prop="pointName">
          <a-input v-model="form.pointName"></a-input>
        </a-form-model-item>
        <a-form-model-item label="停泊点X坐标" prop="x">
          <a-input v-model="form.x"></a-input>
        </a-form-model-item>
        <a-form-model-item label="停泊点y坐标" prop="y">
          <a-input v-model="form.y"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getAllPoints, getOnePoint, addPoint, editPoint, delPoint } from '../../api/point'
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
      },
      formModal: false,
      modalTitle: '',
      form: {
        pointName: '',
        x: '',
        y: ''
      },
      rules: {
        pointName: [{required: true, message: '名称不能为空', trigger: 'blur'}],
        x: [{required: true, message: 'X坐标不能为空', trigger: 'blur'}],
        y: [{required: true, message: 'Y坐标不能为空', trigger: 'blur'}]
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
          this.pointData = res.data.tableData
          this.pagination.total = res.data.totalItems
          for (let item of this.pointData) {
            item.axis = '[' + item.x + ',' + item.y + ']'
          }
        })
      } catch (e) {
        this.$meessage.error(e)
      }
      this.loading = false
    },

    // 重置表单
    resetForm() {
      if(this.$refs.form) {
        this.$refs.form.resetFields()
        this.form.pointName = ''
        this.form.x = ''
        this.form.y = ''
      }
    },

    // 新增
    add() {
      this.modalTitle = '新增停泊点'
      this.resetForm()
      this.formModal = true
    },

    // 编辑
    edit(pointId) {
      this.modalTitle = '编辑停泊点信息'
      this.resetForm()
      getOnePoint({pointId: pointId}).then(res => {
        this.form = res.data
        this.formModal = true
      })
    },

    // 新增/编辑提交
    save() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          if(this.modalTitle == '新增停泊点') {
            await addPoint(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            }).catch(e => {
              console.log(e)
            })
          } else if(this.modalTitle == '编辑停泊点信息') {
            await editPoint(this.form).then(res => {
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
    del(pointId) {
      let ids = []
      if(pointId instanceof Array) {
        ids = pointId
      } else {
        ids.push(pointId)
      }
       if (ids.length == 0) {
        this.$message.error('请先选择一条信息')
      } else {
        this.$confirm({
          title: '提示',
          content: '确认删除所选停泊点信息吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await delPoint(ids).then(res => {
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
