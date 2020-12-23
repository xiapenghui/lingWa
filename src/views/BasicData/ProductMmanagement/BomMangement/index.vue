<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductNum" placeholder="成品编号" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品名称" placement="top-start"><label class="radio-label">成品名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductName" placeholder="成品名称" clearable /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" :enterable="false" content="包含禁状态BOM" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">包含禁状态BOM</el-checkbox>
            </el-tooltip>
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
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addMaterial') }}</el-button>
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

      <el-table-column align="center" label="成品编码" width="200" prop="ProductNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成品名称" width="200" prop="ProductName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="BOM版本" width="150" prop="Version" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
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

      <el-table-column align="center" label="维护者" width="150" prop="CreateUser" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CreateUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生效时间" width="150" prop="EffectiveDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EffectiveDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="CreateTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CreateTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="明细" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-tickets" plain @click="handleLook(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="复制" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-star-on" plain @click="handleCopy(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="禁用" placement="top-start">
            <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="启用" placement="top-start">
            <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
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
        <el-form-item label="成品编号" prop="ProductNum"><el-input v-model.trim="ruleForm.ProductNum" placeholder="请输入并选择" clearable @input="finshBox" /></el-form-item>
        <el-form-item label="成品名称"><el-input v-model.trim="ruleForm.ProductName" placeholder="成品名称" :disabled="true" /></el-form-item>
        <el-form-item label="BOM版本" prop="Version"><el-input v-model.trim="ruleForm.Version" placeholder="BOM版本" clearable /></el-form-item>

        <el-form-item label="工艺路线" prop="ProcessRouteName"><el-input v-model="ruleForm.ProcessRouteName" placeholder="请输入并选择" clearable @input="lineBox" /></el-form-item>

        <el-form-item label="生效时间" prop="EffectiveDate">
          <el-date-picker
            v-model="ruleForm.EffectiveDate"
            :picker-options="expireTimeOption"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            clearable
          />
        </el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" clearable /></el-form-item>
        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 成品名称对应弹窗 -->
    <finsh-name
      :fish-show="finshFormVisible"
      :list-box-loading="listBoxLoading"
      :table-box-height="tableBoxHeight"
      :finsh-data="finshData"
      :pagination-search="paginationSearch"
      @fishClose="fishClose"
      @fishClick="fishClick"
      @handleSearchBox="handleSearchBox"
    />

    <!-- 新增加页面工艺路线聚焦弹窗 -->
    <line-name
      :line-show="lineFormVisible"
      :line-loading="lineLoading"
      :table-box-height="tableBoxHeight"
      :line-data="lineData"
      :pagination-search-line="paginationSearchLine"
      @lineClick="lineClick"
      @lineClose="lineClose"
      @lineBox="lineBox"
    />
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import { bomList, bomDelete, bomAdd, bomModify, bomModifyStatus, GetMaterialList, baseRouteList, bomCopy } from '@/api/BasicData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import FinshName from '@/components/FinshName' // 成品名称
import LineName from '@/components/LineName' // 工艺路线名称
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'BomMangement',
  components: { Pagination, FinshName, LineName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ProductNum: undefined,
        ProductName: undefined,
        ShowBanned: false
      },
      // 搜索条件
      paginationSearch: {
        PageIndex: 1,
        PageSize: 100,
        MaterialType: 1,
        MaterialNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      paginationSearchLine: {
        PageIndex: 1,
        PageSize: 100,
        Name: undefined,
        ShowBanned: false
      },
      listLoading: false,
      listBoxLoading: false, // 产品名称loading
      lineLoading: false, // 新增工艺路线搜索loading
      lineFormVisible: false, // 新增工艺路线弹窗
      finshFormVisible: false, // input产品名称弹窗
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      lineData: [], // 工艺路线数组
      finshData: [], // 成品编号
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 8.64e7
        }
      },
      // finshCode: null, // 成品名称code值
      // lineCode: null, // 工艺路线的code值
      rules: {
        ProductNum: [{ required: true, message: '请输入成品编码', trigger: 'blur' }],
        Version: [{ required: true, message: '请输入BOM版本', trigger: 'blur' }],
        ProcessRouteName: [{ required: true, message: '请选择工艺路线', trigger: 'change' }],
        EffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'blur' }]
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
        ProductNum: [{ required: true, message: '请输入成品编码', trigger: 'blur' }],
        Version: [{ required: true, message: '请输入BOM版本', trigger: 'blur' }],
        ProcessRouteName: [{ required: true, message: '请选择工艺路线', trigger: 'change' }],
        EffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'blur' }]
      }
    },
    // 禁用，启用权限
    handleBan(row) {
      debugger
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
          BomCode: row.BomCode
        }
        bomModifyStatus(params).then(res => {
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

    // 查看BOM明细
    handleLook(row) {
      this.$router.push({
        path: '/BasicData/ProductMmanagement/BomMangementDetaile',
        query: {
          BomCode: row.BomCode,
          ProcessRouteCode: row.ProcessRouteCode,
          ProductCode: row.ProductCode
        }
      })
    },
    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      bomList(this.pagination).then(res => {
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

    // 增加BOM
    handleAdd() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {}
    },
    // 编辑BOM
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除BOM
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          bomDelete({ BomCode: row.BomCode }).then(res => {
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

    // 复制BOM
    handleCopy(row) {
      this.$confirm('您确定要复制此条数据么？', '复制', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          bomCopy({ BomCode: row.BomCode }).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: res.MSG
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
            message: '已取消'
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
            // params.ProductCode = this.finshCode
            // params.ProcessRouteCode = this.lineCode
            bomModify(params).then(res => {
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
            // params.ProductCode = this.finshCode
            // params.ProcessRouteCode = this.lineCode
            bomAdd(params).then(res => {
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

    // 聚焦事件产成品弹窗
    finshBox() {
      this.finshFormVisible = true
      this.listBoxLoading = true
      GetMaterialList(this.paginationSearch).then(res => {
        if (res.IsPass === true) {
          this.finshData = res.Obj
          this.listBoxLoading = false
        }
      })
    },
    // 产成品弹窗搜索
    handleSearchBox() {
      this.paginationSearch.PageIndex = 1
      this.finshBox()
    },
    // 增加成品名称双击事件获取当前行的值
    fishClick(row) {
      this.ruleForm.ProductNum = row.MaterialNum
      this.ruleForm.ProductName = row.Name
      this.ruleForm.ProductCode = row.MaterialCode
      this.finshFormVisible = false
    },
    // 关闭成品名称查询弹窗
    fishClose() {
      this.finshFormVisible = false
    },

    // 聚焦事件工艺路线弹窗
    lineBox() {
      this.lineFormVisible = true
      this.lineLoading = true
      baseRouteList(this.paginationSearchLine).then(res => {
        if (res.IsPass === true) {
          this.lineData = res.Obj
          this.lineLoading = false
        }
      })
    },
    // 工艺路线弹窗搜索
    LineBox() {
      this.paginationSearchLine.PageIndex = 1
      this.lineBox()
    },
    // 增加工艺路线双击事件获取当前行的值
    lineClick(row) {
      this.ruleForm.ProcessRouteName = row.Name
      this.ruleForm.ProcessRouteCode = row.ProcessRouteCode
      this.lineFormVisible = false
    },
    // 关闭工艺路线查询弹窗
    lineClose() {
      this.lineFormVisible = false
    }
  }
}
</script>
