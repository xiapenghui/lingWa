<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备编号" placement="top-start"><label class="radio-label">设备编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.EquNum" placeholder="设备编号" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备名称" placement="top-start"><label class="radio-label">设备名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.EquName" placeholder="设备名称" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备类型" placement="top-start"><label class="radio-label">设备类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.EquTypeCode" clearable style="width: 100%">
              <el-option v-for="item in EquTypeCodeData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
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
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="设备编号" width="180" prop="EquNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备名称" width="180" prop="EquName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备类型" width="180" prop="EquTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="预警级别" width="180" prop="PreWarn" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.PreWarn==='绿色'" effect="dark" type="success">{{ scope.row.PreWarn }}</el-tag>
          <el-tag v-else-if="scope.row.PreWarn==='黄色'" effect="dark" type="warning"> {{ scope.row.PreWarn }}</el-tag>
          <el-tag v-else-if="scope.row.PreWarn==='红色'" effect="dark" type="danger">{{ scope.row.PreWarn }}</el-tag>
          <span v-else />
        </template>
      </el-table-column>

      <el-table-column align="center" label="保养周期 (天)" width="180" prop="MaintainDays" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaintainDays }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="预警产量 (个)" width="180" prop="PreAlertTimes" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PreAlertTimes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际产量 (个)" width="180" prop="ActTimes" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ActTimes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="购入日期" width="180" prop="GetData" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GetData | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上次保养日期" width="180" prop="LastMtDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LastMtDate | substringTime }}
        </template>
      </el-table-column>

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
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary } from '@/api/BasicData'
import { GetValuePair, EquMainList } from '@/api/DeviceData'
const fixHeight = 220
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
        MtItemsNum: undefined,
        ShowBanned: false
      },
      listLoading: false,
      total: 10,
      EquTypeCodeData: [], // 设备类型下拉
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
    },

    // input禁止输入中文
    'ruleForm.MtItemsNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.MtItemsNum = this.filterInput(val)
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
      EquMainList(this.pagination).then(res => {
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
