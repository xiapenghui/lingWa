<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工艺路线名称" placement="top-start"><label class="radio-label">工艺路线名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.Name" placeholder="工艺路线名称" clearable /></el-col>
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

      <el-table-column align="center" label="工艺路线名称" width="200" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="版本" width="200" prop="Version" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生效时间" width="150" prop="EffectiveDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EffectiveDate | substringTime }}
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

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
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

          <el-tooltip v-if="scope.row.Status === true" class="item" effect="dark" :enterable="false" content="禁用" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip v-if="scope.row.Status === false" class="item" effect="dark" :enterable="false" content="启用" placement="top-start">
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
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="工艺路线名称" prop="Name"><el-input v-model.trim="ruleForm.Name" placeholder="工艺路线名称" clearable /></el-form-item>
        <el-form-item label="版本" prop="Version"><el-input v-model.trim="ruleForm.Version" placeholder="版本" clearable /></el-form-item>

        <el-form-item label="生效时间" prop="EffectiveDate">
          <el-date-picker
            v-model="ruleForm.EffectiveDate"
            :picker-options="expireTimeOption"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            clearable
          />
        </el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import { baseRouteList, baseRouteDelete, baseRouteAdd, baseRouteModify, baseRouteStatus, baseRouteCopy } from '@/api/BasicData'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'RouteMaintenance',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        Name: undefined,
        Status: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 8.64e7
        }
      },
      rules: {
        Name: [{ required: true, message: '请输入工艺路线', trigger: 'blur' }],
        Version: [{ required: true, message: '请输入版本', trigger: 'blur' }],
        EffectiveDate: [{ required: true, message: '请输入生效时间', trigger: 'blur' }]
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
        Name: [{ required: true, message: '请输入工艺路线', trigger: 'blur' }],
        Version: [{ required: true, message: '请输入版本', trigger: 'blur' }],
        EffectiveDate: [{ required: true, message: '请输入生效时间', trigger: 'blur' }]
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
          ProcessRouteCode: row.ProcessRouteCode
        }
        baseRouteStatus(params).then(res => {
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
    },

    // 查看工艺路线
    handleLook(row) {
      this.$router.push({
        path: '/BasicData/ProductMmanagement/RouteMaintenanceDetaile',
        query: {
          ProcessRouteCode: row.ProcessRouteCode,
          Name: row.Name,
          Version: row.Version
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
      baseRouteList(this.pagination).then(res => {
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
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑工艺路线
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
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
          baseRouteDelete({ ProcessRouteCode: row.ProcessRouteCode }).then(res => {
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

    // 复制工艺路线
    handleCopy(row) {
      this.$confirm('您确定要复制此条数据么？', '复制', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          baseRouteCopy({ ProcessRouteCode: row.ProcessRouteCode }).then(res => {
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
            baseRouteModify(params).then(res => {
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
            baseRouteAdd(params).then(res => {
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
    }
  }
}
</script>
