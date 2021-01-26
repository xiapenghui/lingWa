<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="原料编号" placement="top-start"><label class="radio-label">原料编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialNum" placeholder="原料编号" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="原料名称" placement="top-start"><label class="radio-label">原料名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialName" placeholder="原料名称" clearable /></el-col>
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

      <el-table-column align="center" label="原料编号" width="150" prop="MaterialNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="原料名称" width="150" prop="MaterialName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料类型" width="150" prop="MaterialTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验项名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验方案" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.IqcRuleName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验目标值" width="150" prop="StandardValue" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StandardValue }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="规范下限" width="150" prop="LowerLimit" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LowerLimit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="规范上限" width="150" prop="UpperLimit" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UpperLimit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="150" prop="UnitText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UnitText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验类别" width="150" prop="InspectWayText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InspectWayText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验方法及器具" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MethodOrTools }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
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

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
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
        <el-form-item label="原料编号" prop="MaterialNum">
          <el-input v-model.trim="ruleForm.MaterialNum" readonly placeholder="请选择" class="disActive" @focus="materialBox" />
        </el-form-item>

        <el-form-item label="原料名称"><el-input v-model.trim="ruleForm.Name" placeholder="原料名称" disabled /></el-form-item>
        <el-form-item label="物料类型"><el-input v-model.trim="ruleForm.MaterialTypeName" placeholder="物料类型" disabled /></el-form-item>

        <el-form-item label="检验项名称" prop="Name"><el-input v-model.trim="ruleForm.Name" placeholder="检验项" clearable /></el-form-item>

        <el-form-item label="检验类别" prop="InspectWay">
          <el-select v-model="ruleForm.InspectWay" placeholder="检验类别" style="width: 100%" clearable>
            <el-option v-for="item in InspectWayData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="检验方案" prop="IqcRuleName">
          <el-input v-model.trim="ruleForm.IqcRuleName" readonly placeholder="请选择" class="disActive" @focus="testBox" />
        </el-form-item>

        <el-form-item label="检验目标值"><el-input-number v-model="ruleForm.StandardValue" placeholder="检验目标值" :min="0" style="width: 100%" /></el-form-item>

        <el-form-item label="规范值">
          <el-input-number v-model="ruleForm.LowerLimit" :min="0" placeholder="规范下限" style="width: 48%" />
          -----
          <el-input-number v-model="ruleForm.UpperLimit" :min="0" placeholder="规范上限" style="width: 48%" />
        </el-form-item>

        <el-form-item label="单位">
          <el-select v-model="ruleForm.Unit" placeholder="请选择" style="width: 100%" clearable>
            <el-option v-for="item in UnitTextList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="检验方法及器具"><el-input v-model.trim="ruleForm.MethodOrTools" placeholder="检验方法及器具" type="textarea" /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 原料名称对应弹窗 -->
    <material-name
      :material-show="materialFormVisible"
      :material-box-loading="materialBoxLoading"
      :table-box-height="tableBoxHeight"
      :material-data="materialData"
      :pagination-search-material="paginationSearchMaterial"
      @materialClose="materialClose"
      @materialClick="materialClick"
      @handleSearchMaterial="handleSearchMaterial"
    />

    <!-- 检验方案对应弹窗 -->
    <test-name
      :test-show="testFormVisible"
      :test-box-loading="testBoxLoading"
      :table-box-height="tableBoxHeight"
      :test-data="testData"
      :pagination-search-test="paginationSearchTest"
      @testClose="testClose"
      @testClick="testClick"
      @handleSearchTest="handleSearchTest"
    />
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary, MaterialList } from '@/api/BasicData'
import { IncomingList, IncomingAdd, IncomingDelete, IncomingModify, QuaList } from '@/api/QualityData'
import MaterialName from '@/components/MaterialName' // 原料名称
import TestName from '@/components/TestName' // 原料名称
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'ProductsLack',
  components: { Pagination, MaterialName, TestName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        MaterialNum: undefined,
        MaterialName: undefined
      },
      // 原料搜索条件
      paginationSearchMaterial: {
        PageIndex: 1,
        PageSize: 10000,
        MaterialType: 0,
        MaterialNum: undefined,
        MaterialName: undefined,
        ShowBanned: false
      },

      // 检验方案查询
      paginationSearchTest: {
        PageIndex: 1,
        PageSize: 10000,
        RuleNum: undefined,
        Name: undefined,
        Description: undefined,
        ShowBanned: false
      },

      listLoading: false,
      editLoading: false, // 编辑loading
      addShow: false,
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      materialBoxLoading: false, // 原料名称loading
      testFormVisible: false, // 检验方案弹窗
      testBoxLoading: false, // 检验方案loading
      materialFormVisible: false, // input原料弹窗
      materialData: [], // 原料数组
      testData: [], // 检验方案数组
      InspectWayData: [], // 检验类别下拉
      UnitTextList: [], // 单位下拉
      dialogType: 'new',
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      rules: {
        MaterialNum: [{ required: true, message: '请输入原料编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入检验项名称', trigger: 'blur' }],
        InspectWay: [{ required: true, message: '请选择检验类别', trigger: 'change' }],
        IqcRuleName: [{ required: true, message: '请选择检验方案', trigger: 'blur' }]
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

    // 单位下拉
    GetDictionary({ code: '0021' }).then(res => {
      if (res.IsPass === true) {
        this.UnitTextList = res.Obj
      }
    })

    // 检验类别下拉
    GetDictionary({ code: '0027' }).then(res => {
      if (res.IsPass === true) {
        this.InspectWayData = res.Obj
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

    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        MaterialNum: [{ required: true, message: '请输入原原料编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入检验项名称', trigger: 'blur' }],
        InspectWay: [{ required: true, message: '请选择检验类别', trigger: 'change' }],
        IqcRuleName: [{ required: true, message: '请选择检验方案', trigger: 'blur' }]
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
      IncomingList(this.pagination).then(res => {
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
            IncomingModify(this.ruleForm).then(res => {
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
            IncomingAdd(this.ruleForm).then(res => {
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
          const params = this.ruleForm
          IncomingAdd(params).then(res => {
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
        }
      })
      this.handleAdd()
    },

    // 删除角色
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          IncomingDelete({ DefectCode: row.DefectCode }).then(res => {
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

    // 原料聚焦事件原料弹窗
    materialBox() {
      this.materialFormVisible = true
      this.materialBoxLoading = true
      MaterialList(this.paginationSearchMaterial).then(res => {
        if (res.IsPass === true) {
          this.materialData = res.Obj
          this.materialBoxLoading = false
        }
      })
    },
    // 原料弹窗搜索
    handleSearchMaterial() {
      this.paginationSearchMaterial.PageIndex = 1
      this.materialBox()
    },
    // 增加原料名称双击事件获取当前行的值
    materialClick(row) {
      debugger
      this.$set(this.ruleForm, 'MaterialNum', row.MaterialNum)
      this.$set(this.ruleForm, 'Name', row.Name)
      this.$set(this.ruleForm, 'MaterialTypeName', row.MaterialTypeName)
      this.ruleForm.MaterialCode = row.MaterialCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.materialFormVisible = false
    },
    // 关闭原料名称查询弹窗
    materialClose() {
      this.materialFormVisible = false
    },

    // 检验方案聚焦事件弹窗
    testBox() {
      this.testFormVisible = true
      this.testBoxLoading = true
      QuaList(this.paginationSearchTest).then(res => {
        if (res.IsPass === true) {
          this.testData = res.Obj
          this.testBoxLoading = false
        }
      })
    },
    //  检验方案弹窗搜索
    handleSearchTest() {
      this.paginationSearchTest.PageIndex = 1
      this.testBox()
    },
    // 增加检验方案双击事件获取当前行的值
    testClick(row) {
      debugger
      this.$set(this.ruleForm, 'IqcRuleName', row.Name)
      this.ruleForm.IqcRuleCode = row.RuleCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.testFormVisible = false
    },
    // 关闭检验方案查询弹窗
    testClose() {
      this.testFormVisible = false
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
