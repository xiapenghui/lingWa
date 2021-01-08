<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="生产工单号" placement="top-start"><label class="radio-label">生产工单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.OrderNum" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductCode" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品名称" placement="top-start"><label class="radio-label">成品名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductName" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="客户名称" placement="top-start"><label class="radio-label">客户名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.CustomerName" clearable /></el-col>
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
            <el-tooltip class="item" effect="dark" :enterable="false" content="生产计划单号" placement="top-start"><label class="radio-label">生产计划单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.PlanCode" /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工单类型" placement="top-start"><label class="radio-label">工单类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrderType" clearable style="width: 100%">
              <el-option v-for="item in PlanTypeNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工单状态" placement="top-start"><label class="radio-label">工单状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.Status" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="维护时间" placement="top-start"><label class="radio-label">维护时间:</label></el-tooltip>
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
      style="width: 100%;margin-top: 10px;"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生产计划单号" width="150" prop="PlanNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
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

      <el-table-column align="center" label="工单数量" width="150" prop="PlanQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单类型" width="150" prop="OrderTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户名称" width="150" prop="CustomerName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CustomerName }}
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
            <el-button type="warning" size="small" icon="el-icon-document" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" title="排单">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">

            <el-form-item label="计划开始日期">
              <el-date-picker v-model="ruleForm.PlanStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>

            <el-form-item label="计划投入产线" prop="ProductLineCode">
              <el-select v-model="ruleForm.ProductLineCode" placeholder="计划投入产线" style="width: 100%" clearable  >
                <el-option v-for="item in ProductList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" type="textarea" clearable /></el-form-item>
          </div>

          <div class="boxRight">

            <el-form-item label="计划结束日期">
              <el-date-picker v-model="ruleForm.PlanEndDate" value-format="yyyy-MM-dd" type="date" splaceholder="选择日期" clearable />
            </el-form-item>

            <el-form-item label="BOM版本" prop="BomVersion"><el-input v-model.trim="ruleForm.BomVersion" placeholder="BOM版本" disabled /></el-form-item>

            <el-form-item label="工艺路线" prop="RouteCode" :rules="[{ required: true, message: '请选择工艺路线', trigger: 'change' }]">
              <el-select v-model="ruleForm.RouteCode" placeholder="工艺路线" style="width: 100%" clearable>
                <el-option v-for="item in RouteNameList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="优先级" prop="Priority">
              <el-select v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" style="width: 100%" clearable >
                <el-option v-for="item in PriorityList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
// import moment from 'moment'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary, GetLine, GetRouteTextValuePair } from '@/api/BasicData'
import { orderList, orderModify } from '@/api/ProductionPlan'

const fixHeight = 260

export default {
  name: 'OrderMaintain',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {
        ProductName: '',
        CustomerName: '',
        BomVersion: ''
      }, // 编辑弹窗
      CreateTime: null,
      dialogFormVisible:false,
      BOMCode: null, // 获取新的Bomcode值
      PlanTypeNameData: [], // 工单类型下拉框
      StatusNameData: [], // 工单状态下拉框
      PriorityList: [], // 优先级下拉列表
      ProductList: [], // 计划投入产线
      RouteNameList: [], // 工艺路线
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        OrderNum: undefined,
        ProductCode: undefined,
        ProductName: undefined,
        CustomerName: undefined,
        OrderType: undefined,
        PrevStatus: undefined
      },
      listLoading: false, // 主列表
      editLoading: false, // 编辑loading
      total: 10,
      tableHeight: window.innerHeight - fixHeight, // 表格高度
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
    },

    immediate: true,
    deep: true
  },
  created() {
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
      })()
    }

    // 工单类型下拉
    GetDictionary({ code: '0008' }).then(res => {
      if (res.IsPass === true) {
        this.PlanTypeNameData = res.Obj
        this.isGive = res.Obj
      }
    })
    // 工单状态下拉
    GetDictionary({ code: '0010' }).then(res => {
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
    // 获取新增修改工艺路线下拉
    GetRouteTextValuePair().then(res => {
      if (res.IsPass === true) {
        this.RouteNameList = res.Obj
      }
    })

    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
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





    // 导出用户
    handleExport() {},
    // 导出用户
    formatJson(filterVal, jsonData) {
      // return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 导入
    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 1
      // if (isLt1M) {
      //   return true
      // }
      // this.$message({
      //   message: 'Please do not upload files larger than 1m in size.',
      //   type: 'warning'
      // })
      // return false
    },
    // handleSuccess({ results, header }) {
    //   this.tableData = results
    //   this.tableHeader = header
    // },
    // 获取列表
    getList() {
      this.listLoading = true
      orderList(this.pagination).then(res => {
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

    // 编辑
    handleEdit(row) {
      this.dialogFormVisible = true
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
          const params = this.ruleForm
          params.BomCode = this.BOMCode
          orderModify(params).then(res => {
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
.el-dialog__body {
  .el-col-6 {
    height: 30px;
    line-height: 25px;
    text-align: right;
  }
}

.app-container .pagination-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
