<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.ProductNum" placeholder="成品编号" /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="成品名称" placement="top-start"><label class="radio-label">成品名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.ProductName" placeholder="成品名称" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="包含禁状态BOM" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">包含禁状态BOM</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
            <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
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
      <el-table-column align="center" label="成品编码" width="200">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成品名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="BOM版本">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="150">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="BOM描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="200">
        <template slot-scope="scope">
          {{ scope.row.CreateUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.CreateTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" content="BOM明细" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleLook(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="编辑BOM" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="复制BOM" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleCopy(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="禁用BOM" placement="top-start">
            <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启用BOM" placement="top-start">
            <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除BOM" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" /> -->

    <!-- 编辑弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">

        <el-form-item label="成品编号" prop="MaterialNum"><el-input v-model="ruleForm.MaterialNum" placeholder="成品编号" clearable /></el-form-item>
        <el-form-item label="原料名称" prop="Name"><el-input v-model="ruleForm.Name" placeholder="成品名称" clearable /></el-form-item>
        <el-form-item label="BOM版本"><el-input v-model="ruleForm.Spec" placeholder="BOM版本" clearable /></el-form-item>

        <el-form-item label="工艺路线"><el-input v-model="ruleForm.Color" placeholder="工艺路线" clearable @focus="lineBox" /></el-form-item>

        <el-form-item label="备注"><el-input v-model="ruleForm.Description" placeholder="备注" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 新增加页面工艺路线聚焦弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="lineFormVisible" title="工艺路线" width="70%" height="50%">
      <div class="searchBox" style="margin-bottom: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-col :span="6">
              <el-tooltip class="item" effect="dark" content="工艺路线名称" placement="top-start">
                <label class="radio-label">工艺路线名称:</label>
              </el-tooltip>
            </el-col>
            <el-col :span="16"><el-input v-model="paginationSearch.CustomerNum" /></el-col>
          </el-col>
          <el-col :span="4">
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-search" @click="handleFishBox">{{ $t('permission.search') }}</el-button>
            </el-col>
          </el-col>
        </el-row>
      </div>

      <el-table
        v-loading="lineLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
        :data="linerData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
        @row-dblclick="lineDbclick"
      >
        <el-table-column align="center" label="工艺路线名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.CustomerNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="版本" width="150">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.ShortName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="生效时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.Describe }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护者" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialType }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { bomList, bomDelete, bomAdd, bomModify, bomModifyStatus } from '@/api/OrganlMan'
const fixHeight = 270
const fixHeightBox = 350
export default {
  name: 'MaterialInformation',
  // components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50,
        ProductNum: undefined,
        ProductName: undefined,
        ShowBanned: false
      },
      // 搜索条件
      paginationSearch: {
        PageIndex: 1,
        PageSize: 10
      },
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
      })()
    }
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
          BomCode: row.BomCode
        }
        bomModifyStatus(params).then(res => {
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
    // 重置
    handleReset() {},

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

    // 增加角色
    handleAddUser() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {}
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

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            const params = this.ruleForm
            params.Unit = this.newUnit
            bomModify(params).then(res => {
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
            bomAdd(params).then(res => {
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
      // GetMaterialList(this.paginationSearch).then(res => {
      //   if (res.IsPass === true) {
      //     this.finshData = res.Obj
      //     this.listBoxLoading = false
      //   }
      // })
    },
    // 工艺路线弹窗搜索
    handleFishBox() {
      // this.paginationSearch.PageIndex = 1
      // this.finshBox()
    },
    // 增加工艺路线双击事件获取当前行的值
    lineDbclick(row) {
      // this.ruleForm.ProductName = row.Name
      // this.finshCode = row.MaterialCode
      // this.finshFormVisible = false
    }

  }
}
</script>

<style lang="scss" scoped></style>
