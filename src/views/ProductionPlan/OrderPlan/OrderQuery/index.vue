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
          <el-col :span="16"><el-input v-model.trim="pagination.ProductNum" clearable /></el-col>
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

        <el-col :span="3">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
        <el-col :span="1">
          <el-button v-if="btnShow" class="btnSearchUP" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('0')" />
          <el-button v-else class="btnSearchDown" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('1')" />
        </el-col>
      </el-row>

      <el-row v-show="showSearch" :gutter="20" style="margin-top: 10px;">
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

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">导出</el-button>
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

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="120">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" :enterable="false" content="工艺路线" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-s-operation" plain @click="handleLine(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="BOM" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-tickets" plain @click="handleBOM(scope.row)" />
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!-- BOM弹窗 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="bomFormVisible" title="BOM信息表" width="70%" height="50%">
      <el-table
        v-loading="bomBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="bomData"
        style="width: 100%"
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

        <el-table-column align="center" label="工序编号" width="150" prop="ProcessCodeNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessCodeNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="工序名称" width="150" prop="ProcessCodeName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessCodeName }}
          </template>
        </el-table-column>
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

        <el-table-column align="center" label="原料规格" width="150" prop="MaterialSpec" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MaterialSpec }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="用量" width="150" prop="Usage" sortable>
          <template slot-scope="scope">
            {{ scope.row.Usage }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="替代原料编号" width="170" prop="SubMaterialNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SubMaterialNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="替代原料名称" width="170" prop="SubMaterialName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SubMaterialName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Remark }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 工艺线路弹窗 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="lineFormVisible" title="工艺路线信息表" width="70%" height="50%">
      <el-table
        v-loading="lineBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="lineData"
        style="width: 100%"
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

        <el-table-column align="center" label="工序编号" width="200" prop="ProcessNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="工序名称" width="200" prop="ProcessName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否检验" prop="IsChecked" sortable>
          <template slot-scope="scope">
            <el-tag :style="{ color: scope.row.IsChecked === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsChecked === false ? '否' : '是' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="检验方式" prop="CheckedTypeText" sortable>
          <template slot-scope="scope">
            {{ scope.row.CheckedTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否必过" prop="IsMustPass" sortable>
          <template slot-scope="scope">
            <el-tag :style="{ color: scope.row.IsMustPass === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsMustPass === false ? '否' : '是' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否打印" prop="IsPrint" sortable>
          <template slot-scope="scope">
            <el-tag :style="{ color: scope.row.IsPrint === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsPrint === false ? '否' : '是' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="顺序" prop="OrderNum" sortable>
          <template slot-scope="scope">
            {{ scope.row.OrderNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Description }}
          </template>
        </el-table-column>

      </el-table>
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
import { GetDictionary, bomDetailList, baseDetailList } from '@/api/BasicData'
import { orderList } from '@/api/ProductionPlan'

const fixHeight = 260
const fixHeightBox = 350

export default {
  name: 'OrderQuery',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      CreateTime: null,
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      dialogTypeTitle: null,
      PlanTypeNameData: [], // 工单类型下拉框
      StatusNameData: [], // 工单状态下拉框
      bomData: [], // BOM弹窗
      lineData: [], // 工艺路线弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        OrderNum: undefined,
        ProductNum: undefined,
        ProductName: undefined,
        CustomerName: undefined,
        OrderType: undefined,
        PrevStatus: undefined
      },
      listLoading: false, // 主列表
      bomBoxLoading: false, // bom弹窗loading
      lineBoxLoading: false, // 工艺路线弹窗loading
      total: 10,
      bomFormVisible: false, // BOM弹窗
      lineFormVisible: false, // 工艺路线弹窗
      addShow: true, // 继续添加仅新增可见
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
        that.tableBoxHeight = window.innerHeight - fixHeightBox
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

    // 折叠按钮互斥
    toggle(status) {
      if (status === '0') {
        if (window.innerHeight < 800) {
          this.tableHeight = '60vh'
        } else {
          this.tableHeight = '68vh'
        }
      }
      if (status === '1') {
        if (window.innerHeight < 800) {
          this.tableHeight = '63vh'
        } else {
          this.tableHeight = '73vh'
        }
      }
      this.btnShow = !this.btnShow
      this.showSearch = !this.showSearch
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

    // BOM
    handleBOM(row) {
      const params = {
        BomCode: row.BomCode
      }
      if (row.BomCode === null) {
        this.$message('暂无数据！')
      } else {
        bomDetailList(params).then(res => {
          if (res.IsPass === true) {
            this.bomFormVisible = true
            this.bomBoxLoading = true
            this.bomData = res.Obj
          }
          this.bomBoxLoading = false
        })
      }
    },

    // 查看工艺路线
    handleLine(row) {
      const params = {
        ProcessRouteCode: row.RouteCode
      }
      if (row.RouteCode === null) {
        this.$message('暂无数据！')
      } else {
        baseDetailList(params).then(res => {
          if (res.IsPass === true) {
            this.lineFormVisible = true
            this.lineBoxLoading = true
            this.lineData = res.Obj
          }
          this.lineBoxLoading = false
        })
      }
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
