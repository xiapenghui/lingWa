<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="库位编号" placement="top-start"><label class="radio-label">库位编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.LocationNum" placeholder="库位编号" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="库位名称" placement="top-start"><label class="radio-label">库位名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.LocationName" placeholder="库位名称" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">导出</el-button>
      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importcompany') }}</el-button> -->
      <!-- <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" /> -->
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

      <el-table-column align="center" label="仓库编号" width="150" prop="WarehouseNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="仓库名称" width="150" prop="WarehouseName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库位编号" width="150" prop="LocationNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LocationNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库位名称" width="150" prop="LocationName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LocationName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库区编号" width="150" prop="RegionNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库区名称" width="150" prop="RegionName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品" width="150" prop="RegionName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库存容量" width="150" prop="RegionName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="优先级" width="150" prop="RegionName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="150" prop="RegionName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUser" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.EditCompany') : $t('permission.addCompany')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="仓库编号" prop="WarehouseNum">
          <el-input v-model.trim="ruleForm.WarehouseNum" readonly placeholder="请选择" class="disActive" @focus="WarehouseBox" />
        </el-form-item>

        <el-form-item label="仓库名称" prop="WarehouseName"><el-input v-model.trim="ruleForm.WarehouseName" placeholder="仓库名称" disabled /></el-form-item>

        <el-form-item label="库区编号" prop="RegionNum">
          <el-input v-model.trim="ruleForm.RegionNum" readonly placeholder="请选择" class="disActive" @focus="LocationBox" />
        </el-form-item>

        <el-form-item label="库区名称" prop="RegionName"><el-input v-model.trim="ruleForm.RegionName" placeholder="库区名称" disabled /></el-form-item>

        <el-form-item label="库位编号" prop="LocationNum">
          <el-input v-model.trim="ruleForm.LocationNum" placeholder="库位编号" @focus="LocationBox" />
        </el-form-item>

        <el-form-item label="库位名称" prop="LocationName">
          <el-input v-model.trim="ruleForm.LocationName" placeholder="库位名称" disabled />
        </el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" clearable /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 封装仓库信息编号 -->
    <WarehouseName
      :ware-show="wareFormVisible"
      :ware-box-loading="wareBoxLoading"
      :table-box-height="tableBoxHeight"
      :ware-data="wareData"
      :pagination-search="paginationSearchWare"
      @wareClose="wareClose"
      @wareClick="wareClick"
      @handleSearchWare="handleSearchWare"
    />

    <!-- 封装库区信息编号 -->
    <LocationName
      :location-show="locationFormVisible"
      :location-box-loading="locationBoxLoading"
      :table-box-height="tableBoxHeight"
      :location-data="locationData"
      :pagination-search="paginationSearchLocation"
      @locationClose="locationClose"
      @locationClick="locationClick"
      @handleSearchLocation="handleSearchLocation"
    />

    <!-- 封装库位信息编号 -->
    <SeatName
      :seat-show="seatFormVisible"
      :seat-box-loading="seatBoxLoading"
      :table-box-height="tableBoxHeight"
      :seat-data="seatData"
      :pagination-search="paginationSearchSeat"
      @seatClose="seatClose"
      @seatClick="seatClick"
      @handleSearchSeat="handleSearchSeat"
    />
  </div>

