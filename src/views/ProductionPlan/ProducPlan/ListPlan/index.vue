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
        <!-- <el-col :span="5">
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
        </el-col> -->
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

      <el-table-column align="center" label="生产计划单号" width="150" prop="PlanNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划类型" width="150" prop="PlanTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生产工单号" width="150" prop="OrderNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
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

      <el-table-column align="center" label="客户名称" width="150" prop="CustomerName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CustomerName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工单类型" width="150" prop="OrderTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单数量" width="150" prop="PlanQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="已投数量" width="150" prop="InputQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InputQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="完工数量" width="150" prop="CompleteQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CompleteQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="未完工数" width="150" prop="UnfinishedQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UnfinishedQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="报废数量" width="150" prop="ScrapQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ScrapQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="销售单号" width="150" prop="SaleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="销售单行号" width="150" prop="SaleLineNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleLineNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单状态" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StatusText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="优先级" width="150" prop="Priority" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Priority }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划投入产线" width="150" prop="ProductLineName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductLineName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="BOM版本" width="150" prop="BomVersion" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.BomVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工艺路线" width="150" prop="RouteName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RouteName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计开始日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划完成日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际开始日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际完成日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
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
          <el-tooltip class="item" effect="dark" :enterable="false" content="排单" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-document" plain @click="planOpen(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" title="排单信息表">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
        <el-form-item :label="$t('permission.PlanStartDate')" prop="PlanStartDate" :rules="[{ required: true, message: '请输入计划开始日期', trigger: 'blur' }]">
          <el-date-picker v-model="ruleForm.PlanStartDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>

        <el-form-item :label="$t('permission.PlanEndDate')" prop="PlanEndDate" :rules="[{ required: true, message: '请输入计划完成日期', trigger: 'blur' }]">
          <el-date-picker v-model="ruleForm.PlanEndDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>

        <el-form-item label="工艺路线" prop="RouteName" :rules="[{ required: true, message: '请选择工艺路线', trigger: 'change' }]">
          <el-input v-model="ruleForm.RouteName" readonly placeholder="请选择" class="disActive" @focus="lineBox" />
        </el-form-item>

        <el-form-item :label="$t('permission.Priority')" prop="Priority" :rules="[{ required: true, message: '请选择优先级', trigger: 'blur' }]">
          <el-select v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" style="width: 100%" clearable @change="changePriority">
            <el-option v-for="item in PriorityList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 新增加页面工艺路线聚焦弹窗 -->
    <LineName
      :line-show="lineFormVisible"
      :line-loading="lineLoading"
      :table-box-height="tableBoxHeight"
      :line-data="lineData"
      :pagination-search-line="paginationSearchLine"
      @lineClick="lineClick"
      @lineClose="lineClose"
      @lineBox="lineBox"
    />
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import LineName from '@/components/LineName' // 工艺路线弹
import { GetDictionary, baseRouteList } from '@/api/BasicData'
import { PlanScheduleList, ModifyPlanSchedule } from '@/api/ProductionPlan'
const fixHeight = 260
const fixHeightBox = 350

export default {
  name: 'SplitPlan',
  components: { Pagination, LineName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      CreateTime: null,
      PlanTypeNameData: [], // 计划类型下拉框
      StatusNameData: [], // 计划状态下拉框
      PriorityList: [], // 优先级下拉列表
      lineData: [], // 工艺路线封装Loading
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
      // 搜索工艺路线条件
      paginationSearchLine: {
        Name: undefined,
        PageIndex: 1,
        PageSize: 10000,
        ShowBanned: false
      },
      listLoading: false, // 主列表
      editLoading: false, // 编辑loading
      lineLoading: false, // 工艺路线封装loading
      total: 10,
      lineFormVisible: false, // 工艺路线封装弹窗
      dialogFormVisible: false, // 编辑弹出框
      newPriority: null, // 获取下拉优先级
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

    // 获取下拉优先级
    changePriority(val) {
      this.newPriority = val
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
      PlanScheduleList(this.pagination).then(res => {
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
          ModifyPlanSchedule(this.ruleForm).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: '排单成功'
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
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },

    // 排单
    planOpen(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 聚焦事件工艺路线弹窗
    lineBox() {
      this.lineFormVisible = true
      this.lineLoading = true
      baseRouteList(this.paginationSearchLine).then(res => {
        if (res.IsPass === true) {
          this.lineData = res.Obj
          this.lineLoading = false
        }
      })
    },
    // 工艺路线弹窗搜索
    LineBox() {
      this.paginationSearchLine.PageIndex = 1
      this.lineBox()
    },
    // 增加工艺路线双击事件获取当前行的值
    lineClick(row) {
      // this.ruleForm.RouteName = row.Name
      this.$set(this.ruleForm, 'RouteName', row.Name)
      this.ruleForm.RouteCode = row.ProcessRouteCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.lineFormVisible = false
    },
    // 关闭工艺路线查询弹窗
    lineClose() {
      this.lineFormVisible = false
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
