<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="物料编号" placement="top-start"><label class="radio-label">物料编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialNum" placeholder="物料编号" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="物料名称" placement="top-start"><label class="radio-label">物料名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.MaterialName" placeholder="物料名称" clearable /></el-col>
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
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="所属工序" width="150" prop="DefectNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DefectNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料编号" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验项名称" width="150" prop="DefectLevelText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DefectLevelText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验目标值" width="150" prop="StandardValue" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StandardValue }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="规范下限" width="150" prop="LowerLimit" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LowerLimit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="规范上限" width="150" prop="UpperLimit" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UpperLimit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="150" prop="Unit" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Unit }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验类别" width="150" prop="InspectItemName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InspectItemName }}
        </template>
      </el-table-column>

      <el-tolumn align="center" label="检验类型" width="150" prop="InspectItemName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InspectItemName }}
        </template>
        </el-table-column>

        <el-table-calign="center" label="检验方法及器具" width="150" prop="MethodOrTools" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MethodOrTools }}
          </template>
          </el-table-column>

          <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.Remark }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.state')" width="100" prop="Status" sortable>
            <template slot-scope="scope">
              <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.ModifyUserName }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.ModifyTime | substringTime }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
                <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
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
        </el-table-calign="center"></el-tolumn></el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="所属工序" prop="ProcessName"><el-input v-model.trim="ruleForm.ProcessName" readonly placeholder="请选择" class="disActive" @focus="workingBox" /></el-form-item>

        <el-form-item label="物料编码"><el-input v-model.trim="ruleForm.Name" placeholder="缺陷名称" clearable /></el-form-item>

        <el-form-item label="物料名称"><el-input v-model.trim="ruleForm.Name" placeholder="物料名称" clearable /></el-form-item>

        <el-form-item label="检验项名称"><el-input v-model.trim="ruleForm.InspectItemName" placeholder="检验项名称" clearable /></el-form-item>

        <el-form-item label="物料类型" prop="TypeCodeText"><el-input v-model.trim="ruleForm.TypeCodeText" placeholder="物料类型" clearable /></el-form-item>

        <el-form-item label="检验类别" prop="JudgmentWay">
          <el-select v-model="ruleForm.JudgmentWay" placeholder="检验类别" style="width: 100%" clearable>
            <el-option v-for="item in InspectWayData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="检验类型" prop="DefectLevel">
          <el-select v-model="ruleForm.DefectLevel" placeholder="检验类型" style="width: 100%" clearable>
            <el-option v-for="item in DefectGradeData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="检验目标值">
          <el-input-number v-model="ruleForm.StandardValue" placeholder="检验目标值" :min="0" style="width: 100%" />
        </el-form-item>

        <el-form-item label="规范值">
          <el-input-number v-model="ruleForm.LowerLimit" :min="0" placeholder="规范下限" style="width: 48%" />
          -----
          <el-input-number v-model="ruleForm.UpperLimit" :min="0" placeholder="规范上限" style="width: 48%" />
        </el-form-item>

        <el-form-item label="单位">
          <el-select v-model="ruleForm.Unit" placeholder="请选择" style="width: 100%" clearable>
            <el-option v-for="item in UnitTextList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="检验方法及器具"><el-input v-model.trim="ruleForm.MethodOrTools" placeholder="检验方法及器具" type="textarea" /></el-form-item>

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

  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary, BaseProList } from '@/api/BasicData'
import { QuaMakeList, QuaMakeAdd, QuaMakeDelete, QuaMakeModify, QuaMakeModifyStatus } from '@/api/QualityData'
import WorkingName from '@/components/WorkingName' // 工序名称
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'ProductsLack',
  components: { Pagination, WorkingName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        MaterialNum: undefined,
        MaterialName: undefined,
        ShowBanned: false
      },
      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 10000,
        ProcessNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      addShow: false,
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      workingData: [], // 工序数组
      workingBoxLoading: false, // 工序搜索loading
      workingFormVisible: false, // input工序名称弹窗
      InspectWayData: [], // 检验类别
      UnitTextList: [], // 单位下拉
      dialogType: 'new',
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      rules: {
        DefectNum: [{ required: true, message: '请输入缺陷编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入缺陷名称', trigger: 'blur' }],
        InspectItemName: [{ required: true, message: '请输入检验项', trigger: 'blur' }],
        TypeCodeText: [{ required: true, message: '请选择物料类型', trigger: 'blur' }]
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
    'ruleForm.DefectNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.DefectNum = this.filterInput(val)
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
      })()
    }

    // 检验类别
    GetDictionary({ code: '0027' }).then(res => {
      if (res.IsPass === true) {
        this.InspectWayData = res.Obj
      }
    })

    // 单位下拉
    GetDictionary({ code: '0021' }).then(res => {
      if (res.IsPass === true) {
        this.UnitTextList = res.Obj
      }
    })

    // Mock: get all routes and roles list from server
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
        DefectNum: [{ required: true, message: '请输入缺陷编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入缺陷名称', trigger: 'blur' }],
        InspectItemName: [{ required: true, message: '请输入检验项', trigger: 'blur' }],
        TypeCodeText: [{ required: true, message: '请选择物料类型', trigger: 'blur' }]
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
        QuaMakeModifyStatus(params).then(res => {
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
      QuaMakeList(this.pagination).then(res => {
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

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            debugger
            QuaMakeModify(this.ruleForm).then(res => {
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
            QuaMakeAdd(params).then(res => {
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
          QuaMakeAdd(params).then(res => {
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

    // 删除角色
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          QuaMakeDelete({ ItemCode: row.ItemCode }).then(res => {
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
      console.log('row', row)
      this.ruleForm.ProcessCode = row.ProcessCode
      this.$set(this.ruleForm, 'ProcessName', row.Name)
      // this.ruleForm.ProcessName = row.Name
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
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
.app-container .pagination-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
