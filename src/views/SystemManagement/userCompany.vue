<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.userName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.AccountName" :placeholder="$t('permission.userNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.fullName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.NameCN" :placeholder="$t('permission.fullNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.company') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrgCode" :placeholder="$t('permission.companyInfo')" clearable style="width: 100%">
              <el-option v-for="item in companyData" :key="item.OrgCode" :label="item.FullName" :value="item.OrgCode" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%;margin-top: 10px;"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" :label="$t('permission.userName')" width="200" prop="AccountName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.AccountName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.fullName')" width="200" prop="NameCN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.NameCN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.company')" prop="OrgFullName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrgFullName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('permission.userName')" prop="AccountName"><el-input v-model.trim="ruleForm.AccountName" disabled /></el-form-item>

        <el-form-item label="姓名" prop="NameCN"><el-input v-model.trim="ruleForm.NameCN" disabled /></el-form-item>
        <el-form-item label="公司列表" prop="OrgCodes">
          <el-checkbox-group v-model="OrgCodes">
            <el-checkbox v-for="(item, index) in companyTree" :key="index" :label="item.value" :value="item.value">{{ item.text }}</el-checkbox>
          </el-checkbox-group>
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
import { companyList, OrgRangeList, UserCompany, OrgRangeModify } from '@/api/role'
const fixHeight = 220
export default {
  name: 'UserCompany',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      OrgCodes: [],
      ruleForm: {
        AccountName: '',
        NameCN: '',
        OrgCodes: []
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
      dialogFormVisible: false, // 编辑弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      companyData: [], // 获取搜索框公司列表
      companyTree: [], // 公司下拉菜单树
      rules: {
        NameCN: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        AccountName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        OrgCodes: [{ required: true, message: '请选择公司', trigger: 'change' }]
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
    OrgCodes(val) {
      this.$set(this.ruleForm, 'OrgCodes', val)
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
      }
    })
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        NameCN: [{ required: true, message: this.$t('permission.userNameInfo'), trigger: 'blur' }],
        AccountName: [{ required: true, message: this.$t('permission.fullNamesInfo'), trigger: 'blur' }],
        OrgCodes: [{ required: true, message: '请选择公司', trigger: 'change' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      UserCompany(this.pagination).then(res => {
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

    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.isPassword = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
      // 编辑获取设置公司
      OrgRangeList({ UserCode: row.UserCode }).then(res => {
        const self = this
        if (res.IsPass === true) {
          self.OrgCodes = []
          self.companyTree = res.Obj
          res.Obj.map(item => {
            if (item.checked) {
              self.OrgCodes.push(item.value)
            }
          })
        }
      })
    },

    // 编辑成功
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            this.editLoading = true
            OrgRangeModify(this.ruleForm).then(res => {
              debugger
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.editLoading = false
              this.dialogFormVisible = false
            })
          }
        } else {
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
.el-dialog__body .el-checkbox {
  display: block;
}
</style>
