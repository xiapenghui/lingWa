<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="检验项名称" placement="top-start"><label class="radio-label">检验项名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.InspectItemName" placeholder="检验项名称" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工序名称" placement="top-start"><label class="radio-label">工序名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProcessName" placeholder="工序名称" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="判断方式" placement="top-start"><label class="radio-label">判断方式:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.JudgmentWay" clearable style="width: 100%">
              <el-option v-for="item in JudgmentWayData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn"><el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button></div>
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

      <el-table-column align="center" label="检验项名称" width="150" prop="InspectItemName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InspectItemName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工序名称" width="150" prop="ProcessName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="判断方式" width="150" prop="JudgmentWayText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.JudgmentWayText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否必填" width="150" prop="IsRequired" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsRequired === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsRequired === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="120" prop="UnitText" sortable>
        <template slot-scope="scope">
          {{ scope.row.UnitText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上限值" width="120" prop="UpperLimit" sortable>
        <template slot-scope="scope">
          {{ scope.row.UpperLimit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="下限值" width="120" prop="LowerLimit" sortable>
        <template slot-scope="scope">
          {{ scope.row.LowerLimit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="标准值" width="120" prop="StandardValue" sortable>
        <template slot-scope="scope">
          {{ scope.row.StandardValue }}
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
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="检验项名称" prop="InspectItemName"><el-input v-model="ruleForm.InspectItemName" placeholder="检验项名称" clearable /></el-form-item>

        <el-form-item label="工序名称" prop="ProcessName">
          <!-- <el-input v-model="ruleForm.ProcessName" placeholder="清输入并工序名称" clearable @input="workingBox" /> -->
          <el-input v-model="ruleForm.ProcessName" disabled placeholder="请选择" class="disActive" @click.native="workingBox" />
        </el-form-item>

        <el-form-item label="判断方式" prop="JudgmentWay">
          <el-select v-model="ruleForm.JudgmentWay" placeholder="请选择" clearable @change="changeAway">
            <el-option v-for="item in JudgmentWayData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="下限值" prop="LowerLimit"><el-input-number v-model="ruleForm.LowerLimit" placeholder="下限值" :min="0" clearable style="width: 100%" /></el-form-item>
        <el-form-item label="上限值" prop="UpperLimit"><el-input-number v-model="ruleForm.UpperLimit" placeholder="上限值" :min="0" clearable style="width: 100%" /></el-form-item>

        <el-form-item label="标准值" prop="StandardValue">
          <el-input-number v-model="ruleForm.StandardValue" placeholder="标准值" :min="0" clearable style="width: 100%" />
        </el-form-item>

        <el-form-item label="单位">
          <el-select v-model="ruleForm.Unit" placeholder="请选择" style="width: 100%" clearable @change="changeUnit">
            <el-option v-for="item in UnitTextList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="是否必填">
          <el-radio v-model="ruleForm.IsRequired" :label="true">是</el-radio>
          <el-radio v-model="ruleForm.IsRequired" :label="false">否</el-radio>
        </el-form-item>

        <el-form-item label="参考文档" prop="RefDocument"><el-input v-model="ruleForm.RefDocument" placeholder="检验项名称" clearable /></el-form-item>
        <el-form-item label="检验工具" prop="InspectTools"><el-input v-model="ruleForm.InspectTools" placeholder="检验工具" clearable /></el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
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
      @workingClose="workingClose"
      @workingClick="workingClick"
      @handleSearchWorking="handleSearchWorking"
    />
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import { GetDictionary, BaseProList } from '@/api/BasicData'
import { QuaIpqcIDeList, QuaIpqcIDeAdd, QuaIpqcIDeModify, QuaIpqcIDeDelete } from '@/api/QualityData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WorkingName from '@/components/WorkingName' // 工序名称
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'ProductQualityDetail',
  components: { Pagination, WorkingName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        ProcessName: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ItemCode: this.$route.query.ItemCode,
        InspectItemName: undefined,
        ProcessName: undefined,
        JudgmentWay: undefined
      },
      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 20,
        ProcessNum: undefined,
        Name: undefined
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      addShow: true, // 继续新增
      JudgmentWayVal: null, // 下拉判断方式
      newUnit: null, // 单位
      newJudgmentWay: null, // 判断方式
      checkData: [], // 新增编辑弹窗检验方式radio
      JudgmentWayData: [], // 判断下拉方式数组
      UnitTextList: [], // 获取新增页面单位下拉
      workingData: [], // 工序数组
      dialogFormVisible: false, // 编辑弹出框
      workingBoxLoading: false, // 工序搜索loading
      workingFormVisible: false, // input工序名称弹窗
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      rules: {
        InspectItemName: [{ required: true, message: '请输入检验项名称', trigger: 'blur' }],
        JudgmentWay: [{ required: true, message: '请选择判断方式', trigger: 'blur' }],
        UpperLimit: [{ required: true, message: '请输入上限值', trigger: 'blur' }],
        LowerLimit: [{ required: true, message: '请输入下限值', trigger: 'blur' }],
        StandardValue: [{ required: true, message: '请输入标准值', trigger: 'blur' }]
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

    // 判断方式下拉
    GetDictionary({ code: '0027' }).then(res => {
      if (res.IsPass === true) {
        this.JudgmentWayData = res.Obj
      }
    })

    // 新增检验方式radio
    GetDictionary({ code: '0019' }).then(res => {
      if (res.IsPass === true) {
        this.checkData = res.Obj
      }
    })

    // 单位下拉
    GetDictionary({ code: '0021' }).then(res => {
      if (res.IsPass === true) {
        this.UnitTextList = res.Obj
      }
    })

    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        InspectItemName: [{ required: true, message: '请输入检验项名称', trigger: 'blur' }],
        JudgmentWay: [{ required: true, message: '请选择判断方式', trigger: 'blur' }],
        UpperLimit: [{ required: true, message: '请输入上限值', trigger: 'blur' }],
        LowerLimit: [{ required: true, message: '请输入下限值', trigger: 'blur' }],
        StandardValue: [{ required: true, message: '请输入标准值', trigger: 'blur' }]
      }
    },

    // 获取下拉选择单位的最新值
    changeUnit(val) {
      this.newUnit = val
    },

    // 下拉获取最新的判断方式
    changeAway(val) {
      this.newJudgmentWay = val
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      QuaIpqcIDeList(this.pagination).then(res => {
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
          QuaIpqcIDeDelete({ InspectItemCode: row.InspectItemCode, ItemCode: row.ItemCode }).then(res => {
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
            params.ItemCode = this.$route.query.ItemCode
            QuaIpqcIDeModify(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
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
              this.editLoading = false
            })
          } else {
            const params = this.ruleForm
            params.ItemCode = this.$route.query.ItemCode
            params.JudgmentWay = this.newJudgmentWay
            params.Unit = this.newUnit
            QuaIpqcIDeAdd(params).then(res => {
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
          const params = this.ruleForm
          params.ItemCode = this.$route.query.ItemCode
          params.JudgmentWay = this.newJudgmentWay
          params.Unit = this.newUnit
          QuaIpqcIDeAdd(params).then(res => {
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
      this.ruleForm.ProcessCode = row.ProcessCode
      // this.ruleForm.ProcessName = row.Name
      this.$set(this.ruleForm, 'ProcessName', row.Name)
      this.workingFormVisible = false
    },
    // 关闭工序名称查询弹窗
    workingClose() {
      this.workingFormVisible = false
    }
  }
}
</script>