</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WarehouseName from '@/components/WarehouseName' // 仓库名称弹窗
import LocationName from '@/components/LocationName' // 库区名称弹窗
import SeatName from '@/components/SeatName' // 库位名称弹窗
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { StoWareList, WareHouseList, WareHouseBaseList, WareHouseBaseAdd, WareHouseBaseDelete, WareHouseBaseModify } from '@/api/WarehouseData'
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'CompanyMaintenance',
  components: { Pagination, WarehouseName, LocationName, SeatName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        LocationNum: undefined,
        LocationName: undefined
      },
      // 仓库编号搜索条件
      paginationSearchWare: {
        PageIndex: 1,
        PageSize: 10000,
        WarehouseNum: undefined,
        WarehouseName: undefined
      },

      // 库区信息搜索条件
      paginationSearchLocation: {
        PageIndex: 1,
        PageSize: 10000,
        RegionNum: undefined,
        RegionName: undefined
      },
      // 库位信息搜索条件
      paginationSearchSeat: {
        PageIndex: 1,
        PageSize: 10000,
        LocationNum: undefined,
        LocationName: undefined
      },

      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogType: 'new',
      wareData: [], // 仓库编号数组
      locationData: [], // 库区数组
      seatData: [], // 库位数组
      wareBoxLoading: false, // 仓库编号loading
      wareFormVisible: false, // 仓库编号弹窗
      locationBoxLoading: false, // 库区编号loading
      locationFormVisible: false, // 库区编号弹窗
      seatBoxLoading: false, // 库位信息loading
      seatFormVisible: false, // 库位信息弹窗
      addShow: true, // 继续新增
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      rules: {
        WarehouseNum: [{ required: true, message: '请输入库区编号', trigger: 'blur' }],
        WarehouseName: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        RegionNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        RegionName: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        LocationNum: [{ required: true, message: '请输入库位编号', trigger: 'blur' }],
        LocationName: [{ required: true, message: '请输入库位名称', trigger: 'blur' }]
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
      this.setFormRules()
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
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        WarehouseNum: [{ required: true, message: '请输入库区编号', trigger: 'blur' }],
        WarehouseName: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        RegionNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        RegionName: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        LocationNum: [{ required: true, message: '请输入库位编号', trigger: 'blur' }],
        LocationName: [{ required: true, message: '请输入库位名称', trigger: 'blur' }]
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
      WareHouseBaseList(this.pagination).then(res => {
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

    // 增加
    handleAdd() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.addShow = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.addShow = false
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
          if (this.dialogType === 'edit') {
            WareHouseBaseModify(this.ruleForm).then(res => {
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
            WareHouseBaseAdd(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
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
          }
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

    // 继续新增
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          WareHouseBaseAdd(this.ruleForm).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: this.$t('table.addSuc')
              })
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: res.MSG
              })
            }
            this.editLoading = false
          })
          this.handleAdd()
        }
      })
    },

    // 删除
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          WareHouseBaseDelete({ RegionCode: row.RegionCode }).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: this.$t('table.deleteSuccess')
              })
              this.getList()
            } else {
              this.$message({
                type: 'error',
                message: res.MSG
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('table.deleteError')
          })
        })
    },

    // 仓库编号聚焦弹窗
    WarehouseBox() {
      this.wareFormVisible = true
      this.wareBoxLoading = true
      StoWareList(this.paginationSearchWare).then(res => {
        if (res.IsPass === true) {
          this.wareData = res.Obj
          this.wareBoxLoading = false
        }
      })
    },
    // 仓库编号弹窗搜索
    handleSearchWare() {
      this.paginationSearchWare.PageIndex = 1
      this.WarehouseBox()
    },
    // 增加仓库编号双击事件获取当前行的值
    wareClick(row) {
      debugger
      this.$set(this.ruleForm, 'WarehouseNum', row.WarehouseNum)
      // this.ruleForm.ProcessNum = row.ProcessNum
      this.ruleForm.WarehouseName = row.WarehouseName
      this.ruleForm.WarehouseCode = row.WarehouseCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.wareFormVisible = false
    },
    // 关闭仓库编号查询弹窗
    wareClose() {
      this.wareFormVisible = false
    },

    // 库区信息聚焦弹窗
    LocationBox() {
      this.locationFormVisible = true
      this.locationLoading = true
      WareHouseList(this.paginationSearchWare).then(res => {
        if (res.IsPass === true) {
          this.locationData = res.Obj
          this.locationBoxLoading = false
        }
      })
    },
    // 库区信息弹窗搜索
    handleSearchLocation() {
      this.paginationSearchWare.PageIndex = 1
      this.LocationBox()
    },
    // 增加库区信息双击事件获取当前行的值
    locationClick(row) {
      this.$set(this.ruleForm, 'RegionNum', row.RegionNum)
      // this.ruleForm.ProcessNum = row.ProcessNum
      this.ruleForm.RegionName = row.RegionName
      this.ruleForm.RegionCode = row.RegionCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.locationFormVisible = false
    },
    // 关闭 库区信息查询弹窗
    locationClose() {
      this.locationFormVisible = false
    },

    // 库位信息聚焦弹窗
    SeatBox() {
      this.seatFormVisible = true
      this.SeatLoading = true
      WareHouseBaseList(this.paginationSearchSeat).then(res => {
        if (res.IsPass === true) {
          this.seatData = res.Obj
          this.seatBoxLoading = false
        }
      })
    },
    // 库位信息弹窗搜索
    handleSearchSeat() {
      this.paginationSearchSeat.PageIndex = 1
      this.SeatBox()
    },
    // 增加库位信息双击事件获取当前行的值
    seatClick(row) {
      this.$set(this.ruleForm, 'LocationNum', row.LocationNum)
      // this.ruleForm.ProcessNum = row.ProcessNum
      this.ruleForm.LocationName = row.LocationName
      this.ruleForm.LocationCode = row.LocationCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.seatFormVisible = false
    },
    // 关闭 库位信息查询弹窗
    seatClose() {
      this.seatFormVisible = false
    }

  }
}
</script>

<style lang="scss" scoped></style>
