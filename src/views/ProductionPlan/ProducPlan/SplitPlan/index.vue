<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content1" placement="top-start"><label class="radio-label">计划单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.PlanNum" :placeholder="$t('permission.PlanNum')" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductNum" :placeholder="$t('permission.ProductNum')" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductName" :placeholder="$t('permission.ProductName')" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.CustomerName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.CustomerFullName" :placeholder="$t('permission.CustomerName')" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.PlanTypeName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PlanType" :placeholder="$t('permission.PlanTypeName')" clearable style="width: 100%">
              <el-option v-for="item in PlanTypeNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content7" placement="top-start">
              <label class="radio-label">{{ $t('permission.StatusName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PlanStatus" :placeholder="$t('permission.StatusName')" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.CreateTime') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="pagination.importDate"
              style="width: 250px;"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="true"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%;margin-top: 10px"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" :label="$t('permission.PlanNum')" width="150" prop="PlanNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ProductNum')" width="150" prop="ProductNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ProductName')" width="150" prop="ProductName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.PlanQuantity')" width="150" prop="PlanQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanQuantity }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.SchedulingQuantity')" width="150" prop="SchedulingQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SchedulingQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.LastQuantity')" width="150" prop="LastQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LastQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CompleteQuantity')" width="150" prop="CompleteQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CompleteQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="报废数量" width="150" prop="ScrapQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ScrapQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CustomerName')" width="150" prop="CustomerName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CustomerName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label=" 工艺路线名称" width="150" prop="RouteName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RouteName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleNum')" width="150" prop="SaleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleLineNum')" width="150" prop="SaleLineNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleLineNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanTypeName')" width="150" prop="PlanTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.StatusName')" width="150" prop="StatusName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StatusName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanDeliveryDate')" width="120" prop="PlanDeliveryDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanDeliveryDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanStartDate')" width="150" prop="PlanStartDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanEndDate')" width="150" prop="PlanEndDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RealStartDate')" width="150" prop="RealStartDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RealEndDate')" width="150" prop="RealEndDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="计划拆分" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-scissors" plain @click="planOpen(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="生产计划单号" prop="PlanNum" :rules="[{ required: isAlarmItem, message: '请输入生产计划单号', trigger: 'blur' }]">
              <el-input v-model.trim="ruleForm.PlanNum" placeholder="生产计划单号" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item :label="$t('permission.PlanTypeName')" prop="PlanType" :rules="[{ required: isAlarmItem, message: '请选择生产计划类型', trigger: 'change' }]">
              <el-radio-group v-model="ruleForm.PlanType" @change="changeRadio">
                <el-radio v-for="item in isGive" :key="item.value" :label="item.value" :value="item.value">{{ item.text }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('permission.PlanQuantity')" prop="PlanQuantity" :rules="[{ required: isAlarmItem, message: '请输入计划数量', trigger: 'blur' }]">
              <el-input v-model.trim="ruleForm.PlanQuantity" :placeholder="$t('permission.PlanQuantity')" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item :label="$t('permission.SchedulingQuantityOther')" prop="SchedulingQuantityOther">
              <el-input v-model="ruleForm.RemainingQuantity" :placeholder="$t('permission.SchedulingQuantityOther')" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="拆分数量" prop="SplitQuantity" :rules="[{ required: isAlarmItem, message: '请输入拆分数量', trigger: 'blur' }]">
              <el-input-number v-model.trim="ruleForm.SplitQuantity" placeholder="拆分数量" :min="0" clearable style="width: 100%" />
            </el-form-item>

            <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="成品名称" prop="ProductName" :rules="[{ required: isAlarmItem, message: '请输入成品名称', trigger: 'blur' }]">
              <el-input v-model="ruleForm.ProductName" placeholder="请选择" disabled />
            </el-form-item>

            <el-form-item label="客户名称"><el-input v-model="ruleForm.CustomerName" disabled /></el-form-item>

            <el-form-item label="工艺路线"><el-input v-model="ruleForm.RouteName" disabled /></el-form-item>

            <el-form-item

              :label="$t('permission.ProductLineCode')"
              prop="ProductLineCode"
              :rules="[{ required: isAlarmItem, message: '请选择计划投入产线', trigger: 'change' }]"
            >
              <el-select v-model="ruleForm.ProductLineCode" :placeholder="$t('permission.ProductLineCode')" style="width: 100%" clearable @change="changeLine">
                <el-option v-for="item in ProductList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('permission.Priority')" prop="Priority">
              <el-select v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" style="width: 100%" clearable @change="changePriority">
                <el-option v-for="item in PriorityList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>
            <!--
            <el-form-item v-if="planAdd" :label="$t('permission.PlanDeliveryDate')">
              <el-date-picker v-model="ruleForm.PlanDeliveryDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>
            <el-form-item :label="$t('permission.PlanStartDate')" prop="PlanStartDate" :rules="[{ required: isAlarmItemOther, message: '请输入计划开始日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.PlanStartDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>

            <el-form-item :label="$t('permission.PlanEndDate')" prop="PlanEndDate" :rules="[{ required: isAlarmItemOther, message: '请输入计划完成日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.PlanEndDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item> -->
          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="splitShow" type="primary" @click="submitSplit">{{ $t('permission.continueSplit') }}</el-button>
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
import { GetDictionary, GetLine } from '@/api/BasicData'
import Bus from '@/api/bus.js'
import { proList, SplitQuery, productionSplit } from '@/api/ProductionPlan'
const fixHeight = 260
const fixHeightBox = 350

export default {
  name: 'SplitPlan',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {
        ProductName: '',
        CustomerName: ''
      }, // 编辑弹窗
      CreateTime: null,
      isDisabled: false, // 拆分弹窗默认不能修改
      splitShow: true, // 继续拆分仅拆分可见
      isAlarmItem: true, // 必填项可见不可见
      isAlarmItemOther: true, // 必填项可见不可见
      PlanTypeNameData: [], // 计划类型下拉框
      StatusNameData: [], // 计划状态下拉框
      finshData: [], // 成品弹窗数组
      userData: [], // 客户名称弹窗数组
      isGive: [], // 弹窗计划类型radio数组
      PriorityList: [], // 优先级下拉列表
      ProductList: [], // 计划投入产线
      typeCode: null, // 计划类型code值
      MaterialCode: null, // Bom版本值
      gongLineName: null, // 工艺路线
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        PlanNum: undefined,
        ProductNum: undefined,
        ProductName: undefined,
        CustomerName: undefined,
        PlanTypeName: undefined,
        StatusName: undefined
      },

      listLoading: false, // 主列表
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTypeTitle: null,
      newLine: null, // 获取计划下拉产线
      newPriority: null, // 获取下拉优先级
      newBOMCode: null, // BOM版本
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      parentMsg: this.$t('permission.importCompany'),
      content1: this.$t('permission.PlanNum'),
      content2: this.$t('permission.ProductNum'),
      content3: this.$t('permission.ProductName'),
      content4: this.$t('permission.CreateTime'),
      content5: this.$t('permission.CustomerName'),
      content6: this.$t('permission.PlanTypeName'),
      content7: this.$t('permission.StatusName')
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
      this.parentMsg = this.$t('permission.importCompany')
      this.content1 = this.$t('permission.PlanNum')
      this.content2 = this.$t('permission.ProductNum')
      this.content3 = this.$t('permission.ProductName')
      this.content4 = this.$t('permission.CreateTime')
      this.content5 = this.$t('permission.CustomerName')
      this.content6 = this.$t('permission.PlanTypeName')
      this.content7 = this.$t('permission.StatusName')
    }
  },
  created() {
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
        that.tableBoxHeight = window.innerHeight - fixHeightBox
      })()
    }

    // 计划类型下拉
    GetDictionary({ code: '0008' }).then(res => {
      if (res.IsPass === true) {
        this.PlanTypeNameData = res.Obj
        this.isGive = res.Obj
      }
    })
    // 计划状态下拉
    GetDictionary({ code: '0016' }).then(res => {
      if (res.IsPass === true) {
        this.StatusNameData = res.Obj
      }
    })
    // 优先级下拉
    GetDictionary({ code: '0017' }).then(res => {
      if (res.IsPass === true) {
        this.PriorityList = res.Obj
      }
    })
    // 拆分生产计划产线下拉
    GetLine().then(res => {
      if (res.IsPass === true) {
        this.ProductList = res.Obj
      }
    })
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },
    // 改变搜索框开始结束时间触发
    importChange(val) {
      if (val === null) {
        this.$nextTick(function() {
          this.pagination.importDate = []
          this.pagination.ModifyTimeStart = ''
          this.pagination.ModifyTimeEnd = ''
        })
      } else {
        this.pagination.importDate[0] = val[0]
        this.pagination.importDate[1] = val[1]
        this.pagination.ModifyTimeStart = this.pagination.importDate[0]
        this.pagination.ModifyTimeEnd = this.pagination.importDate[1]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    // 获取计划下拉产线
    changeLine(val) {
      this.newLine = val
    },

    // 获取下拉优先级
    changePriority(val) {
      this.newPriority = val
    },

    // 新增获取单选value的值
    changeRadio(val) {
      this.typeCode = val
    },

    // 导出用户
    handleExport() {},
    // 导出用户
    formatJson(filterVal, jsonData) {
      // return jsonData.map(v => filterVal.map(j => v[j]))
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
    // handleSuccess({ results, header }) {
    //   this.tableData = results
    //   this.tableHeader = header
    // },
    // 获取列表
    getList() {
      this.listLoading = true
      proList(this.pagination).then(res => {
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

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          productionSplit(this.ruleForm).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: this.$t('table.SplitSuc')
              })
              SplitQuery({ PlanCode: this.ruleForm.PlanCode }).then(res => {
                if (res.IsPass === true) {
                  this.ruleForm = res.Obj
                }
              })
              this.getList()
              Bus.$emit('getList')
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
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },

    // 继续拆分
    submitSplit() {
      this.editLoading = true
      productionSplit(this.ruleForm).then(res => {
        if (res.IsPass === true) {
          this.$message({
            type: 'success',
            message: this.$t('table.SplitSuc')
          })
          SplitQuery({ PlanCode: this.ruleForm.PlanCode }).then(res => {
            if (res.IsPass === true) {
              this.ruleForm = res.Obj
              this.ruleForm.RouteName = this.gongLineName
            }
          })
          this.getList()
          Bus.$emit('getList')
        } else {
          this.$message({
            type: 'error',
            message: res.MSG
          })
        }
        this.editLoading = false
      })
    },

    // 计划拆分
    planOpen(row) {
      this.dialogTypeTitle = this.$t('permission.splitProductiony')
      this.dialogFormVisible = true
      this.isDisabled = true
      this.splitShow = true
      this.isAlarmItem = true
      this.isAlarmItemOther = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      SplitQuery({ PlanCode: row.PlanCode }).then(res => {
        if (res.IsPass === true) {
          this.ruleForm = res.Obj
          this.ruleForm.RouteName = row.RouteName
          this.gongLineName = row.RouteName
        }
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
.active {
  .el-input__inner {
    background: transparent;
    cursor: pointer;
  }
}
</style>
