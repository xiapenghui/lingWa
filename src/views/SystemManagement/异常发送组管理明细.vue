<template>
  <div class="app-container">

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addUser') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="员工编号" width="180" prop="UserJobNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UserJobNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="员工名称" width="180" prop="UserNameCN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UserNameCN }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分组编号" min-width="180" prop="GroupNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分组名称" min-width="180" prop="GroupName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="180" prop="Remark" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" prop="name" sortable width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="分组编号" prop="AccountName">
          <el-input v-model.trim="ruleForm.AccountName" :disabled="true" />
        </el-form-item>

        <el-form-item label="分组名称" prop="NameCN">
          <el-input v-model.trim="ruleForm.NameCN" :disabled="true" />
        </el-form-item>

        <el-form-item label="员工编号" prop="NameCN">
          <el-input v-model.trim="ruleForm.NameCN" placeholder="员工编号" />
        </el-form-item>

        <el-form-item label="员工名称" prop="NameCN">
          <el-input v-model.trim="ruleForm.NameCN" placeholder="员工名称" />
        </el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../styles/commentBox.scss'
import '../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { AdnGroupUserList, AdnGroupUserAdd, AdnGroupUserDelete, AdnGroupUserModify } from '@/api/Andon'

const fixHeight = 190
export default {
  name: 'UserMangement',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: { }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30
      },
      GroupCode: this.$route.query.GroupCode,
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      rules: {
        AccountName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        RoleCode: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      },
      content1: this.$t('permission.userName'),
      content2: this.$t('permission.fullName'),
      content3: this.$t('permission.containInfo'),
      content4: this.$t('permission.company'),
      content5: this.$t('permission.department'),
      content6: this.$t('permission.password'),
      content7: this.$t('permission.passwords'),
      content8: this.$t('permission.roleUser'),
      content9: this.$t('permission.description')
    }
  },
  computed: {},
  watch: {
    // 监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.userName')
      this.content2 = this.$t('permission.fullName')
      this.content3 = this.$t('permission.containInfo')
      this.content4 = this.$t('permission.company')
      this.content5 = this.$t('permission.department')
      this.content6 = this.$t('permission.password')
      this.content7 = this.$t('permission.passwords')
      this.content8 = this.$t('permission.roleUser')
      this.content9 = this.$t('permission.description')
      this.setFormRules()
    }
  },
  created() {
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
      })()
    }
    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()
  },

  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        RoleCode: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      const params = {
        PageIndex: this.pagination.PageIndex,
        PageSize: this.pagination.PageSize,
        GroupCode: this.$route.query.GroupCode
      }
      AdnGroupUserList(params).then(res => {
        this.tableData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },

    // 增加角色
    handleAdd() {
      this.dialogType = 'new'
      this.isPassword = true
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.isPassword = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除角色
    handleDelete(row) {
      if (this.tableData.length > 0) {
        this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
          confirmButtonText: this.$t('permission.Confirm'),
          cancelButtonText: this.$t('permission.Cancel'),
          type: 'warning'
        })
          .then(() => {
            AdnGroupUserDelete({ UserCode: row.UserCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('table.deleteError')
            })
          })
      }
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            AdnGroupUserModify(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
              }
              this.getList()
              this.dialogFormVisible = false
            })
          } else {
            AdnGroupUserAdd(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.getList()
                this.dialogFormVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.editLoading = false
            })
          }
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
