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
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button></div>

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
      <el-table-column align="center" label="供应商" width="200" prop="SupplierName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SupplierName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验类型" width="150" prop="InspectTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InspectTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验方式" width="150" prop="InspectWayText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InspectWayText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="来料检验规则编号" width="150" prop="IQCRuleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.IQCRuleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="版本号" width="150" prop="Version" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生效时间" width="150" prop="EffectiveDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EffectiveDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="150" prop="Description" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="150" prop="Remark" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="检验项明细" placement="top-start">
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="原料名称" prop="MaterialName">
          <el-input v-model="ruleForm.MaterialName" readonly placeholder="请选择" class="disActive" @focus="materialBox" />
        </el-form-item>

        <el-form-item label="供应商名称"><el-input v-model="ruleForm.SupplierName" placeholder="供应商名称" :disabled="true" /></el-form-item>

        <el-form-item label="检验类型" prop="InspectType">
          <el-select v-model="ruleForm.InspectType" placeholder="请选择" clearable @change="changeText">
            <el-option v-for="item in InspectTypeOptions" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="检验方式" prop="InspectWay">
          <el-select v-model="ruleForm.InspectWay" placeholder="请选择" clearable @change="changeAway">
            <el-option v-for="item in InspectWayOptions" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="来料检验规则" prop="IQCRuleNum">

          <el-input v-model="ruleForm.IQCRuleNum" readonly placeholder="请选择" class="disActive" @focus="incomingBox" />
        </el-form-item>

        <el-form-item label="版本" prop="Version"><el-input v-model.trim="ruleForm.Version" placeholder="版本" clearable /></el-form-item>

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
      @materialClose="materialClose"
      @materialClick="materialClick"
      @handleSearchMaterial="handleSearchMaterial"
    />

    <!-- 来料检验规则 -->
    <Incoming-name
      :incoming-show="incomingFormVisible"
      :incoming-box-loading="incomingBoxLoading"
      :table-box-height="tableBoxHeight"
      :incoming-data="incomingData"
      :pagination-search-incoming="paginationSearchIncoming"
      @incomingClose="incomingClose"
      @incomingClick="incomingClick"
      @handleSearchIncoming="handleSearchIncoming"
    />
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import { MaterialList, GetDictionary } from '@/api/BasicData'
import { QuaIqcInList, QuaIqcInDelete, QuaIqcInAdd, QuaIqcInModify, QuaIqcInStatus, QuaIqcInCopy, QuaIqcList } from '@/api/QualityData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import MaterialName from '@/components/MaterialName' // 原料名称
import IncomingName from '@/components/IncomingName' // 来料检验规则
import Bus from '@/api/bus.js'
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'MaterialInsp',
  components: { Pagination, MaterialName, IncomingName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        MaterialName: '',
        IQCRuleNum: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        MaterialNum: undefined,
        MaterialName: undefined,
        ShowBanned: false
      },
      // 原料搜索条件
      paginationSearchMaterial: {
        PageIndex: 1,
        PageSize: 10000,
        MaterialType: 0,
        MaterialNum: undefined,
        MaterialName: undefined,
        ShowBanned: false
      },

      // 来料检验规则条件
      paginationSearchIncoming: {
        PageIndex: 1,
        PageSize: 10000,
        RuleNum: undefined,
        ShowBanned: false
      },

      listLoading: false,
      materialBoxLoading: false, // 原料名称loading
      materialFormVisible: false, // input原料弹窗
      incomingBoxLoading: false, // 来料检验规则
      incomingFormVisible: false, // input来料检验弹窗
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      addShow: true, // 继续新增
      newAway: null, // 下拉获取检验方式
      newText: null, // 下拉获取检验类型
      materialData: [], // 成品编号
      incomingData: [], // 来料检验规则
      InspectWayOptions: [], // 检验方式
      InspectTypeOptions: [], // 来料检验规则
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 8.64e7
        }
      },
      rules: {
        MaterialName: [{ required: true, message: '请选择原料名称', trigger: 'blue' }],
        InspectType: [{ required: true, message: '请选择检验类型', trigger: 'blue' }],
        InspectWay: [{ required: true, message: '请选择检验方式', trigger: 'blue' }],
        IQCRuleNum: [{ required: true, message: '请选择来料检验规则', trigger: 'blue' }],
        Version: [{ required: true, message: '请输入版本号', trigger: 'blue' }],
        EffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'blue' }]
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
        that.tableBoxHeight = window.innerHeight - fixHeightBox
      })()
    }

    // 新增检验方式下拉
    GetDictionary({ code: '0025' }).then(res => {
      if (res.IsPass === true) {
        this.InspectWayOptions = res.Obj
      }
    })

    // 新增检验类型下拉
    GetDictionary({ code: '0024', code2: '1' }).then(res => {
      if (res.IsPass === true) {
        this.InspectTypeOptions = res.Obj
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
        MaterialName: [{ required: true, message: '请选择原料名称', trigger: 'blue' }],
        InspectType: [{ required: true, message: '请选择检验类型', trigger: 'blue' }],
        InspectWay: [{ required: true, message: '请选择检验方式', trigger: 'blue' }],
        IQCRuleNum: [{ required: true, message: '请选择来料检验规则', trigger: 'blue' }],
        Version: [{ required: true, message: '请输入版本号', trigger: 'blue' }],
        EffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'blue' }]
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
          ItemCode: row.ItemCode
        }
        QuaIqcInStatus(params).then(res => {
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

    // 下拉获取最新的检验方式
    changeAway(val) {
      this.newAway = val
    },

    // 下拉获取最新的检验类型
    changeText(val) {
      this.newText = val
    },

    // 查看检验项明细
    handleLook(row) {
      this.$router.push({
        path: '/QualityData/BasicData/MaterialInspDetail',
        query: {
          ItemCode: row.ItemCode,
          MaterialNum: row.MaterialNum,
          MaterialName: row.MaterialName
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
      QuaIqcInList(this.pagination).then(res => {
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

    // 删除
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          QuaIqcInDelete({ ItemCode: row.ItemCode }).then(res => {
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
          QuaIqcInCopy({ ItemCode: row.ItemCode }).then(res => {
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
            params.SupplierCode = '111'
            QuaIqcInModify(params).then(res => {
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
            params.InspectWay = this.newAway
            params.InspectType = this.newText
            params.SupplierCode = '111'
            QuaIqcInAdd(params).then(res => {
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
          params.InspectWay = this.newAway
          params.InspectType = this.newText
          params.SupplierCode = '111'
          QuaIqcInAdd(params).then(res => {
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

    // 原料聚焦事件原料弹窗
    materialBox() {
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
      // this.ruleForm.MaterialName = row.Name
      this.$set(this.ruleForm, 'MaterialName', row.Name)
      this.ruleForm.MaterialCode = row.MaterialCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.materialFormVisible = false
    },
    // 关闭原料名称查询弹窗
    materialClose() {
      this.materialFormVisible = false
    },

    // 来料检验规则聚焦事件原料弹窗
    incomingBox() {
      this.incomingFormVisible = true
      this.incomingBoxLoading = true
      QuaIqcList(this.paginationSearchIncoming).then(res => {
        if (res.IsPass === true) {
          this.incomingData = res.Obj
          this.incomingBoxLoading = false
        }
      })
    },
    // 来料检验规则弹窗搜索
    handleSearchIncoming() {
      this.paginationSearchIncoming.PageIndex = 1
      this.incomingBox()
    },
    // 增加来料检验规则双击事件获取当前行的值
    incomingClick(row) {
      // this.ruleForm.IQCRuleNum = row.RuleNum
      this.$set(this.ruleForm, 'IQCRuleNum', row.RuleNum)
      this.ruleForm.IQCCode = row.IQCCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.incomingFormVisible = false
    },
    // 关闭来料检验规则查询弹窗
    incomingClose() {
      this.incomingFormVisible = false
    }
  }
}
</script>
