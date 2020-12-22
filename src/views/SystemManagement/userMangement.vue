<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.userName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.AccountName" :placeholder="$t('permission.userNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.fullName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.NameCN" :placeholder="$t('permission.fullNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.company') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrgCode" :placeholder="$t('permission.companyInfo')" clearable style="width: 100%" @change="companyVal">
              <el-option v-for="item in companyData" :key="item.OrgCode" :label="item.FullName" :value="item.OrgCode" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.department') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.DeptCode" :placeholder="$t('permission.departmentInfo')" clearable style="width: 100%">
              <el-option v-for="item in DepFilterData" :key="item.DeptCode" :label="item.FullName" :value="item.DeptCode" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content3" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">{{ $t('permission.containInfo') }}</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        </el-col>
      </el-row>
    </div>

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
      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.userName')" width="150" prop="AccountName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.AccountName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.fullName')" width="150" prop="NameCN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.NameCN }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.title')" width="150" prop="RoleName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RoleName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.company')" width="200" prop="OrgFullName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrgFullName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.department')" width="200" prop="DepFullName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DepFullName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.description')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.state')" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" prop="name" sortable width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="禁用" placement="top-start">
            <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="启用" placement="top-start">
            <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('permission.userName')" prop="AccountName">
          <el-input v-model.trim="ruleForm.AccountName" :placeholder="$t('permission.userNameInfo')" clearable />
        </el-form-item>

        <el-form-item v-if="isPassword" :label="$t('permission.password')" prop="AccountPwd" class="AccountPwd">
          <b class="AccountB">*</b>
          <el-input v-model.trim="ruleForm.AccountPwd" type="password" :placeholder="$t('permission.password')" clearable :show-password="true" />
        </el-form-item>

        <el-form-item v-if="isPassword" label="重复密码" prop="passwords" class="passwords">
          <b class="passwordB">*</b>
          <el-input v-model.trim="ruleForm.passwords" type="password" placeholder="重复密码" clearable :show-password="true" />
        </el-form-item>

        <el-form-item :label="$t('permission.fullName')" prop="NameCN">
          <el-input v-model.trim="ruleForm.NameCN" :placeholder="$t('permission.fullNameInfo')" clearable />
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { companyList, UserList, UserAdd, UserUpdate, RelerStatus, RelerDelete } from '@/api/role'
const fixHeight = 260
export default {
  name: 'UserMangement',
  components: { Pagination },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.passwords !== '') {
          this.$refs.ruleForm.validateField('passwords')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.AccountPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      ruleForm: {
        AccountPwd: '',
        passwords: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        AccountName: undefined,
        NameCN: undefined,
        OrgCode: null,
        DeptCode: null,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      isPassword: true, // 密码是否可见
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      companyData: [], // 获取搜索框公司列表
      DepFullData: [], // 获取搜索框部门列表
      DepFilterData: [],
      rouleOptions: [], // 获取新增框角色列表
      rules: {
        NameCN: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        AccountPwd: [{ validator: validatePass, trigger: 'blur' }],
        passwords: [{ validator: validatePass2, trigger: 'blur' }],
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
  mounted() {
    // 获取公司部门的信息
    companyList().then(res => {
      if (res.IsPass === true) {
        this.companyData = res.Obj.OrgList
        this.DepFullData = res.Obj.DeptList
        this.rouleOptions = res.Obj.RoleList
      }
    })
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        NameCN: [{ required: true, message: this.$t('permission.userNameInfo'), trigger: 'blur' }],
        AccountPwd: [{ validator: validatePass, trigger: 'blur' }],
        passwords: [{ validator: validatePass2, trigger: 'blur' }],
        AccountName: [
          {
            required: true,
            message: this.$t('permission.fullNamesInfo'),
            trigger: 'blur'
          }
        ],
        RoleCode: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }
    },
    // 公司部门联动
    companyVal(value) {
      this.DepFilterData = []
      this.DepFullData.map(item => {
        if (item.OrgCode === value) {
          this.DepFilterData.push(item)
        }
      })
    },

    // 禁用，启用权限
    handleBan(row) {
      let status, statusTitle
      if (row.Status === true) {
        status = this.$t('permission.jingyongTitle')
        statusTitle = this.$t('permission.jingyongInfo')
      } else {
        status = this.$t('permission.qiyongTitle')
        statusTitle = this.$t('permission.qiyongInfo')
      }
      this.$confirm(statusTitle, status, {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      }).then(() => {
        const params = {
          Status: (row.Status = row.Status !== true),
          UserCode: row.UserCode
        }
        RelerStatus(params).then(res => {
          if (res.IsPass === true) {
            this.$message({
              type: 'success',
              message: res.MSG
            })
          } else {
            this.$message({
              type: 'error',
              message: res.MSG
            })
          }
          this.getList()
        })
      })
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      UserList(this.pagination).then(res => {
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
      this.ruleForm = {}
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.isPassword = false
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 查看用户
    handleLook() {},
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
              this.getList()
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
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
            this.editLoading = false
            this.dialogFormVisible = false
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
.AccountPwd,
.passwords {
  position: relative;
}

.AccountPwd .AccountB {
  color: red;
  position: absolute;
  left: -50px;
  z-index: 9;
}
.passwords .passwordB {
  color: red;
  position: absolute;
  left: -80px;
  z-index: 9;
}
</style>
