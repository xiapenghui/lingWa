<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="库区编号" placement="top-start"><label class="radio-label">库区编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.RegionNum" placeholder="库区编号" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="库区名称" placement="top-start"><label class="radio-label">库区名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.RegionName" placeholder="库区名称" clearable /></el-col>
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
      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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

      <el-table-column align="center" label="描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
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

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.EditCompany') : $t('permission.addCompany')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="库区编号" prop="RegionNum"><el-input v-model.trim="ruleForm.RegionNum" placeholder="仓库编号" clearable /></el-form-item>
        <el-form-item label="库区名称" prop="RegionName"><el-input v-model.trim="ruleForm.RegionName" placeholder="仓库名称" clearable /></el-form-item>

        <el-form-item label="仓库编号" prop="WarehouseNum">
          <el-input v-model.trim="ruleForm.WarehouseNum" readonly placeholder="请选择" class="disActive" @focus="WarehouseBox" />
        </el-form-item>

        <el-form-item label="仓库名称" prop="WarehouseName"><el-input v-model.trim="ruleForm.WarehouseName" placeholder="仓库名称" disabled /></el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" clearable /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 封装仓库编号 -->
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

  </div>
</template>

<script>
import '../../../styles/scrollbar.css'
import '../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WarehouseName from '@/components/WarehouseName' // 成品名称弹窗
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { StoWareList, WareHouseList, WareHouseAdd, WareHouseDelete, WareHouseModify } from '@/api/WarehouseData'
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'CompanyMaintenance',
  components: { Pagination, WarehouseName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        RegionNum: undefined,
        RegionName: undefined
      },
      // 仓库编号搜索条件
      paginationSearchWare: {
        PageIndex: 1,
        PageSize: 100,
        WarehouseNum: undefined,
        WarehouseName: undefined
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogType: 'new',
      wareData: [], // 仓库编号数组
      wareBoxLoading: false, // 仓库编号loading
      wareFormVisible: false, // 仓库编号弹窗
      addShow: true, // 继续新增
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      rules: {
        RegionNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        RegionName: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        WarehouseNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }]
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
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        RegionNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        RegionName: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        WarehouseNum: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }]
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
      WareHouseList(this.pagination).then(res => {
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
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.addShow = false
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            WareHouseModify(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.editLoading = false
            })
          } else {
            WareHouseAdd(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.dialogFormVisible = false
                this.getList()
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
          WareHouseAdd(this.ruleForm).then(res => {
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
        }
      })
      this.handleAdd()
    },

    // 删除
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          WareHouseDelete({ RegionCode: row.RegionCode }).then(res => {
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
          this.getList()
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
