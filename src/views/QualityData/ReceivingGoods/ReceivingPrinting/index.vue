<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="收货凭证" placement="top-start"><label class="radio-label">收货凭证:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.RecvCret" placeholder="收货凭证" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="物料编码" placement="top-start"><label class="radio-label">物料编码:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialNum" placeholder="物料编码" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="条码" placement="top-start"><label class="radio-label">条码:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.Barcode" placeholder="条码" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="维护时间" placement="top-start"><label class="radio-label">收货时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="pagination.importDate"
              class="pickerCss"
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

        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">导出</el-button>
      <el-button type="primary" icon="el-icon-takeaway-box" :loading="downloadLoading" @click="handleGoods">标签补打</el-button>
      <el-button type="primary" icon="el-icon-takeaway-box" :loading="downloadLoading2" @click="handleBarCode">收货单补打</el-button>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" type="selection" width="80" fixed />

      <el-table-column align="center" label="条码" min-width="150" prop="Barcode" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Barcode }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="数量" width="150" prop="TotalQty" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TotalQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="打印时间" width="150" prop="PrintTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PrintTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货凭证" min-width="150" prop="RecvCret" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RecvCret }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货凭证行号" min-width="150" prop="RowNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RowNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料编码" min-width="150" prop="MaterialNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料名称" width="150" prop="MaterialName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料属性" width="150" prop="MaterialAttributeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialAttributeText }}
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { ListCommonSearch, RepeatPrintBarcode, PrintReceipt } from '@/api/QualityData'
const fixHeight = 260
export default {
  name: 'ProcessDefect',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        Barcode: undefined,
        RecvCret: undefined,
        MaterialNum: undefined
      },
      listLoading: false,
      showSearch: false, // 隐藏搜索条件
      btnShow: true, // 互斥按钮
      addShow: true, // 继续新增
      total: 0,
      newRecvCode: null,
      multipleSelection: [], // 多选
      downloadLoading: false, // 打印条码loading
      downloadLoading2: false, // 打印收货单loading
      filename: '标签补打',
      filename2: '打印收货单',
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
          this.pagination.StartDate = ''
          this.pagination.EndDate = ''
        })
      } else {
        this.pagination.importDate[0] = val[0]
        this.pagination.importDate[1] = val[1]
        this.pagination.StartDate = this.pagination.importDate[0]
        this.pagination.EndDate = this.pagination.importDate[1]
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
      ListCommonSearch(this.pagination).then(res => {
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

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 标签补打
    handleGoods() {
      if (this.multipleSelection.length) {
        const BarcodeArrList = []
        this.multipleSelection.map(res => {
          debugger
          BarcodeArrList.push(res.Barcode)
          this.newRecvCode = res.RecvCode
        })

        const params = {
          BarcodeArr: BarcodeArrList,
          RecvCode: this.newRecvCode
        }

        RepeatPrintBarcode(params).then(res => {
          if (res.IsPass === true) {
            this.getList()
            this.BarCode()
          } else {
            this.$message({
              type: 'error',
              message: res.MSG
            })
          }
        })
      } else {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'warning'
        })
      }
    },

    // 打印收货单
    handleBarCode() {
      if (this.multipleSelection.length) {
        const RecvCodeList2 = []
        this.multipleSelection.map(res => {
          RecvCodeList2.push(res.RecvCode)
        })
        PrintReceipt({ RecvCodeArr: RecvCodeList2 }).then(res => {
          if (res.IsPass === true) {
            this.getList()
            this.BarCode2()
          } else {
            this.$message({
              type: 'error',
              message: res.MSG
            })
          }
        })
      } else {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'warning'
        })
      }
    },

    // 标签补打
    BarCode() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['条码', '数量', '打印时间', '收货凭证', '收货凭证行号', '物料编码', '物料名称', '物料属性']
        const filterVal = ['Barcode', 'TotalQty', 'PrintTime', 'RecvCret', 'RowNum', 'MaterialNum', 'MaterialName', 'MaterialAttributeText']
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename
        })
        this.$refs.multipleTable.clearSelection()
        this.downloadLoading = false
      })
    },

    // 收货单
    BarCode2() {
      this.downloadLoading2 = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['条码', '数量', '打印时间', '收货凭证', '收货凭证行号', '物料编码', '物料名称', '物料属性']
        const filterVal = ['Barcode', 'TotalQty', 'PrintTime', 'RecvCret', 'RowNum', 'MaterialNum', 'MaterialName', 'MaterialAttributeText']
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename2
        })
        this.$refs.multipleTable.clearSelection()
        this.downloadLoading2 = false
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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

::v-deep .el-checkbox .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #17da17;
  border: 1px solid #17da17;
}

::v-deep .el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #17da17;
  border: 1px solid #17da17;
}

.search .pickerCss {
  width: 250px;
}

@media screen and (min-width: 1601px) and (max-width: 1800px) {
  .search .pickerCss {
    width: 220px;
  }
}

@media screen and (min-width: 1350px) and (max-width: 1600px) {
  .search .pickerCss {
    width: 200px;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1349px) {
  .search .pickerCss {
    width: 150px;
  }
}
</style>
