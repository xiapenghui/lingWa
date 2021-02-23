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
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="成品编号" width="150" prop="ProductNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品名称" width="150" prop="ProductName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>

      <!--   <el-table-column align="center" label="工艺路线名称" width="150" prop="ProcessRouteName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessRouteName }}
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="BOM版本" width="150" prop="Version" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="BOM类型" width="150" prop="BomTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.BomTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
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

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUser" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
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

    <!-- 编辑弹窗 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="成品编号" prop="ProductNum">
          <el-input v-model.trim="ruleForm.ProductNum" readonly placeholder="请选择" class="disActive" @focus="finshBox" />
        </el-form-item>

        <el-form-item label="成品名称"><el-input v-model.trim="ruleForm.ProductName" placeholder="成品名称" :disabled="true" /></el-form-item>
        <el-form-item label="BOM版本" prop="Version"><el-input v-model.trim="ruleForm.Version" placeholder="BOM版本" clearable /></el-form-item>

        <el-form-item label="BOM类型" prop="BomType">
          <el-select v-model="ruleForm.BomType" placeholder="BOM类型" style="width: 100%" clearable>
            <el-option v-for="item in BomData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <!--  <el-form-item label="工艺路线" prop="ProcessRouteName">
          <el-input v-model="ruleForm.ProcessRouteName" readonly placeholder="请选择" class="disActive" @focus="lineBox" />
        </el-form-item> -->

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
      :log-total="logTotal"
      @fishClose="fishClose"
      @fishClick="fishClick"
      @handleSearchBox="handleSearchBox"
      @pageChange="getLogList"
    />

  </div></template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import { bomList, bomDelete, bomAdd, bomModify, bomModifyStatus, GetMaterialList, bomCopy, GetDictionary } from '@/api/BasicData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import FinshName from '@/components/FinshName' // 成品名称

import Bus from '@/api/bus.js'
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'BomMangement',
  components: { Pagination, FinshName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        finshBox: '',
        ProcessRouteName: ''
      },
      // 编辑弹窗
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
        PageSize: 30,
        MaterialType: 1,
        MaterialNum: undefined,
        Name: undefined,
        ShowBanned: false
      },

      listLoading: false,
      listBoxLoading: false, // 产品名称loading
      finshFormVisible: false, // input产品名称弹窗
      editLoading: false, // 编辑loading
      total: 0,
      logTotal: 0,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      finshData: [], // 成品编号
      BomData: [], // 新增Bom下拉类型
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 8.64e7
        }
      },
      // finshCode: null, // 成品名称code值
      // lineCode: null, // 工艺路线的code值
      rules: {
        ProductNum: [{ required: true, message: '请输入成品编号', trigger: 'blur' }],
        Version: [{ required: true, message: '请输入BOM版本', trigger: 'blur' }],
        BomType: [{ required: true, message: '请选择入BOM类型', trigger: 'change' }],
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

    // 新增Bom类型下拉
    GetDictionary({ code: '0030' }).then(res => {
      if (res.IsPass === true) {
        this.BomData = res.Obj
      }
    })

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
        ProductNum: [{ required: true, message: '请输入成品编号', trigger: 'blur' }],
        Version: [{ required: true, message: '请输入BOM版本', trigger: 'blur' }],
        BomType: [{ required: true, message: '请选择入BOM类型', trigger: 'change' }],
        ProcessRouteName: [{ required: true, message: '请选择工艺路线', trigger: 'change' }],
        EffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'blur' }]
      }
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
        // name: 'BomMangementDetaile',
        query: {
          BomCode: row.BomCode,
          ProcessCode: row.ProcessCode,
          ProductCode: row.ProductCode,
          ProductNum: row.ProductNum,
          ProductName: row.ProductName,
          ProcessRouteName: row.ProcessRouteName,
          Version: row.Version
        }
      })
      Bus.$emit('getList')
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
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑BOM
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
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
            bomModify(params).then(res => {
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
            const params = this.ruleForm
            bomAdd(params).then(res => {
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

    // 聚焦事件产成品弹窗
    finshBox() {
      this.finshFormVisible = true
      this.listBoxLoading = true
      GetMaterialList(this.paginationSearch).then(res => {
        if (res.IsPass === true) {
          this.finshData = res.Obj
          this.logTotal = res.TotalRowCount
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
      this.$set(this.ruleForm, 'ProductName', row.Name)
      this.ruleForm.ProductCode = row.MaterialCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.finshFormVisible = false
    },
    // 成品弹窗分页
    getLogList(val) {
      this.paginationSearch.PageIndex = val.current
      this.paginationSearch.PageSize = val.size
      this.finshBox()
    },
    // 关闭成品名称查询弹窗
    fishClose() {
      this.finshFormVisible = false
    }

  }
}
</script>
