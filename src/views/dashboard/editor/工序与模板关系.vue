<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工序编号" placement="top-start"><label class="radio-label">工序编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProcessNum" placeholder="工序编号" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工序名称" placement="top-start"><label class="radio-label">工序名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.TerminalName" placeholder="工序名称" clearable /></el-col>
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

      <el-table-column align="center" label="工序编号" width="150" prop="ProcessNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工序名称" width="150" prop="ProcessName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板编号" width="150" prop="TempNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TempNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板名称" width="150" prop="TempName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TempName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属公司" width="150" prop="TerminalName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="打印数量 (份)" width="150" prop="PrintCount" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PrintCount }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
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

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable>
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

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="工序编号" prop="ProcessNum"><el-input v-model.trim="ruleForm.ProcessNum" placeholder="工位编号" class="disActive" @focus="workingBox" /></el-form-item>
        <el-form-item label="工序名称" prop="ProcessName"><el-input v-model.trim="ruleForm.ProcessName" placeholder="工位名称" :disabled="true" /></el-form-item>
        <el-form-item label="模板编号" prop="TempNum"><el-input v-model.trim="ruleForm.TempNum" placeholder="异常编号" class="disActive" @focus="tempBox" /></el-form-item>
        <el-form-item label="模板名称" prop="TempName"><el-input v-model.trim="ruleForm.TempName" placeholder="模板名称" :disabled="true" /></el-form-item>
        <el-form-item label="打印数量 (份)"><el-input v-model.trim="ruleForm.PrintCount" placeholder="打印数量" /></el-form-item>
        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" clearable /></el-form-item>
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

    <!--上传模板弹窗 -->
    <temp-name
      :temp-show="tempFormVisible"
      :temp-box-loading="tempBoxLoading"
      :table-box-height="tableBoxHeight"
      :temp-data="tempData"
      :pagination-search-temp="paginationSearchTemp"
      @tempClose="tempClose"
      @tempClick="tempClick"
      @handleSearchTemp="handleSearchTemp"
    />
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WorkingName from '@/components/WorkingName' // 工序名称
import TempName from '@/components/TempName' // 上传模板
import { BaseProList, BarList, BarTempList, BarTempAdd, BarTempDelete, BarTempModify } from '@/api/BasicData'
const fixHeight = 270
const fixHeightBox = 350
export default {
  name: 'MaterialInformation',
  components: { Pagination, WorkingName, TempName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ProcessNum: undefined,
        TerminalName: undefined
      },

      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 10000,
        ProcessNum: undefined,
        Name: undefined,
        ShowBanned: false
      },

      // 上传模板搜索条件
      paginationSearchTemp: {
        PageIndex: 1,
        PageSize: 10000,
        TempNum: undefined,
        Name: undefined,
        ShowBanned: false
      },

      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      addShow: true, // 继续新增
      workingData: [], // 工序数组
      workingBoxLoading: false, // 工序搜索loading
      workingFormVisible: false, // input工序名称弹窗
      tempData: [], // 上传模板数组
      tempBoxLoading: false, // 上传模板搜索loading
      tempFormVisible: false, // input上传模板弹窗
      rules: {
        ProcessNum: [{ required: true, message: '请选择工序编号', trigger: 'blur' }],
        ProcessName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }],
        TempNum: [{ required: true, message: '请输入模板编号', trigger: 'blur' }],
        TempName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }]
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
        ProcessNum: [{ required: true, message: '请选择工序编号', trigger: 'blur' }],
        ProcessName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }],
        TempNum: [{ required: true, message: '请输入模板编号', trigger: 'blur' }],
        TempName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      BarTempList(this.pagination).then(res => {
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

    // 增加角色
    handleAdd() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.addShow = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑角色
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
          BarTempDelete({ ProTempCode: row.ProTempCode }).then(res => {
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
            BarTempModify(this.ruleForm).then(res => {
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
            BarTempAdd(this.ruleForm).then(res => {
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
          BarTempAdd(this.ruleForm).then(res => {
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
      this.$set(this.ruleForm, 'ProcessNum', row.ProcessNum)
      this.ruleForm.ProcessName = row.Name
      this.ruleForm.ProcessCode = row.ProcessCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.workingFormVisible = false
    },
    // 关闭工序名称查询弹窗
    workingClose() {
      this.workingFormVisible = false
    },

    // 上传模板弹窗
    tempBox() {
      this.tempFormVisible = true
      this.tempBoxLoading = true
      BarList(this.paginationSearchTemp).then(res => {
        if (res.IsPass === true) {
          this.tempData = res.Obj
          this.tempBoxLoading = false
        }
      })
    },
    // 上传模板搜索
    handleSearchTemp() {
      this.paginationSearchTempg.PageIndex = 1
      this.tempBox()
    },
    // 增加上传模板双击事件获取当前行的值
    tempClick(row) {
      this.$set(this.ruleForm, 'TempNum', row.TempNum)
      this.ruleForm.TempName = row.Name
      this.ruleForm.TempCode = row.TempCode
      this.tempFormVisible = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 关闭上传模板查询弹窗
    tempClose() {
      this.tempFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
