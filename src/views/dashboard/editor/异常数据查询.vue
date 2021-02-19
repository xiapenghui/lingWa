<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常名称" placement="top-start"><label class="radio-label">异常名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductNum" placeholder="异常名称" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工位名称" placement="top-start"><label class="radio-label">工位名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.TerminalName" placeholder="工位名称" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常类型" placement="top-start"><label class="radio-label">异常类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.ExceptType" placeholder="异常类型" clearable style="width: 100%">
              <el-option v-for="item in ExceptTypeData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="处理状态" placement="top-start"><label class="radio-label">处理状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.Status" placeholder="处理状态" clearable style="width: 100%">
              <el-option v-for="item in StatusData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
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
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常时间" placement="top-start"><label class="radio-label">异常时间:</label></el-tooltip>
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

      <el-table-column align="center" label="记录编号" width="150" prop="PlanNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常编号" width="150" prop="ExceptNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常名称" min-width="200" prop="ExceptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常类型" width="150" prop="ExceptType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属部门" width="150" prop="OrderNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常工位" width="150" prop="TerminalName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常发送时间" width="150" prop="HappenTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.HappenTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="发送人员" width="150" prop="ExceptionThrowerName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptionThrowerName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常相应时间" width="150" prop="OrderTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="响应人员" width="150" prop="ResponseUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ResponseUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常结束时间" width="150" prop="EndTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EndTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="结束人员" width="150" prop="EndUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EndUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="处理状态" width="150" prop="StatusText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StatusText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="响应时间" width="150" prop="ResponseTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ResponseTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="处理时间" width="150" prop="SaleLineNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleLineNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="影响时间" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StatusText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常备注" min-width="200" prop="Remark" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />
  </div>
</template>
<script>
import '../../../styles/scrollbar.css'
import '../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { GetDictionary } from '@/api/BasicData'
import { AdnExceptList } from '@/api/Andon'
const fixHeight = 260
export default {
  name: 'SplitPlan',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        ExceptName: undefined,
        TerminalName: undefined,
        ExceptType: undefined,
        Status: undefined
      },
      listLoading: false, // 主列表
      total: 10,
      ExceptTypeData: [], // 异常类型
      StatusData: [], // 处理状态
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
      }
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

    // 异常类型下拉
    GetDictionary({ code: '0036' }).then(res => {
      if (res.IsPass === true) {
        this.ExceptTypeData = res.Obj
      }
    })

    // 异常处理状态下拉
    GetDictionary({ code: '0035' }).then(res => {
      if (res.IsPass === true) {
        this.StatusData = res.Obj
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
          this.pagination.HappenTimeStart = ''
          this.pagination.HappenTimeEnd = ''
        })
      } else {
        this.pagination.importDate[0] = val[0]
        this.pagination.importDate[1] = val[1]
        this.pagination.HappenTimeStart = this.pagination.importDate[0]
        this.pagination.HappenTimeEnd = this.pagination.importDate[1]
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
      AdnExceptList(this.pagination).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
