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

    <!-- 新增/编辑弹窗 -->
    <a-modal
    width="35rem"
    v-model="formModal"
    :title="modalTitle"
    @ok="save">
      <a-form-model ref="form" :rules="rules" v-model="form" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
        <a-form-model-item label="仓库名称" prop="houseName">
          <a-input v-model="form.houseName"></a-input>
        </a-form-model-item>
        <a-form-model-item label="所在地图" prop="mapId">
          <a-input v-model="form.mapId"></a-input>
        </a-form-model-item>
        <a-form-model-item label="所在楼宇" prop="building">
          <a-input v-model="form.building"></a-input>
        </a-form-model-item>
        <a-form-model-item label="所在楼层" prop="floor">
          <a-input v-model="form.floor"></a-input>
        </a-form-model-item>
        <a-form-model-item label="管理员" prop="userId">
          <a-select v-model="form.userId">
            <a-select-option v-for="item in userList" :key="item.userId" :value="item.userId">
              {{ item.username}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getAllHouses, getOneHouse, addHouse, editHouse, delHouse } from '../../api/house'

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
      },
      formModal: false,
      modalTitle: '',
      form: {
        houseName: '',
        mapId: '',
        building: '',
        floor: '',
        userId: ''
      },
      userList: [],
      rules: {
        houseName:[{required: true, message: '名称不能为空', trigger: 'blur'}],
        mapId:[{required: true, message: '地图不能为空', trigger: 'blur'}],
        building:[{required: true, message: '楼宇不能为空', trigger: 'blur'}],
        floor:[{required: true, message: '楼层不能为空', trigger: 'blur'}],
        userId:[{required: true, message: '管理员不能为空', trigger: 'blur'}]
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
    },

    // 重置表单
    resetForm() {
      if(this.$refs.form) {
        this.$refs.form.resetFields()
        this.form.houseName = ''
        this.form.mapId = ''
        this.form.building = ''
        this.form.floor = ''
        this.form.userId  =''
      }
    },

    // 新增
    add() {
      this.modalTitle = '新增仓库'
      this.resetForm()
      this.formModal = true
    },

    // 修改
    edit(houseId) {
      this.modalTitle = '修改仓库信息'
      this.resetForm()
      getOneHouse({houseId: houseId}).then(res => {
        this.form = res.data
        this.formModal = true
      })
    },

    // 操作提交
    save() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          if(this.modalTitle == '新增仓库') {
            await addHouse(this.form).then(res => {
              this.$message.success(res.msg)
              this.getData(1)
              this.formModal = false
            })
          } else if (this.modalTitle == '编辑账号') {
            await editHouse(this.form).then(res => {
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
    },

    // 删除
    del(houseId) {
      let ids = []
      if (houseId instanceof Array) {
        ids = houseId
      } else {
        ids.push(houseId)
      }
      if (ids.length == 0) {
        this.$message.error('请先选择一条记录')
      } else {
        this.$confirm({
          title: '提示',
          content: '确认删除所选仓库信息吗?',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await delHouse(ids).then(res => {
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
