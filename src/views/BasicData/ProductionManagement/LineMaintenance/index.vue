<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.MaterialNum" placeholder="成品编号" /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="成品名称" placement="top-start"><label class="radio-label">成品名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.Name" placeholder="成品名称" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="包含禁状态成品" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">包含禁状态成品</el-checkbox>
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
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.addMaterial') }}</el-button>
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
    >
      >
      <el-table-column align="center" label="成品编码" width="150">
        <template slot-scope="scope">
          {{ scope.row.MaterialNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成品名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成品规格" width="150">
        <template slot-scope="scope">
          {{ scope.row.Spec }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="颜色" width="100">
        <template slot-scope="scope">
          {{ scope.row.Color }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="100">
        <template slot-scope="scope">
          {{ scope.row.UnitText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工艺路线名称" width="100">
        <template slot-scope="scope">
          {{ scope.row.RouteName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑成品" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="禁用成品" placement="top-start">
            <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启用成品" placement="top-start">
            <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除成品" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="原料编号" prop="MaterialNum"><el-input v-model="ruleForm.MaterialNum" placeholder="成品编号" clearable /></el-form-item>
        <el-form-item label="原料名称" prop="Name"><el-input v-model="ruleForm.Name" placeholder="成品名称" clearable /></el-form-item>
        <el-form-item label="原料规格"><el-input v-model="ruleForm.Spec" placeholder="成品规格" clearable /></el-form-item>
        <el-form-item label="颜色"><el-input v-model="ruleForm.Color" placeholder="颜色" clearable /></el-form-item>

        <el-form-item label="单位" prop="UnitText">
          <el-select v-model="ruleForm.UnitText" placeholder="单位" style="width: 100%" @change="changeUnit">
            <el-option v-for="item in UnitTextList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="工艺路线"><el-input v-model="ruleForm.RouteName" placeholder="工艺路线" clearable @focus="lineBox" /></el-form-item>

        <el-form-item label="备注"><el-input v-model="ruleForm.Description" placeholder="备注" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 新增加页面工艺路线聚焦弹窗 -->
    <LineName
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { MaterialList, MaterialDelete, MaterialAdd, MaterialModify, MaterialStatus, GetDictionary, lineList } from '@/api/OrganlMan'
import LineName from '@/components/LineName' // 工艺路线弹
const fixHeight = 270
const fixHeightBox = 350
export default {
  name: 'MaterialInformation',
  components: { Pagination, LineName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50,
        MaterialNum: undefined,
        Name: undefined,
        ShowBanned: false,
        MaterialType: 1
      },
      // 搜索条件
      paginationSearchLine: {
        Name: undefined,
        PageIndex: 1,
        PageSize: 10
      },
      lineData: [], // 工艺路线弹窗
      lineCode: null, // 工艺路线code
      listLoading: false,
      lineLoading: false, // 新增工艺路线搜索loading
      lineFormVisible: false, // 新增工艺路线弹窗
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      UnitTextList: [], // 获取新增页面单位下拉
      linerData: [], // 工艺路线数组
      newUnit: null,
      rules: {
        MaterialNum: [{ required: true, message: '请输入原料编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入原料名称', trigger: 'blur' }],
        UnitText: [{ required: true, message: '请选择单位', trigger: 'change' }]
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
        MaterialNum: [{ required: true, message: '请输入原料编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入原料名称', trigger: 'blur' }],
        UnitText: [{ required: true, message: '请输入单位', trigger: 'blur' }]
      }
    },
    // 获取下拉选择单位的最新值
    changeUnit(val) {
      this.newUnit = val
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
          MaterialCode: row.MaterialCode
        }
        MaterialStatus(params).then(res => {
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

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      MaterialList(this.pagination).then(res => {
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
    handleAddUser() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {
        MaterialType: 1
      }
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除角色
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          MaterialDelete({ MaterialCode: row.MaterialCode }).then(res => {
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
            params.Unit = this.newUnit
            params.RouteCode = this.lineCode
            MaterialModify(params).then(res => {
              if (res.IsPass === true) {
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
            const params = this.ruleForm
            params.Unit = this.newUnit
            params.RouteCode = this.lineCode
            MaterialAdd(params).then(res => {
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
            })
            this.editLoading = false
            this.dialogFormVisible = false
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

    // 聚焦事件工艺路线弹窗
    lineBox() {
      this.lineFormVisible = true
      this.lineLoading = true
      lineList(this.paginationSearchLine).then(res => {
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
      debugger
      this.ruleForm.RouteName = row.Name
      this.lineCode = row.ProcessRouteCode
      this.lineFormVisible = false
    },
    // 关闭工艺路线查询弹窗
    lineClose() {
      this.lineFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .el-col-7 {
    height: 30px;
    line-height: 25px;
    text-align: right;
  }
}
</style>
