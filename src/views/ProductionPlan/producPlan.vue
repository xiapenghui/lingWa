<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.planNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.CompanyCode" :placeholder="$t('permission.planNo')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.finishNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.FullName" :placeholder="$t('permission.finishNum')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.finishName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.FullName" :placeholder="$t('permission.finishName')" /></el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="4">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.establishDate') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :picker-options="pickerOptions"
            />
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
            <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
          </el-col>
        </el-col>
        <el-col :span="1">
          <el-button v-if="btnShow" class="btnSearchUP" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('0')" />
          <el-button v-else class="btnSearchDown" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('1')" />
        </el-col>
      </el-row>

      <el-row v-show="showSearch" :gutter="20" style="margin-top: 20px;">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.customerName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.FullName" :placeholder="$t('permission.customerName')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.planType') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.CompanyCode" :placeholder="$t('permission.planType')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content7" placement="top-start">
              <label class="radio-label">{{ $t('permission.planStatus') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.FullName" :placeholder="$t('permission.planStatus')" /></el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addPlan') }}</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">{{ $t('permission.exportPlan') }}</el-button>
      <el-button type="warning" icon="el-icon-warning-outline" @click="planOpen">{{ $t('permission.planOpen') }}</el-button>
      <el-button type="danger" icon="el-icon-remove-outline" @click="planFrozen">{{ $t('permission.planFrozen') }}</el-button>
      <el-button type="success" icon="el-icon-circle-check" @click="cancelFrozen">{{ $t('permission.cancelFrozen') }}</el-button>
      <el-button type="danger" icon="el-icon-remove-outline" @click="forceOver">{{ $t('permission.forceOver') }}</el-button>

      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importcompany') }}</el-button> -->
      <!-- <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" /> -->
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" fixed />
      <el-table-column align="center" :label="$t('permission.planNo')" width="150">
        <template slot-scope="scope">
          {{ scope.row.CompanyCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.planType')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ShortName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.finishName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.FullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.planNum')" width="200">
        <template slot-scope="scope">
          {{ scope.row.Tel }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.splitNum')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.overNum')" width="100">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.customerName')" width="100">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planType')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planStatus')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planGoods')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planStart')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planOver')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualStart')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualOver')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.finishDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.establishDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="220">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="关联工单" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-link" plain @click="handleRelation(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="BOM" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-tickets" plain @click="handleBOM(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="工艺路线" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-s-operation" plain @click="handleLine(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon=" el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!--  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.EditProduction') : $t('permission.addProductiony')"
    > -->

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <el-form-item :label="$t('permission.planNo')" prop="planNo">
                <el-input v-model="ruleForm.companyNo" :placeholder="$t('permission.planNo')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <el-form-item :label="$t('permission.planType')" prop="finishNum"><el-input v-model="ruleForm.companyName" :placeholder="$t('permission.planType')" /></el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <el-form-item :label="$t('permission.planNum')" prop="finishName">
                <el-input v-model="ruleForm.companyAllName" :placeholder="$t('permission.planNum')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.splitNumOther')" prop="finishName">
                <el-input v-model="ruleForm.companyAllName" :placeholder="$t('permission.splitNumOther')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <el-form-item v-if="planAdd" :label="$t('permission.saleNum')"><el-input v-model="ruleForm.companyTel" :placeholder="$t('permission.saleNum')" /></el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <el-form-item :label="$t('permission.planOver')"><el-date-picker v-model="ruleForm.value1" type="date" placeholder="选择日期" /></el-form-item>
            </el-tooltip>
          </div>
          <div class="boxRight">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <el-form-item :label="$t('permission.finishedName')" prop="finishNum">
                <el-input v-model="ruleForm.companyNo" :placeholder="$t('permission.finishedName')" @focus="finshBox" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <el-form-item :label="$t('permission.customerName')" prop="finishNum">
                <el-input v-model="ruleForm.companyName" :placeholder="$t('permission.customerName')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.planLine')" prop="finishNum">
                <el-input v-model="ruleForm.companyName" :placeholder="$t('permission.planLine')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.priority')" prop="finishNum">
                <el-input v-model="ruleForm.companyName" :placeholder="$t('permission.priority')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <el-form-item v-if="planAdd" :label="$t('permission.saleNumOther')" prop="finishName">
                <el-input v-model="ruleForm.companyAllName" :placeholder="$t('permission.saleNumOther')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <el-form-item v-if="planAdd" :label="$t('permission.planGoods')"><el-date-picker v-model="ruleForm.value2" type="date" placeholder="选择日期" /></el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <el-form-item :label="$t('permission.actualStart')"><el-date-picker v-model="ruleForm.value3" type="date" placeholder="选择日期" /></el-form-item>
            </el-tooltip>
          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitForm('ruleForm')">{{ $t('permission.continueAdd') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 成品名称对应弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="finshFormVisible" title="成品名称">
      <el-table :data="finshData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { OrganList, OrganAdd, OrganModify } from '@/api/OrganlMan'
