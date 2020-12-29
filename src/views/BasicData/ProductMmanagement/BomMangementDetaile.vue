<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="原料编号" placement="top-start"><label class="radio-label">原料编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialNum" placeholder="原料编号" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="原料名称" placement="top-start"><label class="radio-label">原料名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialName" placeholder="原料名称" clearable /></el-col>
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
      <span style="margin: 0 10px; font-size: 13px">所属上级:</span>
      <el-tag type="danger" size="medium">成品编号:{{ this.$route.query.ProductNum }}</el-tag>
      <el-tag type="warning" size="medium">成品名称:{{ this.$route.query.ProductName }}</el-tag>
      <el-tag type="success" size="medium">BOM版本:{{ this.$route.query.Version }}</el-tag>
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

      <el-table-column align="center" label="工序编号" width="150" prop="WorkingProcedureNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WorkingProcedureNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工序名称" width="150" prop="WorkingProcedureName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WorkingProcedureName }}
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

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />
    <!-- 编辑弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="工序" prop="WorkingProcedureName">
          <el-input v-model="ruleForm.WorkingProcedureName" disabled placeholder="请选择" class="disActive" @click.native="workingBox" />
        </el-form-item>

        <el-form-item label="原料名称" prop="MaterialName">
          <!-- <el-input v-model="ruleForm.MaterialName" placeholder="请输入并选择原料名称" clearable @input="materialBox(1)" /> -->
          <el-input v-model="ruleForm.MaterialName" disabled placeholder="请选择" class="disActive" @click.native="materialBox(1)" />
        </el-form-item>

        <el-form-item label="原料用量" prop="Usage"><el-input-number v-model.trim="ruleForm.Usage" placeholder="原料用量" :min="0" clearable style="width: 100%" /></el-form-item>
        <el-form-item label="替代物料">
          <!-- <el-input v-model="ruleForm.SubMaterialName" placeholder="请输入并选择替代物料" clearable @input="materialBox(2)" /> -->
          <el-input v-model="ruleForm.SubMaterialName" disabled placeholder="请选择" class="disActive" @click.native="materialBox(2)" />
        </el-form-item>
        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 工序对应弹窗 -->
    <working-name
      :working-show="workingFormVisible"
      :working-box-loading="workingBoxLoading"
      :table-box-height="tableBoxHeight"
      :working-data="workingData"
      :pagination-search-working="paginationSearchWorking"
      @workingClose="workingClose"
      @workingClick="workingClick"
      @handleSearchWorking="handleSearchWorking"
    />

    <!-- 原料名称对应弹窗 -->
    <material-name
      :material-show="materialFormVisible"
      :material-box-loading="materialBoxLoading"
      :table-box-height="tableBoxHeight"
      :material-data="materialData"
      :pagination-search-material="paginationSearchMaterial"
      @materialClose="materialClose"
      @materialClick="materialClick"
      @handleSearchMaterial="handleSearchMaterial"
    />
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import { bomDetailList, bomDetailDelete, bomDetailAdd, bomDetailModify, MaterialList, GetByRouteList } from '@/api/BasicData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WorkingName from '@/components/WorkingName' // 工序名称
import MaterialName from '@/components/MaterialName' // 物料名称
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'BomMangementDetaile',
  components: { Pagination, WorkingName, MaterialName },
  data() {
    return {
      materialActiveIndex: 1,
      tableData: [],
      ruleForm: {
        WorkingProcedureName: '',
        MaterialName: '',
        SubMaterialName: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        BomCode: this.$route.query.BomCode,
        ProductCode: this.$route.query.ProductCode,
        ProcessRouteCode: this.$route.query.ProcessRouteCode,
        MaterialNum: undefined,
        MaterialName: undefined
      },
      // 原料搜索条件
      paginationSearchMaterial: {
        PageIndex: 1,
        PageSize: 100,
        MaterialType: 0,
        MaterialNum: undefined,
        MaterialName: undefined,
        ShowBanned: false
      },

      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 100,
        ProcessRouteCode: this.$route.query.ProcessRouteCode,
        RouteCode: this.$route.query.ProcessRouteCode,
        Status: true,
        ProcessNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      ProductNum: this.$route.query.ProductNum,
      ProductName: this.$route.query.ProductName,
      Version: this.$route.query.Version,
      listLoading: false,
      materialBoxLoading: false, // 原料名称loading
      workingBoxLoading: false, // 工序搜索loading
      materialFormVisible: false, // input原料称弹窗
      workingFormVisible: false, // input工序名称弹窗
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      materialData: [], // 原料数组
      workingData: [], // 工序数组
      rules: {
        WorkingProcedureName: [{ required: true, message: '请选择工序', trigger: 'blur' }],
        MaterialName: [{ required: true, message: '请选择原料名称', trigger: 'blur' }],
        Usage: [{ required: true, message: '请输入用量', trigger: 'blur' }]
      }
      // content1: this.$t('permission.userName'),
      // content2: this.$t('permission.fullName'),
      // content3: this.$t('permission.containInfo'),
      // content4: this.$t('permission.company'),
      // content5: this.$t('permission.department'),
      // content6: this.$t('permission.password'),
      // content7: this.$t('permission.passwords'),
      // content8: this.$t('permission.roleUser'),
      // content9: this.$t('permission.description')
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
      // this.content1 = this.$t('permission.userName')
      // this.content2 = this.$t('permission.fullName')
      // this.content3 = this.$t('permission.containInfo')
      // this.content4 = this.$t('permission.company')
      // this.content5 = this.$t('permission.department')
      // this.content6 = this.$t('permission.password')
      // this.content7 = this.$t('permission.passwords')
      // this.content8 = this.$t('permission.roleUser')
      // this.content9 = this.$t('permission.description')
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
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        WorkingProcedureName: [{ required: true, message: '请选择工序', trigger: 'blur' }],
        MaterialName: [{ required: true, message: '请选择原料名称', trigger: 'blur' }],
        Usage: [{ required: true, message: '请输入用量', trigger: 'blur' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      bomDetailList(this.pagination).then(res => {
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
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },
    // 删除
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          bomDetailDelete({ BomDetailID: row.BomDetailID }).then(res => {
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

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            const params = this.ruleForm
            params.BomCode = this.$route.query.BomCode
            params.ProcessRouteCode = this.$route.query.ProcessRouteCode
            bomDetailModify(params).then(res => {
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
            const params = this.ruleForm
            params.BomCode = this.$route.query.BomCode
            params.ProcessRouteCode = this.$route.query.ProcessRouteCode
            bomDetailAdd(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
            this.editLoading = false
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

    // 原料聚焦事件原料弹窗
    materialBox(index) {
      this.materialActiveIndex = index
      this.materialFormVisible = true
      this.materialBoxLoading = true
      MaterialList(this.paginationSearchMaterial).then(res => {
        if (res.IsPass === true) {
          this.materialData = res.Obj
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
      if (this.materialActiveIndex === 1) {
        // this.ruleForm.MaterialName = row.Name
        this.$set(this.ruleForm, 'MaterialName', row.Name)
        this.ruleForm.materialCode = row.MaterialCode
      } else {
        // this.ruleForm.SubMaterialName = row.Name
        this.$set(this.ruleForm, 'SubMaterialName', row.Name)
        this.ruleForm.SubMaterialCode = row.MaterialCode
      }
      this.materialFormVisible = false
    },
    // 关闭成品名称查询弹窗
    materialClose() {
      this.materialFormVisible = false
    },

    // 替换物料
    replaceBox() {
      this.materialFormVisible = true
      this.materialBoxLoading = true
      MaterialList(this.paginationSearchMaterial).then(res => {
        if (res.IsPass === true) {
          this.materialData = res.Obj
          this.materialBoxLoading = false
        }
      })
    },

    // 工序聚焦事件原料弹窗
    workingBox() {
      this.workingFormVisible = true
      this.workingBoxLoading = true
      GetByRouteList(this.paginationSearchWorking).then(res => {
        if (res.IsPass === true) {
          this.workingData = res.Obj
          this.workingBoxLoading = false
        }
      })
    },
    // 工序弹窗搜索
    handleSearchWorking() {
      this.paginationSearchMaterial.PageIndex = 1
      this.workingBox()
    },
    // 增加工序名称双击事件获取当前行的值
    workingClick(row) {
      // this.ruleForm.WorkingProcedureName = row.Name
      this.$set(this.ruleForm, 'WorkingProcedureName', row.Name)
      this.ruleForm.WorkingProcedureCode = row.ProcessCode
      this.workingFormVisible = false
    },
    // 关闭工序名称查询弹窗
    workingClose() {
      this.workingFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .rightBtn {
    .el-tag {
      margin-right: 10px;
    }
  }
}
</style>
