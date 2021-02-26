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

        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
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

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="执行收货" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-document-checked" plain @click="handleEdit(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" title="执行收货">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="收货凭证"><el-input v-model.trim="ruleForm.RecvCret" placeholder="收货凭证" disabled /></el-form-item>
            <el-form-item label="采购订单"><el-input v-model.trim="ruleForm.OrderNum" placeholder="采购订单" disabled /></el-form-item>
            <el-form-item label="收货条码" prop="Barcode"><el-input v-model.trim="ruleForm.Barcode" placeholder="收货条码" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="物料编号"><el-input v-model.trim="ruleForm.MaterialNum" placeholder="物料编号" disabled /></el-form-item>
            <el-form-item label="已收货数量"><el-input v-model.trim="ruleForm.RecvQty" placeholder="已收货数量" disabled /></el-form-item>
            <el-form-item label="待收货数量"><el-input v-model.trim="ruleForm.TotalQty" placeholder="待收货数量" disabled /></el-form-item>
          </div>
        </div>
        <div style="margin-left: 30px;"><el-button type="primary" @click="submitForm('ruleForm')">校验条码</el-button></div>
      </el-form>

      <el-table
        v-loading="listLoading2"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="tableData2"
        :height="tableHeight2"
        style="width: 100%;margin-top: 20px"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

        <el-table-column align="center" label="收货条码" width="150" prop="Barcode" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Barcode }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="数量" width="150" prop="TotalQty" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.TotalQty }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="物料编码" width="150" prop="MaterialNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MaterialNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="物料属性" width="150" prop="MaterialAttributeText" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MaterialAttributeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="物料描述" min-width="150" prop="Description" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Description }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="扫描时间" width="150" prop="ScanTime" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ScanTime | substringTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="收货人" width="150" prop="RecvUserName" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.RecvUserName }}
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;margin-top: 10px;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm2('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { QuaRecvList, PerformRecvGoodsList, PerformRecvGoodsSave } from '@/api/QualityData'
const fixHeight = 260
const fixHeight2 = 600
export default {
  name: 'MaterialInformation',
  components: { Pagination },
  data() {
    return {
      tableData: [], // 主列表
      tableData2: [], // 执行收货列表
      ruleForm: {
        Barcode: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        OrderNum: undefined,
        RecvCret: undefined,
        MaterialNum: undefined
      },
      listLoading: false,
      listLoading2: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      NewRecvCode: null,
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableHeight2: window.innerHeight - fixHeight2, // 表格高度
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
        Barcode: [{ required: true, message: '请输入收货条码', trigger: 'blur' }]
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
    tableHeight2(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },

    'ruleForm.ShortCode': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.ShortCode = this.filterInput(val)
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
        that.tableHeight2 = window.innerHeight - fixHeight2
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
        Barcode: [{ required: true, message: '请输入收货条码', trigger: 'blur' }]
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

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

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

    // 编辑角色
    handleEdit(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.NewRecvCode = row.RecvCode
    },

    // 检验条码
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Barcode: this.ruleForm.Barcode,
            RecvCode: this.NewRecvCode
          }
          PerformRecvGoodsList(params).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: res.MSG
              })
              this.tableData2 = res.Obj
            } else {
              this.$message({
                type: 'error',
                message: res.MSG
              })
            }
            this.editLoading = false
          })
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

    // 提交保存成功
    submitForm2(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            Barcode: this.ruleForm.Barcode,
            DetailCode: this.tableData2[0].DetailCode
          }
          PerformRecvGoodsSave(params).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: '执行收货成功！'
              })
              this.getList()
              this.dialogFormVisible = false
              this.tableData2 = []
              this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
              })
            } else {
              this.$message({
                type: 'error',
                message: res.MSG
              })
            }
            this.editLoading = false
          })
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  border: 1px solid #dfe6ec;
  padding: 15px;
  border-radius: 5px;
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
