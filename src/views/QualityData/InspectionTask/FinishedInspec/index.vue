<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品序列号" placement="top-start"><label class="radio-label">成品序列号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.WarehouseNum" placeholder="成品序列号" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.WarehouseNum" placeholder="成品编号" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="状态" placement="top-start"><label class="radio-label">状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.TaskType" clearable style="width: 100%">
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
      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务单号" width="150" prop="WarehouseNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品序列号" width="150" prop="WarehouseName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品编号" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品名称" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单号" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验结果" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划检验日期" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际检验日期" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
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
          <!-- {{ scope.row.ModifyTime | substringTime }} -->
          {{ scope.row.ModifyTime }}
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
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.EditCompany') : $t('permission.addCompany')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="检验单号" prop="OrderNum"><el-input v-model.trim="ruleForm.OrderNum" placeholder="检验单号" disabled /></el-form-item>
        <el-form-item label="条码" prop="ProductLineCode"><el-input v-model.trim="ruleForm.ProductLineCode" placeholder="扫描产品序列号" onkeyup="value=value.replace(/[\u4e00-\u9fa5/\s+/]/ig,'')" clearable /></el-form-item>
        <el-form-item label="工单号" prop="WarehouseName"><el-input v-model.trim="ruleForm.WarehouseName" placeholder="工单号" disabled /></el-form-item>
        <el-form-item label="成品名称" prop="WarehouseName"><el-input v-model.trim="ruleForm.WarehouseName" placeholder="成品名称" disabled /></el-form-item>

        <el-form-item label="计划检验日期" prop="EffectiveDate">
          <el-date-picker
            v-model="ruleForm.EffectiveDate"
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
      <el-form ref="ruleForm" v-loading="detailLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-table
          v-loading="listLoading"
          :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
          :data="tableData"
          height="55vh"
          style="width: 100%;"
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

          <el-table-column align="center" label="检验项目" width="150" prop="WarehouseNum" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.WarehouseNum }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="下限值" prop="LowerLimit" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.LowerLimit }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="上限值" prop="UpperLimit" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.UpperLimit }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="检测值" prop="StandardValue" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" label="请输入数字" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="检验结果" prop="WarehouseType" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.WarehouseType }}
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div style="text-align:right;margin-top: 20px;">
        <el-button type="danger" @click="detailFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
import { GetDictionary } from '@/api/BasicData'
import { CreateTaskNum } from '@/api/QualityData'
import { StoWareAdd, StoWareDelete, StoWareModify } from '@/api/WarehouseData'
const fixHeight = 260
export default {
  name: 'CompanyMaintenance',
  components: { Pagination },
  data() {
    return {
      tableData: [
        {
          WarehouseNum: '1'
        }
      ],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        WarehouseNum: undefined,
        WarehouseName: undefined
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
        OrderNum: [{ required: true, message: '请输入任务单号', trigger: 'blur' }],
        WarehouseName: [{ required: true, message: '请输入仓库类型', trigger: 'blur' }],
        IsFIFO: [{ required: true, message: '请选择FIFO', trigger: 'change' }],
        IsShelfManage: [{ required: true, message: '请选择是否上架', trigger: 'change' }]
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
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        WarehouseNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        WarehouseName: [{ required: true, message: '请输入仓库类型', trigger: 'blur' }],
        IsFIFO: [{ required: true, message: '请选择FIFO', trigger: 'change' }],
        IsShelfManage: [{ required: true, message: '请选择是否上架', trigger: 'change' }]
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
      // this.listLoading = true
      // StoWareList(this.pagination).then(res => {
      //   this.tableData = res.Obj
      //   this.total = res.TotalRowCount
      //   this.listLoading = false
      // })
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
        OrderNum: ''
      }
      CreateTaskNum().then(res => {
        if (res.IsPass === true) {
          this.ruleForm.OrderNum = res.Obj
        }
      })
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
      this.detailLoading = false
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            StoWareModify(this.ruleForm).then(res => {
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
            StoWareAdd(this.ruleForm).then(res => {
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
          StoWareDelete({ WarehouseCode: row.WarehouseCode }).then(res => {
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

<style lang="scss" scoped></style>
