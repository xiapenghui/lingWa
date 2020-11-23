<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="客户编号" placement="top-start"><label class="radio-label">客户编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.CustomerNum" :placeholder="$t('permission.userNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="客户名称" placement="top-start"><label class="radio-label">客户名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.FullName" :placeholder="$t('permission.fullNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" content="包含禁状态的成品" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">包含禁状态的成品</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.addCustomer') }}</el-button>
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
      <el-table-column align="center" label="客户编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.CustomerNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.FullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系人" width="150">
        <template slot-scope="scope">
          {{ scope.row.Contact }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" width="250">
        <template slot-scope="scope">
          {{ scope.row.Tel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" width="150">
        <template slot-scope="scope">
          {{ scope.row.Email }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" width="300">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.state')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Status" :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="250">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="200">
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
            <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启用角色" placement="top-start">
            <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除角色" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.editCustomer') : $t('permission.addCustomer')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="客户编号" prop="CustomerNum"><el-input v-model="ruleForm.CustomerNum" placeholder="客户编号" clearable /></el-form-item>
        <el-form-item label="客户名称" prop="FullName"><el-input v-model="ruleForm.FullName" placeholder="客户名称" clearable /></el-form-item>
        <el-form-item label="联系人"><el-input v-model="ruleForm.Contact" placeholder="联系人" clearable /></el-form-item>
        <el-form-item label="电话"><el-input v-model="ruleForm.Tel" placeholder="电话" clearable /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="ruleForm.Email" placeholder="邮箱" clearable /></el-form-item>
        <el-form-item label="地址"><el-input v-model="ruleForm.Address" placeholder="地址" clearable /></el-form-item>
        <el-form-item label="备注"><el-input v-model="ruleForm.Description" placeholder="备注" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { CustomerList, CustomerDelete, CustomerAdd, CustomerModify, CustomerStatus } from '@/api/OrganlMan'
const fixHeight = 270
export default {
  name: 'CustomerInformation',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50,
        CustomerNum: undefined,
        FullName: undefined,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      isPassword: false, // 密码是否可见
      companyData: [], // 获取搜索框公司列表
      DepFullData: [], // 获取搜索框部门列表
      DepFilterData: [],
      rouleOptions: [], // 获取新增框角色列表
      rules: {
        CustomerNum: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        FullName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }]
      }
      // content1: this.$t('permission.userName'),
      // content2: this.$t('permission.fullName'),
      // content3: this.$t('permission.containInfo'),
      // content4: this.$t('permission.company'),
      // content5: this.$t('permission.department'),
      // content6: this.$t('permission.password'),
      // content7: this.$t('permission.passwords'),
      // content8: this.$t('permission.roleUser'),
      // content9: this.$t('permission.description')
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
      // this.content1 = this.$t('permission.userName')
      // this.content2 = this.$t('permission.fullName')
      // this.content3 = this.$t('permission.containInfo')
      // this.content4 = this.$t('permission.company')
      // this.content5 = this.$t('permission.department')
      // this.content6 = this.$t('permission.password')
      // this.content7 = this.$t('permission.passwords')
      // this.content8 = this.$t('permission.roleUser')
      // this.content9 = this.$t('permission.description')
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
  mounted() {},
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        CustomerNum: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        FullName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }]
      }
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
          CustomerCode: row.CustomerCode
        }
        CustomerStatus(params).then(res => {
          if (res.IsPass === true) {
            this.$message({
              type: 'success',
              message: res.MSG
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
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 重置
    handleReset() {},

    getList() {
      this.listLoading = true
      CustomerList(this.pagination).then(res => {
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
      this.isPassword = true
      this.ruleForm = {}
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.isPassword = false
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除角色
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          CustomerDelete({ CustomerCode: row.CustomerCode }).then(res => {
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
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            CustomerModify(this.ruleForm).then(res => {
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
            CustomerAdd(this.ruleForm).then(res => {
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

<style lang="scss" scoped></style>
