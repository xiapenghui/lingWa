<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工序名称" placement="top-start"><label class="radio-label">工序名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProcessName" placeholder="工序名称" clearable /></el-col>
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
      <el-tag type="danger" size="medium">工艺路线名称:{{ this.$route.query.Name }}</el-tag>
      <el-tag type="success" size="medium">版本:{{ this.$route.query.Version }}</el-tag>
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

      <el-table-column align="center" label="工序编号" width="200" prop="ProcessNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工序名称" width="200" prop="ProcessName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否检验" width="150" prop="IsChecked" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsChecked === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsChecked === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验方式" width="150" prop="CheckedTypeText" sortable>
        <template slot-scope="scope">
          {{ scope.row.CheckedTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否必过" width="150" prop="IsMustPass" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsMustPass === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsMustPass === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否打印" width="150" prop="IsPrint" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsPrint === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsPrint === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="顺序" width="150" prop="OrderNum" sortable>
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="120">
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="工序编号" prop="ProcessNum">
          <el-input v-model="ruleForm.ProcessNum" readonly placeholder="请选择" class="disActive" @focus="workingBox" />
        </el-form-item>

        <el-form-item label="工序名称" :required="true"><el-input v-model.trim="ruleForm.ProcessName" placeholder="工序名称" :disabled="true" /></el-form-item>

        <el-form-item label="是否检验">
          <el-radio v-model="ruleForm.IsChecked" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsChecked" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="检验方式">
          <el-radio-group v-model="ruleForm.CheckedType">
            <el-radio v-for="item in checkData" :key="item.value" :label="item.value" :value="item.value" @change="changeRadio">{{ item.text }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否必过">
          <el-radio v-model="ruleForm.IsMustPass" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsMustPass" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="是否打印">
          <el-radio v-model="ruleForm.IsPrint" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsPrint" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="顺序"><el-input-number v-model.trim="ruleForm.OrderNum" placeholder="顺序" :min="0" clearable style="width: 100%" /></el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
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
      :log-total="logTotal"
      @workingClose="workingClose"
      @workingClick="workingClick"
      @handleSearchWorking="handleSearchWorking"
      @pageChange="getLogList"
    />
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import { baseDetailList, baseDetailAdd, baseDetailDelete, baseDetailModify, GetDictionary, BaseProList } from '@/api/BasicData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WorkingName from '@/components/WorkingName' // 工序名称
import Bus from '@/api/bus.js'
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'RouteMaintenanceDetaile',
  components: { Pagination, WorkingName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        ProcessNum: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ProcessName: undefined
      },
      ProcessRouteCode: this.$route.query.ProcessRouteCode,
      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 30,
        ProcessNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      Name: this.$route.query.Name,
      Version: this.$route.query.Version,
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      logTotal: 0,
      addShow: true, // 继续新增
      checkVal: null, // 选择检验方式
      checkData: [], // 新增编辑弹窗检验方式radio
      workingData: [], // 工序数组
      // workingCode: null, // 工序的code值
      dialogFormVisible: false, // 编辑弹出框
      workingBoxLoading: false, // 工序搜索loading
      workingFormVisible: false, // input工序名称弹窗
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      rules: {
        ProcessNum: [{ required: true, message: '请输入工序编号', trigger: 'change' }]
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
    // 新增检验方式radio
    GetDictionary({ code: '0019' }).then(res => {
      if (res.IsPass === true) {
        this.checkData = res.Obj
      }
    })
    this.getList()
    this.setFormRules()
    // 监听详情页getList事件
    const self = this
    Bus.$on('getList', function() {
      self.getList()
    })
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        ProcessNum: [{ required: true, message: '请输入工序编号', trigger: 'blur' }]
      }
    },

    // 选择检验方式
    changeRadio(val) {
      this.checkVal = val
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      const params = {
        PageIndex: this.pagination.PageIndex,
        PageSize: this.pagination.PageSize,
        ProcessName: this.pagination.ProcessName,
        ProcessRouteCode: this.$route.query.ProcessRouteCode
      }
      baseDetailList(params).then(res => {
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

    // 增加工艺路线
    handleAdd() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.addShow = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑工艺路线
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.addShow = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除工艺路线
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          baseDetailDelete({ ProcessRouteDetailCode: row.ProcessRouteDetailCode }).then(res => {
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
            params.ProcessRouteCode = this.$route.query.ProcessRouteCode
            baseDetailModify(params).then(res => {
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
            params.ProcessRouteCode = this.$route.query.ProcessRouteCode
            baseDetailAdd(params).then(res => {
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
          params.ProcessRouteCode = this.$route.query.ProcessRouteCode
          // params.CheckedType = this.checkVal
          baseDetailAdd(params).then(res => {
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

    // 工序聚焦事件原料弹窗
    workingBox() {
      this.workingFormVisible = true
      this.workingBoxLoading = true
      BaseProList(this.paginationSearchWorking).then(res => {
        if (res.IsPass === true) {
          this.workingData = res.Obj
          this.logTotal = res.TotalRowCount
          this.workingBoxLoading = false
        }
      })
    },
    // 工序弹窗搜索
    handleSearchWorking() {
      this.paginationSearchWorking.PageIndex = 1
      this.workingBox()
    },
    // 增加工序名称双击事件获取当前行的值
    workingClick(row) {
      this.$set(this.ruleForm, 'ProcessNum', row.ProcessNum)
      this.ruleForm.ProcessName = row.Name
      this.ruleForm.ProcessCode = row.ProcessCode
      this.workingFormVisible = false
      this.$nextTick(() => {
        debugger
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 工序弹窗分页
    getLogList(val) {
      this.paginationSearchWorking.PageIndex = val.current
      this.paginationSearchWorking.PageSize = val.size
      this.workingBox()
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
