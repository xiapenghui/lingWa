<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="员工编号" placement="top-start"><label class="radio-label">员工编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.JobNum" placeholder="员工编号" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="员工名称" placement="top-start"><label class="radio-label">员工名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.NameCN" placeholder="员工名称" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">导出</el-button>
      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importcompany') }}</el-button> -->
      <!-- <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" /> -->
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

      <el-table-column align="center" label="员工编号" width="150" prop="JobNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.JobNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="员工名称" width="150" prop="NameCN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.NameCN }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别" width="150" prop="Gender" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Gender === true ? '#FF5757' : '#13ce66' }">{{ scope.row.Gender === true ? '男' : '女' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="部门" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="职务" width="150" prop="JobName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.JobName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否在职" width="150" prop="OnJob" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.OnJob === true ? '#13ce66': '#FF5757' }">{{ scope.row.OnJob === true ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="移动端密码" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" prop="Remark" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
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
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">

        <el-form-item label="员工编号" prop="JobNum"><el-input v-model.trim="ruleForm.JobNum" placeholder="员工编号" /></el-form-item>
        <el-form-item label="员工姓名" prop="NameCN"><el-input v-model.trim="ruleForm.NameCN" placeholder="员工姓名" /></el-form-item>

        <el-form-item label="性别" prop="Gender">
          <el-radio v-model="ruleForm.Gender" :label="true">男</el-radio>
          <el-radio v-model="ruleForm.Gender" :label="false">女</el-radio>
        </el-form-item>

        <el-form-item label="部门" prop="DeptCode">
          <el-select v-model="ruleForm.DeptCode" placeholder="部门" style="width: 100%" clearable>
            <el-option v-for="item in departmentData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="职务">
          <el-select v-model="ruleForm.JobCode" placeholder="职务" style="width: 100%" clearable>
            <el-option v-for="item in JobData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="是否在职">
          <el-radio v-model="ruleForm.OnJob" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.OnJob" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="移动端密码"><el-input v-model.trim="ruleForm.MobilePwd" placeholder="移动端密码" type="password" :show-password="true" /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary, PerList, PerAdd, PerDelete, PerModify } from '@/api/BasicData'
import { GetDepartmentTextValuePair } from '@/api/user'
const fixHeight = 260
export default {
  name: 'ProductsLack',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {
        Gender: true,
        OnJob: true
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        JobNum: undefined,
        NameCN: undefined
      },
      total: 10,
      addShow: false,
      listLoading: false,
      editLoading: false, // 编辑loading
      dialogFormVisible: false, // 编辑弹出框
      dialogType: 'new',
      departmentData: [], // 获取下拉部门列表
      JobData: [], // 职务下拉
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      rules: {
        JobNum: [{ required: true, message: '请输入员工编号', trigger: 'blur' }],
        NameCN: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        Gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        DeptCode: [{ required: true, message: '请选择部门', trigger: 'change' }]
      },
      parentMsg: this.$t('permission.importCompany')
      // content1: this.$t('permission.companyNo'),
      // content2: this.$t('permission.companyName'),
      // content3: this.$t('permission.inclusionCompany'),
      // content4: this.$t('permission.companyAllName'),
      // content5: this.$t('permission.companyTel'),
      // content6: this.$t('permission.companyAddress'),
      // content7: this.$t('permission.companyLogo'),
      // content8: this.$t('permission.companyDescription')
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

    // 员工编号
    'ruleForm.JobNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.JobNum = this.filterInput(val)
      }
    },

    // 移动端密码
    'ruleForm.MobilePwd': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.MobilePwd = this.filterInput(val)
      }
    },

    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      // this.parentMsg = this.$t('permission.importCompany')
      // this.content1 = this.$t('permission.companyNo')
      // this.content2 = this.$t('permission.companyName')
      // this.content3 = this.$t('permission.inclusionCompany')
      // this.content4 = this.$t('permission.companyAllName')
      // this.content5 = this.$t('permission.companyTel')
      // this.content6 = this.$t('permission.companyAddress')
      // this.content7 = this.$t('permission.companyLogo')
      // this.content8 = this.$t('permission.companyDescription')
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

    // 获取部门下拉
    GetDepartmentTextValuePair({}).then(res => {
      if (res.IsPass === true) {
        this.departmentData = res.Obj
      }
    })

    // 职务下拉
    GetDictionary({ code: '0004' }).then(res => {
      if (res.IsPass === true) {
        this.JobData = res.Obj
      }
    })

    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 输入框禁止输入中文
    filterInput(val) {
      if (val === '') {
        return val
      } else {
        return val.replace(/[\u4e00-\u9fa5\s]/gi, '')
      }
    },
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        JobNum: [{ required: true, message: '请输入员工编号', trigger: 'blur' }],
        NameCN: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        Gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        DeptCode: [{ required: true, message: '请选择部门', trigger: 'change' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 导出用户
    handleExport() {},
    // 导出用户
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 导入
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },

    // 获取列表
    getList() {
      this.listLoading = true
      PerList(this.pagination).then(res => {
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

    // 增加
    handleAdd() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.addShow = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.addShow = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            const params = this.ruleForm
            // params.JobCode =
            PerModify(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
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
          } else {
            PerAdd(this.ruleForm).then(res => {
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
    },

    // 继续新增
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PerAdd(this.ruleForm).then(res => {
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
            this.editLoading = false
          })
          this.handleAdd()
        }
      })
    },

    // 删除角色
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          PerDelete({ UserCode: row.UserCode }).then(res => {
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

  }
}
</script>

<style lang="scss" scoped>
.app-container .pagination-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
