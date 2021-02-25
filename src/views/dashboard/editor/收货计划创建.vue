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

        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" :enterable="false" content="是否包含禁用状态数据" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">是否包含禁用状态数据</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>

        <el-col :span="4">
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
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">导出</el-button>
      <el-button type="primary" icon="el-icon-takeaway-box" :loading="downloadLoading" @click="handleGoods">打印收货单</el-button>
      <el-button type="primary" icon="el-icon-takeaway-box" :loading="downloadLoading2" @click="handleBarCode">打印条码</el-button>
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

      <el-table-column align="center" label="收货数量" width="150" prop="TotalQty" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TotalQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商" width="150" prop="SupplierName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SupplierName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="收货状态" width="150" prop="RecvPrintStatusText" sortable>
        <template slot-scope="scope">
          {{ scope.row.ReceStatusText }}
        </template></el-table-column>

      <el-table-column align="center" label="收货单打印状态" width="150" prop="RecvPrintStatusText" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.RecvPrintStatusText === '未打印' ? '#FF5757' : '#13ce66' }">{{ scope.row.RecvPrintStatusText }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip v-if="scope.row.Status == true" class="item" effect="dark" :enterable="false" content="禁用" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip v-if="scope.row.Status == false" class="item" effect="dark" :enterable="false" content="启用" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="采购单号" prop="OrderNum"><el-input v-model.trim="ruleForm.OrderNum" placeholder="缺陷编号" clearable /></el-form-item>
        <el-form-item label="物料编号" prop="MaterialNum">
          <el-input v-model.trim="ruleForm.MaterialNum" readonly placeholder="请选择" class="disActive" @focus="materialBox" />
        </el-form-item>
        <el-form-item label="物料名称" prop="MaterialName"><el-input v-model.trim="ruleForm.MaterialName" placeholder="物料名称" disabled /></el-form-item>
        <el-form-item label="收货数量(个)" prop="TotalQty"><el-input v-model.trim="ruleForm.TotalQty" placeholder="收货数量" type="number" clearable /></el-form-item>
        <el-form-item label="所属供应商" prop="SupplierName">
          <el-input v-model.trim="ruleForm.SupplierName" readonly placeholder="请选择" class="disActive" @focus="supBox" />
        </el-form-item>

        <el-form-item label="收货日期" prop="StartDate">
          <el-date-picker v-model="ruleForm.StartDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>

        <el-form-item label="收货凭证"><el-input v-model.trim="ruleForm.RecvCret" placeholder="收货凭证" clearable /></el-form-item>
        <el-form-item label="收货凭证行号"><el-input v-model.trim="ruleForm.RowNum" placeholder="收货凭证行号" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 原料名称对应弹窗 -->
    <material-name
      :material-show="materialFormVisible"
      :material-box-loading="materialBoxLoading"
      :table-box-height="tableBoxHeight"
      :material-data="materialData"
      :pagination-search-material="paginationSearchMaterial"
      :log-total="logTotal"
      @materialClose="materialClose"
      @materialClick="materialClick"
      @handleSearchMaterial="handleSearchMaterial"
      @pageChange="getLogList"
    />

    <!-- 供应商对应弹窗 -->
    <sup-name
      :sup-show="supFormVisible"
      :sup-box-loading="supBoxLoading"
      :table-box-height="tableBoxHeight"
      :sup-data="supData"
      :pagination-search-sup="paginationSearchSup"
      :log-total="logTotal2"
      @supClose="supClose"
      @supClick="supClick"
      @handleSearchSup="handleSearchSup"
      @pageChange="getLogList2"
    />
  </div>
</template>

