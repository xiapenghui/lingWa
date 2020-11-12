<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.userName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.AccountName" :placeholder="$t('permission.userNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.fullName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.NameCN" :placeholder="$t('permission.fullNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned" @change="tableKey">{{ $t('permission.containInfo') }}</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.company') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrgCode" :placeholder="$t('permission.companyInfo')" clearable style="width: 100%">
              <el-option v-for="item in companyData" :key="item.OrgCode" :label="item.FullName" :value="item.OrgCode" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.department') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.DeptCode" :placeholder="$t('permission.departmentInfo')" clearable style="width: 100%">
              <el-option v-for="item in DepFullData" :key="item.DeptCode" :label="item.FullName" :value="item.DeptCode" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.addUser') }}</el-button>
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
      >
      <el-table-column align="center" :label="$t('permission.userName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.AccountName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.fullName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.NameCN }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.title')" width="150">
        <template slot-scope="scope">
          {{ scope.row.RoleName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.company')" width="250">
        <template slot-scope="scope">
          {{ scope.row.OrgFullName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.department')" width="150">
        <template slot-scope="scope">
          {{ scope.row.DepFullName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.description')" width="300">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.state')" width="150" sortable prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Status" :style="{ color: scope.row.Status === '0' ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === '0' ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" prop="name" sortable width="250">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="200">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑角色" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="禁用角色" placement="top-start">
            <el-button v-if="scope.row.Status == 1" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启用角色" placement="top-start">
            <el-button v-if="scope.row.Status == 0" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除角色" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.editUsers') : $t('permission.addUser')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">

        <el-form-item :label="$t('permission.userName')" prop="NameCN">
          <el-input v-model="ruleForm.NameCN" :placeholder="$t('permission.userNameInfo')" clearable />
        </el-form-item>

        <el-form-item :label="$t('permission.password')" prop="AccountPwd">
          <el-input v-model="ruleForm.AccountPwd" type="password" :placeholder="$t('permission.password')" clearable />
        </el-form-item>

        <!-- <el-tooltip class="item" effect="dark" :content="content7" placement="top-start">
          <el-form-item :label="$t('permission.passwords')" prop="passwords">
            <el-input v-model="ruleForm.passwords" type="password" :placeholder="$t('permission.passwords')" clearable />
          </el-form-item>
        </el-tooltip> -->

        <el-form-item :label="$t('permission.fullName')" prop="AccountName">
          <el-input v-model="ruleForm.AccountName" :placeholder="$t('permission.fullNameInfo')" clearable />
        </el-form-item>

        <el-form-item :label="$t('permission.rouleInfo')" prop="RoleCode">
          <el-select v-model="ruleForm.RoleCode" :placeholder="$t('permission.rouleInfo')" clearable style="width: 100%">
            <el-option v-for="item in rouleOptions" :key="item.RoleCode" :label="item.RoleName" :value="item.RoleCode" />
          </el-select>
        </el-form-item>

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
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { companyList, UserList, UserAdd, UserUpdate, RelerStatus, RelerDelete } from '@/api/role'
const fixHeight = 300
export default {
  name: 'UserMangement',
  // components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50,
        AccountName: undefined,
        NameCN: undefined,
        ShowBanned: false,
        OrgCode: 'C000000003',
        DeptCode: ''
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      companyData: [], // 获取搜索框公司列表
      DepFullData: [], // 获取搜索框部门列表
      rouleOptions: [], // 获取新增框角色列表
      rules: {
        NameCN: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        AccountPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        AccountName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        RoleCode: [{ required: true, message: '请选择角色', trigger: 'change' }]
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
  mounted() {
    // 获取公司部门的信息
    companyList().then(res => {
      debugger
      if (res.IsPass === true) {
        this.companyData = res.Obj.OrgList
        this.DepFullData = res.Obj.DeptList
      }
    })
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        NameCN: [{ required: true, message: this.$t('permission.userNameInfo'), trigger: 'blur' }],
        AccountPwd: [
          {
            required: true,
            message: this.$t('permission.passwordInfo'),
            trigger: 'blur'
          }
        ],
        // passwords: [
        //   {
        //     required: true,
        //     message: this.$t('permission.passwordsInfo'),
        //     trigger: 'blur'
        //   }
        // ],
        AccountName: [
          {
            required: true,
            message: this.$t('permission.fullNamesInfo'),
            trigger: 'blur'
          }
        ],
        RoleCode: [{ required: true, message: '请选择角色', trigger: 'change' }]
      }
    },
    // 禁用，启用权限
    handleBan(row) {
      const params = {
        Status: (row.Status = row.Status === '1' ? '0' : '1'),
        UserCode: row.UserCode
      }
      RelerStatus(params).then(res => {
        this.getList()
      })
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 重置
    handleReset() {

    },
    // 选择框
    tableKey() {},

    getList() {
      this.listLoading = true
      UserList(this.pagination).then(res => {
        debugger
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
    handleAddUser() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {}
      companyList().then(res => {
        if (res.IsPass === true) {
          this.rouleOptions = res.Obj.RoleList
        }
      })
    },
    // 编辑角色
    handleEdit(row) {
      debugger
      this.dialogType = 'edit'
      companyList().then(res => {
        if (res.IsPass === true) {
          this.rouleOptions = res.Obj.RoleList
        }
      })
      this.dialogFormVisible = true
      console.log("row",row)
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.ruleForm.RoleName = row.RoleName
    },

    // 查看用户
    handleLook() {

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
            RelerDelete({ UserCode: row.UserCode }).then(res => {
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
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            UserUpdate(this.ruleForm).then(res => {
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
            UserAdd(this.ruleForm).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
