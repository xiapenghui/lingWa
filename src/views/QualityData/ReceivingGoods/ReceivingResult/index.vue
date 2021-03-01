<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="采购订单号" placement="top-start"><label class="radio-label">采购订单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.OrderNum" placeholder="采购订单号" clearable /></el-col>
        </el-col>

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
            <el-tooltip class="item" effect="dark" :enterable="false" content="收货状态" placement="top-start"><label class="radio-label">收货状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.RecvStatus" laceholder="收货状态" clearable clearable style="width: 100%">
              <el-option v-for="item in ReceivingData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="2">
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
      </el-row>
    </div>

    <div class="rightBtn"><el-button type="primary" icon="el-icon-upload2">导出</el-button></div>

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
      <el-table-column type="expand" label="查看详情" width="100">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="收货凭证:">
              <span>{{ props.row.Barcode }}</span>
            </el-form-item>
            <el-form-item label="物料编码:">
              <span>{{ props.row.MaterialNum }}</span>
            </el-form-item>
            <el-form-item label="待收货数量:">
              <span>{{ props.row.TotalQty }}</span>
            </el-form-item>
            <el-form-item label="已收货数量:">
              <span>{{ props.row.RecvQty }}</span>
            </el-form-item>
            <el-form-item label="收货条码:">
              <span>{{ props.row.Barcode }}</span>
            </el-form-item>
            <el-form-item label="物料描述:">
              <span>{{ props.row.Description }}</span>
            </el-form-item>
            <el-form-item label="扫描时间:">
              <span>{{ props.row.ScanTime | substringTime }}</span>
            </el-form-item>
            <el-form-item label="收货人:">
              <span>{{ props.row.RecvUserName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="采购单号" width="150" prop="OrderNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货日期" width="150" prop="StartDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货凭证" width="150" prop="RecvCret" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RecvCret }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货凭证行号" width="150" prop="RowNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RowNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料编码" width="150" prop="MaterialNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料名称" width="150" prop="MaterialName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料属性" width="150" prop="MaterialAttributeText" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialAttributeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商" min-width="200" prop="SupplierName" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SupplierName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="待收货数量" width="150" prop="TotalQty" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TotalQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="已收货数量" width="150" prop="RecvQty" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RecvQty }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { GetDictionary } from '@/api/BasicData'
import { ListCommonSearch } from '@/api/QualityData'
const fixHeight = 260
export default {
  name: 'MaterialInformation',
  components: { Pagination },
  data() {
    return {
      tableData: [], // 主列表
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        OrderNum: undefined,
        RecvCret: undefined,
        MaterialNum: undefined
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      CreateTime: null,
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      ReceivingData: [], // 收货状态
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

    // 收货状态下拉
    GetDictionary({ code: '0038' }).then(res => {
      if (res.IsPass === true) {
        this.ReceivingData = res.Obj
      }
    })

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

.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 35%;
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