// import { OrganList, OrganAdd, OrganDelete, OrganModify } from '@/api/role'
const fixHeight = 270
export default {
  name: 'CompanyMaintenance',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      selectedData: [], // 批量选择新数组
      establishDate: '',
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      isDisabled: false, // 拆分弹窗默认不能修改
      planShow: true, // 拆分弹窗默认可见字段
      planAdd: false, // 新增编辑弹窗默认可见字段
      addShow: true, // 继续添加仅新增可见
      pagination: {
        PageIndex: 1,
        PageSize: 10,
        planNo: undefined,
        finishNum: undefined,
        finishName: undefined,
        finishDate: undefined,
        customerName: undefined,
        planType: undefined,
        planStatus: undefined
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      finshFormVisible: false, // input产成品弹窗
      dialogType: 'new',
      dialogTypeTitle: '',
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      rules: {
        planNo: [{ required: true, message: '请输入公司编号', trigger: 'blur' }],
        finishNum: [{ required: true, message: '请输入公司名字', trigger: 'blur' }]
      },
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
      finshData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ],
      parentMsg: this.$t('permission.importCompany'),
      content1: this.$t('permission.planNo'),
      content2: this.$t('permission.finishNum'),
      content3: this.$t('permission.finishName'),
      content4: this.$t('permission.establishDate'),
      content5: this.$t('permission.customerName'),
      content6: this.$t('permission.planType'),
      content7: this.$t('permission.planStatus,')
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
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.parentMsg = this.$t('permission.importCompany')
      this.content1 = this.$t('permission.planNo')
      this.content2 = this.$t('permission.finishNum')
      this.content3 = this.$t('permission.finishName')
      this.content4 = this.$t('permission.establishDate')
      this.content5 = this.$t('permission.customerName')
      this.content6 = this.$t('permission.planType')
      this.content7 = this.$t('permission.planStatus,')
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
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        planNo: [
          {
            required: true,
            message: this.$t('permission.planNoInfo'),
            trigger: 'blur'
          }
        ],
        finishNum: [
          {
            required: true,
            message: this.$t('permissionfinishNumInfo'),
            trigger: 'blur'
          }
        ]
      }
    },
    // 折叠按钮互斥
    toggle(status) {
      debugger
      if (status === '0') {
        this.tableHeight = '67vh'
      } else {
        this.tableHeight = '72vh'
      }
      this.btnShow = !this.btnShow
      this.showSearch = !this.showSearch
    },

    // 禁用，启用权限
    handleBan(scope, status) {},

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 重置
    handleReset() {},
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
    // 选择框
    tableKey() {},
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
    // handleSuccess({ results, header }) {
    //   this.tableData = results
    //   this.tableHeader = header
    // },
    // 获取列表
    getList() {
      this.listLoading = true
      OrganList(this.pagination).then(res => {
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
      this.dialogTypeTitle = this.$t('permission.addProductiony')
      this.dialogFormVisible = true
      this.planAdd = true
      this.planShow = false
      this.addShow = true
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogTypeTitle = this.$t('permission.EditProduction')
      this.dialogFormVisible = true
      this.planAdd = true
      this.planShow = false
      this.addShow = false
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            OrganModify(this.ruleForm).then(res => {
              debugger
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              }
            })
          } else {
            OrganAdd(this.ruleForm).then(res => {
              debugger
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              }
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
    // 关联工单
    handleRelation() {},
    // BOM
    handleBOM() {},
    // 查看工艺路线
    handleLine() {},
    // 计划拆分
    planOpen() {
      this.dialogTypeTitle = this.$t('permission.splitProductiony')
      this.dialogFormVisible = true
      this.planAdd = false
      this.planShow = true
      this.isDisabled = true
      this.addShow = false
    },
    // 计划冻结
    planFrozen() {},
    cancelFrozen() {},
    forceOver() {},
    // 编辑产成品弹窗
    finshBox() {
      this.finshFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
