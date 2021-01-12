<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductNum" placeholder="成品编号" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="状态" placement="top-start"><label class="radio-label">状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.TaskStatus" clearable style="width: 100%">
              <el-option v-for="item in TaskTypeData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
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

      <el-table-column align="center" label="任务单号" width="150" prop="TaskNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TaskNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品序列号" width="150" prop="ProductSN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品编号" width="150" prop="ProductNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品名称" width="150" prop="ProductName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单号" width="150" prop="OrderNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产线" width="150" prop="LineName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LineName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工位" width="150" prop="TerminalName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验结果" width="150" prop="InspectResult" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.InspectResult === 'NG' ? '#FF5757' : '#13ce66' }">{{ scope.row.InspectResult === 'NG' ? '不合格' : '合格' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划检验日期" width="150" prop="PlanInspectDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanInspectDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际检验日期" width="150" prop="ActInspectDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ActInspectDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="150" prop="TaskStatusText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TaskStatusText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="明细" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-tickets" plain @click="handleLook(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="撤销" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-refresh-left" plain @click="handleRevoke(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!-- 编辑弹窗 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.EditCompany') : $t('permission.addCompany')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="任务单号" prop="TaskNum"><el-input v-model.trim="ruleForm.TaskNum" placeholder="任务单号" disabled /></el-form-item>
        <el-form-item label="产品序列号" prop="ProductSN"><el-input v-model.trim="ruleForm.ProductSN" placeholder="产品序列号" clearable @blur="ProductBox" /></el-form-item>
        <el-form-item label="工单号" prop="OrderNum"><el-input v-model.trim="ruleForm.OrderNum" placeholder="工单号" disabled /></el-form-item>
        <el-form-item label="产线" prop="LineName"><el-input v-model.trim="ruleForm.LineName" placeholder="产线" disabled /></el-form-item>
        <el-form-item label="工位" prop="TerminalName"><el-input v-model.trim="ruleForm.TerminalName" placeholder="工位" disabled /></el-form-item>
        <el-form-item label="成品名称" prop="ProductName"><el-input v-model.trim="ruleForm.ProductName" placeholder="成品名称" disabled /></el-form-item>

        <el-form-item label="计划检验日期" prop="PlanInspectDate">
          <el-date-picker
            v-model="ruleForm.PlanInspectDate"
            :picker-options="expireTimeOption"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            clearable
          />
        </el-form-item>
        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" clearable /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--明细弹窗 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="detailFormVisible" title="明细信息系表">
      <el-form ref="inServForm" :model="inServForm" :hide-required-asterisk="false" label-width="120px" label-position="left">
        <el-table
          v-loading="detailLoading"
          :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
          :data="inServForm.tableDetaliData"
          style="width: 100%;"
          height="55vh"
          border
          element-loading-text="拼命加载中"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" />

          <el-table-column align="center" label="检验项目" width="150" prop="InspectItemName" sortable :show-overflow-tooltip="true" />
          <el-table-column align="center" label="下限值" prop="LowerLimit" sortable :show-overflow-tooltip="true" />

          <el-table-column align="center" label="上限值" prop="UpperLimit" sortable :show-overflow-tooltip="true" />
          <el-table-column align="center" label="判断状态" prop="JudgmentWayText" sortable :show-overflow-tooltip="true" />

          <el-table-column align="center" label="是否必填" prop="IsRequired" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tag :style="{ color: scope.row.IsRequired === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsRequired === false ? '否' : '是' }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="检测值" prop="InspectValue" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-form-item
                class="standardValueInput"
                label=""
                :prop="'tableDetaliData.' + scope.$index + '.InspectValue'"
                :rules="[{ required: scope.row.IsRequired, message: '请输入检测值', trigger: 'blur' }]"
              >
                <span v-if="scope.row.IsRequired === true" class="iptCenter">*</span>
                <el-input v-model="scope.row.InspectValue" :type="scope.row.JudgmentWay === '1' ? 'text' : 'number'" @change="value => onChangeJudgmentWay(value, scope)" />
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column align="center" label="检验结果" prop="InspectResult" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.InspectResult }}
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div style="text-align:right;margin-top: 20px;">
        <el-button type="danger" @click="detailFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitDetailForm('inServForm', '0')">保存</el-button>
        <el-button type="primary" @click="submitDetailForm('inServForm', '1')">提交</el-button>
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
import { GetDictionary } from '@/api/BasicData'
import { CreateTaskNum, QuerySN, QuaTaskList, QuaTaskAdd, QuaTaskDelete, QuaDetaiList, QuaTaskModify, QuaDetaiSave, QuaDetaiSubmit } from '@/api/QualityData'
const fixHeight = 260
export default {
  name: 'CompanyMaintenance',
  components: { Pagination },
  data() {
    return {
      tableData: [], // 主列表
      inServForm: {
        tableDetaliData: []
      },
      tableDetaliData: [], // 详情
      ruleForm: {
        TaskNum: null
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ProductNum: undefined,
        TaskStatus: undefined,
        TaskType: 'IPQC'
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      detailLoading: false, // 明细loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      detailFormVisible: false, // 明细弹出框
      dialogType: 'new',
      TaskTypeData: [], // 搜索下拉状态数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 8.64e7
        }
      },
      rules: {
        ProductSN: [{ required: true, message: '请输入产品序列号', trigger: 'blur' }]
      },
      parentMsg: this.$t('permission.importCompany')
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

    // input禁止中文输入
    'ruleForm.ProductSN': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.ProductSN = this.filterInput(val)
      }
    },

    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      // this.parentMsg = this.$t('permission.importCompany')
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
    // 获取新增仓库类型
    GetDictionary({ code: '0023' }).then(res => {
      if (res.IsPass === true) {
        this.TaskTypeData = res.Obj
      }
    })
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
      debugger
      if (val === '') {
        return val
      } else {
        return val.replace(/[\u4e00-\u9fa5\s]/gi, '')
      }
    },

    onChangeJudgmentWay(value, scope) {
      console.log('11', value, scope)
      // 文本
      if (scope.row.JudgmentWay === '1') {
        if (scope.row.InspectValue !== '') {
          scope.row.InspectResult = '合格'
        } else {
          scope.row.InspectResult = '不合格'
        }
      } else {
        // 数值
        if (scope.row.LowerLimit <= parseInt(scope.row.InspectValue) && scope.row.UpperLimit >= parseInt(scope.row.InspectValue)) {
          scope.row.InspectResult = '合格'
        } else {
          scope.row.InspectResult = '不合格'
        }
      }
    },
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        ProductSN: [{ required: true, message: '请输入产品序列号', trigger: 'blur' }]
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
      QuaTaskList(this.pagination).then(res => {
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
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {
        TaskNum: ''
      }
      CreateTaskNum().then(res => {
        if (res.IsPass === true) {
          this.ruleForm.TaskNum = res.Obj
        }
      })
    },
    // 产品序列号失去焦点时间
    ProductBox() {
      debugger
      const params = {
        ProductSN: this.ruleForm.ProductSN
      }
      if (this.ruleForm.ProductSN === undefined) {
        return
      } else {
        QuerySN(params).then(res => {
          this.$set(this.ruleForm, 'OrderNum', res.Obj.OrderNum)
          this.$set(this.ruleForm, 'LineName', res.Obj.LineName)
          this.$set(this.ruleForm, 'TerminalName', res.Obj.TerminalName)
          this.$set(this.ruleForm, 'ProductName', res.Obj.ProductName)
          this.$set(this.ruleForm, 'ProductLineCode', res.Obj.LineCode)
          this.$set(this.ruleForm, 'OrderCode', res.Obj.OrderCode)
          this.$set(this.ruleForm, 'TerminalCode', res.Obj.TerminalCode)
          this.$set(this.ruleForm, 'ProductCode', res.Obj.ProductCode)
        })
      }
    },

    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },
    // 查看明细
    handleLook(row) {
      this.detailFormVisible = true
      this.detailLoading = true
      QuaDetaiList({ TaskNum: row.TaskNum }).then(res => {
        if (res.IsPass === true) {
          res.Obj.map(item => {
            // 文本
            if (item.JudgmentWay === '1') {
              if (item.InspectValue !== '') {
                item.InspectResult = '合格'
              } else {
                item.InspectResult = '不合格'
              }
            } else {
              // 数值
              if (item.LowerLimit <= parseInt(item.InspectValue) && item.UpperLimit >= parseInt(item.InspectValue)) {
                item.InspectResult = '合格'
              } else {
                item.InspectResult = '不合格'
              }
            }
          })
          this.inServForm.tableDetaliData = res.Obj
          this.detailLoading = false
        }
      })
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            QuaTaskModify(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.editLoading = false
            })
          } else {
            const params = this.ruleForm
            params.TaskType = 'IPQC'
            params.InspectResult = 'NG'
            QuaTaskAdd(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.dialogFormVisible = false
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

    // 保存和提交
    submitDetailForm(formName, status) {
      this.detailLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          const newArr = this.inServForm.tableDetaliData.map(item => {
            if (item.InspectResult === '不合格') {
              item.InspectResult = 'NG'
            } else {
              item.InspectResult = 'OK'
            }
            return item
          })
          if (status === '0') {
            QuaDetaiSave(newArr).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
                this.detailFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.detailLoading = false
            })
          } else {
            QuaDetaiSubmit(newArr).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                })
                this.detailFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.detailLoading = false
            })
          }
        } else {
          this.detailLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },

    // 撤销
    handleRevoke() {},

    // 删除
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          QuaTaskDelete({ TaskNum: row.TaskNum }).then(res => {
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
</script>

<style>
.standardValueInput .el-form-item__content {
  margin-left: 0 !important;
}
.el-dialog__body .el-table__row .el-form-item {
  margin: 15px;
}
.el-dialog__body .el-form-item__content .el-tooltip {
  position: relative;
}
.el-dialog__body .el-form-item__content .iptCenter {
  position: absolute;
  left: -10px;
  color: red;
  z-index: 99;
}
</style>