<script>
import '../../../styles/scrollbar.css'
import '../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { MaterialList, BaseOrgList } from '@/api/BasicData'
import { QuaRecvList, QuaRecvAdd, QuaRecvDelete, QuaRecvModify, QuaRecvModifyStatus, PrintBarCode, PrintReceipt } from '@/api/QualityData'
import MaterialName from '@/components/MaterialName' // 原料名称
import SupName from '@/components/SupName' // 供应商名称
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'ProcessDefect',
  components: { Pagination, MaterialName, SupName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        OrderNum: undefined,
        Name: undefined,
        MaterialNum: undefined,
        ReceStatus: undefined,
        ShowBanned: false
      },
      // 原料搜索条件
      paginationSearchMaterial: {
        PageIndex: 1,
        PageSize: 30,
        MaterialType: 0,
        MaterialNum: undefined,
        MaterialName: undefined,
        ShowBanned: false
      },

      // 供应商搜索条件
      paginationSearchSup: {
        PageIndex: 1,
        PageSize: 30,
        SupplierNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      showSearch: false, // 隐藏搜索条件
      btnShow: true, // 互斥按钮
      addShow: true, // 继续新增
      total: 0,
      logTotal: 0,
      logTotal2: 0,
      dialogFormVisible: false, // 编辑弹出框
      materialData: [], // 原料数组
      materialFormVisible: false, // input原料弹窗
      materialBoxLoading: false, // 原料名称loading
      supData: [], // 供应商数组
      supFormVisible: false, // input供应商弹窗
      supBoxLoading: false, // 供应商名称loading
      dialogType: 'new',
      multipleSelection: [], // 多选
      downloadLoading: false, // 打印条码loading
      downloadLoading2: false, // 打印收货单loading
      filename: '收货单',
      filename2: '条码',
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
      rules: {
        OrderNum: [{ required: true, message: '请输入采购单号', trigger: 'blur' }],
        MaterialNum: [{ required: true, message: '请输入物料编号', trigger: 'blur' }],
        MaterialName: [{ required: true, message: '请输入物料名称', trigger: 'blur' }],
        TotalQty: [{ required: true, message: '请输入收货数量', trigger: 'blur' }],
        Name: [{ required: true, message: '请选择供应商名称', trigger: 'blur' }],
        StartDate: [{ required: true, message: '请选择收货日期', trigger: 'blur' }]
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
    'ruleForm.OrderNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.OrderNum = this.filterInput(val)
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
      })()
    }

    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },
    // 输入框禁止输入中文
    filterInput(val) {
      if (val === '') {
        return val
      } else {
        return val.replace(/[\u4e00-\u9fa5\s]/gi, '')
      }
    },
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        OrderNum: [{ required: true, message: '请输入采购单号', trigger: 'blur' }],
        MaterialNum: [{ required: true, message: '请输入物料编号', trigger: 'blur' }],
        MaterialName: [{ required: true, message: '请输入物料名称', trigger: 'blur' }],
        TotalQty: [{ required: true, message: '请输入收货数量', trigger: 'blur' }],
        Name: [{ required: true, message: '请选择供应商名称', trigger: 'blur' }],
        StartDate: [{ required: true, message: '请选择收货日期', trigger: 'blur' }]
      }
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

    // 禁用，启用权限
    handleBan(row) {
      let status, statusTitle
      if (row.Status === true) {
        status = this.$t('permission.jingyongTitle')
        statusTitle = this.$t('permission.jingyongInfo')
      } else {
        status = this.$t('permission.qiyongTitle')
        statusTitle = this.$t('permission.qiyongInfo')
      }
      this.$confirm(statusTitle, status, {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      }).then(() => {
        const params = {
          Status: (row.Status = row.Status !== true),
          RecvCode: row.RecvCode
        }
        QuaRecvModifyStatus(params).then(res => {
          if (res.IsPass === true) {
            this.$message({
              type: 'success',
              message: res.MSG
            })
          } else {
            this.$message({
              type: 'error',
              message: res.MSG
            })
          }
          this.getList()
        })
      })
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
      QuaRecvList(this.pagination).then(res => {
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
            QuaRecvModify(this.ruleForm).then(res => {
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
            QuaRecvAdd(this.ruleForm).then(res => {
              debugger
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
          const params = this.ruleForm
          QuaRecvAdd(params).then(res => {
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

    // 删除角色
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          QuaRecvDelete({ RecvCode: row.RecvCode }).then(res => {
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

    // 原料聚焦事件原料弹窗
    materialBox() {
      this.materialFormVisible = true
      this.materialBoxLoading = true
      MaterialList(this.paginationSearchMaterial).then(res => {
        if (res.IsPass === true) {
          this.materialData = res.Obj
          this.logTotal = res.TotalRowCount
          this.materialBoxLoading = false
        }
      })
    },
    // 原料弹窗搜索
    handleSearchMaterial() {
      this.paginationSearchMaterial.PageIndex = 1
      this.materialBox()
    },
    // 增加原料名称双击事件获取当前行的值
    materialClick(row) {
      this.$set(this.ruleForm, 'MaterialNum', row.MaterialNum)
      this.$set(this.ruleForm, 'MaterialName', row.Name)
      this.$set(this.ruleForm, 'TypeName', row.TypeName)
      this.ruleForm.MaterialCode = row.MaterialCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.materialFormVisible = false
    },
    // 原料弹窗分页
    getLogList(val) {
      this.paginationSearchMaterial.PageIndex = val.current
      this.paginationSearchMaterial.PageSize = val.size
      this.materialBox()
    },

    // 关闭原料名称查询弹窗
    materialClose() {
      this.materialFormVisible = false
    },

    // 供应商聚焦事件弹窗
    supBox() {
      this.supFormVisible = true
      this.supBoxLoading = true
      BaseOrgList(this.paginationSearchSup).then(res => {
        if (res.IsPass === true) {
          this.supData = res.Obj
          this.logTotal2 = res.TotalRowCount
          this.supBoxLoading = false
        }
      })
    },
    // 供应商弹窗搜索
    handleSearchSup() {
      this.paginationSearchSup.PageIndex = 1
      this.supBox()
    },
    // 增加供应商名称双击事件获取当前行的值
    supClick(row) {
      this.$set(this.ruleForm, 'SupplierName', row.Name)
      this.ruleForm.SupplierCode = row.SupplierCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.supFormVisible = false
    },
    // 供应商弹窗分页
    getLogList2(val) {
      this.paginationSearchSup.PageIndex = val.current
      this.paginationSearchSup.PageSize = val.size
      this.supBox()
    },

    // 关闭供应商名称查询弹窗
    supClose() {
      this.supFormVisible = false
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 打印收货单
    handleGoods() {
      if (this.multipleSelection.length) {
        const RecvCodeList = []
        this.multipleSelection.map(res => {
          RecvCodeList.push(res.RecvCode)
        })
        PrintReceipt({ RecvCodeArr: RecvCodeList }).then(res => {
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

    // 打印条码
    handleBarCode() {
      if (this.multipleSelection.length) {
        const RecvCodeList2 = []
        this.multipleSelection.map(res => {
          RecvCodeList2.push(res.RecvCode)
        })
        PrintBarCode({ RecvCodeArr: RecvCodeList2 }).then(res => {
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

    // 封装打印收货单
    BarCode() {
      this.downloadLoading2 = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['采购订单', '收货日期', '收货凭证', '收货凭证行号', '物料编码', '物料名称', '收货数量', '供应商', '打印状态', '状态']
        const filterVal = ['OrderNum', 'StartDate', 'RecvCret', 'RowNum', 'MaterialNum', 'MaterialName', 'TotalQty', 'SupplierName', 'RecvPrintStatusText', 'StatusText']
        const list = this.multipleSelection
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename
        })
        this.$refs.multipleTable.clearSelection()
        this.downloadLoading2 = false
      })
    },

    // 封装打印条码
    BarCode2() {
      this.downloadLoading2 = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['采购订单', '收货日期', '收货凭证', '收货凭证行号', '物料编码', '物料名称', '收货数量', '供应商', '打印状态', '状态']
        const filterVal = ['OrderNum', 'StartDate', 'RecvCret', 'RowNum', 'MaterialNum', 'MaterialName', 'TotalQty', 'SupplierName', 'RecvPrintStatusText', 'StatusText']
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

::v-deep .el-checkbox   .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:  #17da17;
  border:1px solid #17da17 ;
}

::v-deep .el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: #17da17;
  border:1px solid #17da17 ;
}
</style>
