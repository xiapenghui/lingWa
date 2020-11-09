<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.title') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.RoleName" :placeholder="$t('permission.titleInfo')" /></el-col>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.addRole') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="name">
        <template slot-scope="scope">
          {{ scope.row.RoleCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.name')" width="150">
        <template slot-scope="scope">
          {{ scope.row.RoleName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="150" prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.UseStatus" :style="{ color: scope.row.UseStatus === '0' ? '#FF5757' : '#13ce66' }">{{ scope.row.UseStatus === '0' ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="header-center" :label="$t('permission.description')">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.operations')">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">{{ $t('permission.editPermission') }}</el-button>
          <el-button type="info" size="small" @click="handleCoply(scope.row)">{{ $t('permission.coplyPermission') }}</el-button>
          <el-button type="warning" size="small" @click="handleLook(scope.row)">{{ $t('permission.lookPermission') }}</el-button>
          <el-button v-if="scope.row.UseStatus == 1" type="danger" size="small" @click="handleBan(scope.row, 1)">{{ $t('permission.handleBan') }}</el-button>
          <el-button v-else type="success" size="small" @click="handleBan(scope.row, 0)">{{ $t('permission.handleEnable') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">{{ $t('permission.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->

    <!-- 添加编辑菜单 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.editRole') : $t('permission.addRole')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
          <el-form-item :label="$t('permission.title')" prop="RoleName"><el-input v-model="ruleForm.RoleName" :placeholder="$t('permission.title')" /></el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
          <el-form-item :label="$t('permission.description')">
            <el-input v-model="ruleForm.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.description')" />
          </el-form-item>
        </el-tooltip>

        <el-form-item :label="$t('permission.Menus')">
          <el-tree ref="tree" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 查看用户 -->
    <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
      <el-table border style="width: 100%" height="50vh" :data="userData">
        <el-table-column align="center" :label="$t('permission.fullName')" width="250">
          <template slot-scope="scope">
            {{ scope.row.NameCN }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('permission.loginUser')" width="250">
          <template slot-scope="scope">
            {{ scope.row.AccountName }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('permission.company')">
          <template slot-scope="scope">
            {{ scope.row.OrgFullName }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('permission.department')">
          <template slot-scope="scope">
            {{ scope.row.DepFullName }}
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationLog.current" :size.sync="paginationLog.size" @pagination="getLogList" /> -->
    </el-dialog>
  </div>
</template>

<script>
import '../../styles/commentBox.scss'
import '../../styles/scrollbar.css'
import { ListRole, addRole, updateRole, deleteRole, ListMenuFunAll, ListUser, UpdateStatus } from '@/api/role'
import i18n from '@/lang'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 280
export default {
  name: 'RolePermission',
  // components: { Pagination },
  data() {
    return {
      tableData: [],
      routesData: [], // 权限菜单
      userData: [], //  查看用户
      defaultProps: {
        children: 'children',
        MenuTitle: 'MenuTitle'
      },
      ruleForm: {}, // 编辑弹窗
      logId: {}, // 查看用户行数据
      pagination: {
        PageIndex: 1,
        PageSize: 10,
        RoleName: undefined
      },
      // 查看用户分页
      paginationLog: {
        current: 1,
        size: 20
      },

      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      rules: {
        RoleName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      content1: this.$t('permission.title'),
      content2: this.$t('permission.description')
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
      this.content1 = this.$t('permission.title')
      this.content2 = this.$t('permission.description')
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
    // this.getRoutes()
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        title: [{ required: true, message: this.$t('permission.roleNameInfo') }]
      }
    },
    // 禁用，启用权限
    handleBan(row, status) {
      debugger
      const params = {
        UseStatus: row.UseStatus,
        RoleCode: row.RoleCode
      }
      UpdateStatus(params).then(res => {
        debugger
        // this.$message(res.MSG)
        if (status === 1) {
          row.status = 0
        } else {
          row.status = 1
        }
      })

      // scope.row.status = status
    },
    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      ListRole(this.pagination).then(res => {
        this.tableData = res.Obj
        this.total = res.Obj.length
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
    handleAddUser() {
      debugger
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {}
      ListMenuFunAll().then(res => {
        debugger
        if (res.IsPass === true) {
          this.routesData = res.Obj
        }
      })
    },
    // 编辑角色
    handleEdit(row) {
      debugger
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            updateRole(this.ruleForm).then(res => {
              debugger
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              }
            })
          } else {
            addRole(this.ruleForm).then(res => {
              debugger
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              }
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
    },

    // 复制角色
    handleCoply() {},
    // 查看用户
    handleLook(row) {
      this.logId = row
      ListUser(this.paginationLog, { RoleCode: row.RoleCode }).then(res => {
        if (res.TotalRowCount > 0) {
          this.dialogTableVisible = true
          this.userData = res.Obj
          this.logTotal = res.TotalRowCount
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无用户！')
        }
      })
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
            deleteRole({ RoleCode: row.RoleCode }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
            this.getList()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('table.deleteError')
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
