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
            <el-tooltip class="item" effect="dark" :enterable="false" content="故障类型" placement="top-start"><label class="radio-label">故障类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.FaultCode" clearable style="width: 100%">
              <el-option v-for="item in FaultData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
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
            <el-tooltip class="item" effect="dark" :enterable="false" content="维修日期" placement="top-start"><label class="radio-label">维修日期:</label></el-tooltip>
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
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="维修记录编号" width="150" prop="TaskNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TaskNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维修日期" width="150" prop="RepairDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RepairDate | substringTime }}
        </template>
      </el-table-column>

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

      <el-table-column align="center" label="设备类型" width="150" prop="EquTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商名称" width="150" prop="SupplierName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SupplierName }}
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

      <el-table-column align="center" label="故障类型" width="150" prop="FaultName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.FaultName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="故障描述" width="150" prop="FaultDescription" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.FaultDescription }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维修方法" width="150" prop="RepairMethod" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RepairMethod }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维修人员" width="150" prop="RepairUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RepairUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="记录人员" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="维修详情" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-tickets" plain @click="handleDetail(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!-- 维修记录明细弹窗 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="mainFormVisible" title="维修明细表" width="70%" height="50%">
      <el-table
        v-loading="detailLoading"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="detailData"
        :height="tableBoxHeight"
        style="width: 100%;margin-top: 10px;"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

        <el-table-column align="center" label="维修记录编号" width="200" prop="TaskNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.TaskNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备件编号" width="200" prop="SpareNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SpareNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备件名称" width="200" prop="SpareName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SpareName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备件数量" width="150" prop="SpareQty" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SpareQty }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="单位" width="150" prop="SpareUnit" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SpareUnit }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Remark }}
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary } from '@/api/BasicData'
import { GetValuePair, EquRpList, EquRpList2 } from '@/api/DeviceData'
const fixHeight = 220
const fixHeightBox = 350
export default {
  name: 'MainDetail',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      CreateTime: null,
      btnShow: true, // 互斥按钮
      showSearch: false, // 折叠显示隐藏
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        EquNum: undefined,
        EquName: undefined,
        EquTypeCode: undefined,
        FaultCode: undefined,
        importDate: [],
        ShowBanned: false
      },
      listLoading: false,
      detailLoading: false, // 详情loading
      detailData: [], // 详情数组
      FaultData: [], // 故障类型
      mainFormVisible: false, // 维修记录详情
      total: 10,
      EquTypeCodeData: [], // 设备类型下拉
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

      parentMsg: this.$t('permission.importCompany')
      // content1: this.$t('permission.companyNo'),
      // content2: this.$t('permission.companyName'),
      // content3: this.$t('permission.inclusionCompany'),
      // content4: this.$t('permission.companyAllName'),
      // content5: this.$t('permission.companyTel'),
      // content6: this.$t('permission.companyAddress'),
      // content7: this.$t('permission.companyLogo'),
      // content8: this.$t('permission.companyDescription')
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
      // this.parentMsg = this.$t('permission.importCompany')
      // this.content1 = this.$t('permission.companyNo')
      // this.content2 = this.$t('permission.companyName')
      // this.content3 = this.$t('permission.inclusionCompany')
      // this.content4 = this.$t('permission.companyAllName')
      // this.content5 = this.$t('permission.companyTel')
      // this.content6 = this.$t('permission.companyAddress')
      // this.content7 = this.$t('permission.companyLogo')
      // this.content8 = this.$t('permission.companyDescription')
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

    // 检验类型下拉
    GetValuePair().then(res => {
      if (res.IsPass === true) {
        this.EquTypeCodeData = res.Obj
      }
    })

    // 故障类型下拉
    GetDictionary({ code: '0031' }).then(res => {
      if (res.IsPass === true) {
        this.FaultData = res.Obj
      }
    })

    this.getList()

    // Mock: get all routes and roles list from server
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
          this.pagination.RepairDateStart = ''
          this.pagination.RepairDateEnd = ''
        })
      } else {
        this.pagination.importDate[0] = val[0]
        this.pagination.importDate[1] = val[1]
        this.pagination.RepairDateStart = this.pagination.importDate[0]
        this.pagination.RepairDateEnd = this.pagination.importDate[1]
      }
    },

    // 折叠按钮互斥
    toggle(status) {
      if (status === '0') {
        if (window.innerHeight < 800) {
          this.tableHeight = '65vh'
        } else {
          this.tableHeight = '72vh'
        }
      }
      if (status === '1') {
        if (window.innerHeight < 800) {
          this.tableHeight = '69vh'
        } else {
          this.tableHeight = '76vh'
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

    // 获取列表
    getList() {
      this.listLoading = true
      EquRpList(this.pagination).then(res => {
        this.tableData = res.Obj
        this.total = res.TotalRowCount
        this.listLoading = false
      })
    },

    // 查看维修详情
    handleDetail(row) {
      this.detailLoading = true
      this.mainFormVisible = true
      const params = {
        TaskNum: row.TaskNum,
        ShowBanned: false,
        PageIndex: 0,
        PageSize: 10000
      }
      EquRpList2(params).then(res => {
        if (res.IsPass === true) {
          this.detailData = res.Obj
          this.total = res.TotalRowCount
        }
        this.detailLoading = false
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
