<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备类型" placement="top-start"><label class="radio-label">设备类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.quTypeCode" clearable style="width: 100%">
              <el-option v-for="item in EquTypeCodeData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="预警级别" placement="top-start"><label class="radio-label">预警级别:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PreWarn" clearable style="width: 100%">
              <el-option v-for="item in DeviceGradeData" :key="item.value" :label="item.text" :value="item.value" />
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" type="selection" width="150" />

      <el-table-column align="center" label="设备编号" width="150" prop="EquNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备名称" width="150" prop="EquName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备型号" width="150" prop="Spec" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Spec }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备类型" width="150" prop="EquTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="保养周期 (天)" width="150" prop="MaintainDays" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaintainDays }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="预警产量 (个)" width="180" prop="PreAlertTimes" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PreAlertTimes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="购入日期" width="150" prop="GetData" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GetData | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上次保养日期" width="150" prop="LastMtDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LastMtDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际产量" width="150" prop="ActTimes" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ActTimes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="预警级别" width="150" prop="PreWarn" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PreWarn }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划保养日期" width="150" prop="PlanDate" sortable :show-overflow-tooltip="true" fixed="right">
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.PlanDate" :picker-options="expireTimeOption" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划保养人员" width="150" prop="MtItemsNum" sortable :show-overflow-tooltip="true" fixed="right">
        <template slot-scope="scope">
          <el-select v-model="scope.row.PlanUserCode" placeholder="计划保养人员" clearable style="width: 100%">
            <el-option v-for="item in RepairUserData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <el-button icon="el-icon-s-tools" type="primary" style="float: left;margin-top: 15px;" @click="heandSave()">生成保养计划</el-button>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetSysUserTextValuePair, GetDictionary } from '@/api/BasicData'
import { GetValuePair, EquPlanList, FormulatePlan } from '@/api/DeviceData'
const fixHeight = 220
import Bus from '@/api/bus.js'
export default {
  name: 'IncomingInsp',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        PreWarn: undefined,
        EquTypeCode: undefined,
        ShowBanned: false
      },
      listLoading: false,
      total: 10,
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 8.64e7
        }
      },
      multipleSelection: [], // 多选
      EquTypeCodeData: [], // 设备类型下拉
      RepairUserData: [], // 计划保养人员
      DeviceGradeData: [], // 预警级别
      tableHeight: window.innerHeight - fixHeight // 表格高度
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

    // 检验类型下拉
    GetValuePair().then(res => {
      if (res.IsPass === true) {
        this.EquTypeCodeData = res.Obj
      }
    })

    // 维修人员
    GetSysUserTextValuePair().then(res => {
      if (res.IsPass === true) {
        this.RepairUserData = res.Obj
      }
    })

    // 预警级别
    GetDictionary({ code: '0034' }).then(res => {
      if (res.IsPass === true) {
        this.DeviceGradeData = res.Obj
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

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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
      EquPlanList(this.pagination).then(res => {
        this.tableData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    // 保存保养计划
    heandSave() {
      debugger
      if (this.multipleSelection.length > 0) {
        this.listLoading = true
        FormulatePlan(this.multipleSelection).then(res => {
          if (res.IsPass === true) {
            this.$message({
              message: res.MSG,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.MSG,
              type: 'error'
            })
          }
          this.listLoading = false
        })
      } else {
        this.$message({
          message: '请勾选保养项',
          type: 'error'
        })
      }
      Bus.$emit('getList')
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

<style lang="scss" scoped>
::v-deep .el-table__header-wrapper .el-checkbox__input::after {
  content: '是否保养';
  color: #ffffff;
  margin: 0 5px;
}

::v-deep .el-checkbox   .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:  #17da17;
  border:1px solid #17da17 ;
}

::v-deep .el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: #17da17;
  border:1px solid #17da17 ;
}
</style>
