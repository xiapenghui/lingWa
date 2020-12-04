<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="工序名称" placement="top-start"><label class="radio-label">工序名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.Name" placeholder="工序名称" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn"><el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">新增工序</el-button></div>
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
      <el-table-column align="center" label="工序代码" width="200">
        <template slot-scope="scope">
          {{ scope.row.ProcessCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工序名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.ProcessName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否检验">
        <template slot-scope="scope">
          {{ scope.row.IsChecked }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验方式">
        <template slot-scope="scope">
          {{ scope.row.CheckedTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否必过">
        <template slot-scope="scope">
          {{ scope.row.IsMustPass }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否打印">
        <template slot-scope="scope">
          {{ scope.row.IsPrint }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="顺序">
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑工序" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除工序" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!-- 编辑弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑工序' : '新增工序'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="工序代码" prop="WorkingProcedureCode"><el-input v-model="ruleForm.WorkingProcedureCode" placeholder="工序代码" @focus="workingBox" /></el-form-item>

        <el-form-item label="工序名称" prop="WorkingProcedureName"><el-input v-model="ruleForm.WorkingProcedureName" placeholder="工序名称" :disabled="true" /></el-form-item>

        <el-form-item label="是否检验">
          <el-radio v-model="ruleForm.IsChecked" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsChecked" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="检验方式">
          <el-radio-group v-model="ruleForm.CheckedType" @change="changeRadio">
            <el-radio v-for="item in checkData" :key="item.value" :label="item.value" :value="item.value">{{ item.text }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否必过">
          <el-radio v-model="ruleForm.IsMustPass" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsMustPass" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="是否打印">
          <el-radio v-model="ruleForm.IsPrint" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsPrint" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="顺序"><el-input v-model="ruleForm.OrderNum" placeholder="顺序" /></el-form-item>

        <el-form-item label="备注"><el-input v-model="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 工序对应弹窗 -->
    <working-name
      :working-show="workingFormVisible"
      :working-box-loading="workingBoxLoading"
      :table-box-height="tableBoxHeight"
      :working-data="workingData"
      :pagination-search-workingl="paginationSearchWorking"
      @workingClose="workingClose"
      @workingClick="workingClick"
      @handleSearchWorking="handleSearchWorking"
    />
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import { baseDetailList, baseDetailAdd, baseDetailDelete, baseDetailModify, GetDictionary, BaseProList } from '@/api/OrganlMan'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WorkingName from '@/components/WorkingName' // 工序名称
const fixHeight = 270
const fixHeightBox = 350
export default {
  name: 'BomMangement',
  components: { Pagination, WorkingName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ProcessRouteCode: this.$route.query.ProcessRouteCode,
        Name: undefined,
        Status: false
      },
      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 20,
        WorkingProcedureNum: undefined,
        Name: undefined
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      checkVal: null, // 选择检验方式
      checkData: [], // 新增编辑弹窗检验方式radio
      workingData: [], // 工序数组
      workingCode: null, // 工序的code值
      dialogFormVisible: false, // 编辑弹出框
      workingBoxLoading: false, // 工序搜索loading
      workingFormVisible: false, // input工序名称弹窗
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      rules: {
        WorkingProcedureCode: [{ required: true, message: '请输入工艺路线', trigger: 'change' }],
        WorkingProcedureName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }]
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
    tableBoxHeight(val) {
      if (!this.timer) {
        this.tableBoxHeight = val
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
    // 新增检验方式radio
    GetDictionary({ code: '0019' }).then(res => {
      if (res.IsPass === true) {
        this.checkData = res.Obj
      }
    })
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        WorkingProcedureCode: [{ required: true, message: '请输入工艺路线', trigger: 'change' }],
        WorkingProcedureName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }]
      }
    },

    // 选择检验方式
    changeRadio(val) {
      debugger
      this.checkVal = val
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      baseDetailList(this.pagination).then(res => {
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

    // 增加工艺路线
    handleAddUser() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {}
    },
    // 编辑工艺路线
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除工艺路线
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          baseDetailDelete({ ProcessRouteDetailCode: row.ProcessRouteDetailCode }).then(res => {
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
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            const params = this.ruleForm
            params.ProcessRouteCode = this.$route.query.ProcessRouteCode
            params.WorkingProcedureCode = this.workingCode
            params.CheckedType = this.checkVal
            baseDetailModify(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
                this.editLoading = false
                this.dialogFormVisible = false
              }
            })
          } else {
            const params = this.ruleForm
            params.ProcessRouteCode = this.$route.query.ProcessRouteCode
            params.WorkingProcedureCode = this.workingCode
            params.CheckedType = this.checkVal
            baseDetailAdd(params).then(res => {
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
    },

    // 工序聚焦事件原料弹窗
    workingBox() {
      this.workingFormVisible = true
      this.workingBoxLoading = true
      BaseProList(this.paginationSearchWorking).then(res => {
        if (res.IsPass === true) {
          this.workingData = res.Obj
          this.workingBoxLoading = false
        }
      })
    },
    // 工序弹窗搜索
    handleSearchWorking() {
      this.paginationSearchWorking.PageIndex = 1
      this.workingBox()
    },
    // 增加工序名称双击事件获取当前行的值
    workingClick(row) {
      this.ruleForm.WorkingProcedureCode = row.ProcessCode
      this.ruleForm.WorkingProcedureName = row.Name
      this.workingCode = row.ProcessCode
      this.workingFormVisible = false
    },
    // 关闭工序名称查询弹窗
    workingClose() {
      this.workingFormVisible = false
    }
  }
}
</script>
