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

    <!-- 操作弹窗 -->
    <a-modal
    width="35rem"
    v-model="formModal"
    :title="modalTitle"
    @ok="save">
      <a-form-model ref="form" v-model="form" :rules="rules" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
        <a-form-model-item label="用户名" prop="username">
          <a-input v-model="form.username"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="form.password"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系方式" prop="phoneNumber">
          <a-input v-model="form.phoneNumber"></a-input>
        </a-form-model-item>
        <a-form-model-item label="角色" prop="roleId">
          <a-select v-model="form.roleId">
            <a-select-option v-for="item in roleList" :key="item.roleId" :value="item.roleName">
              {{item.roleName}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="所属仓库" prop="houseId">
          <a-select v-model="form.houseId">
            <a-select-option v-for="item in houseList" :key="item.houseId" :value="item.houseId">
              {{item.houseName}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getAllUsers, getOneUser, addUser, editUser, delUser } from '../../api/user'
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
    title: '联系方式',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center'
  },
  {
    title: '所属仓库',
    dataIndex: 'houseName',
    key: 'houseName',
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
        username: '',
        password: '',
        phoneNumber: '',
        roleId: '',
        houseId: ''
      },
      rules: {
        username: [{reuqired: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{reuqired: true, message: '密码不能为空', trigger: 'blur'}],
        phoneNumber: [{reuqired: true, message: '联系方式不能为空', trigger: 'blur'}],
        roleId: [{reuqired: true, message: '角色不能为空', trigger: 'change'}],
        houseId: [{reuqired: true, message: '所属仓库不能为空', trigger: 'blur'}]
      },
      roleList: [{roleId: 0, roleName: '主管'}, {roleId: 1, roleName: '管理员'}],
      houseList: []
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
          this.userData = res.data.tableData
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
        this.form.username = ''
        this.form.password = ''
        this.form.phoneNumber = ''
        this.form.roleId = ''
        this.form.houseId = ''
      }
    },

    // 新增
    add() {
      this.modalTitle = '新增账号'
      this.resetForm()
      this.formModal = true
    },

    // 修改
    edit(userId) {
      this.modalTitle = '修改账号信息'
      this.resetForm()
      getOneUser({userId: userId}).then(res => {
        this.form = res.data
        this.formModal = true
      })
    },

    save() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          if(this.modalTitle == '新增账号') {
            await addUser(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            })
          } else if (this.modalTitle == '编辑账号') {
            await editUser(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            })
          }
          return true
        } else {
          return false
        }
      })
      this.formModal = false
    },

    // （批量）删除
    del(userId) {
       let ids = []
      if (userId instanceof Array) {
        ids = userId
      } else {
        ids.push(userId)
      }
      if (ids.length == 0) {
        this.$message.error('请先选择一条信息')
      } else {
        this.$confirm({
          title: '提示',
          content: '确认删除所选账号信息吗?',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await delUser(ids).then(res => {
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
@import url('../../styles/modal.less');
</style>
