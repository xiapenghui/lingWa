<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.companyNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.CompanyCode" :placeholder="$t('permission.companysInfo')" /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.companyName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.FullName" :placeholder="$t('permission.companyNameInfo')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <el-checkbox v-model="pagination.IsDelete" @change="tableKey">{{ $t('permission.inclusionCompany') }}</el-checkbox>
            </el-tooltip>
          </el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
            <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addCompany') }}</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">{{ $t('permission.exportCompany') }}</el-button>
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
    >
      <el-table-column align="center" :label="$t('permission.companyNo')" width="150">
        <template slot-scope="scope">
          {{ scope.row.CompanyCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ShortName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyAllName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.FullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyTel')" width="150">
        <template slot-scope="scope">
          {{ scope.row.Tel }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyAddress')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.companyDescription')" width="300">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.state')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ color: scope.row.status === '禁用' ? '#FF5757' : '#13ce66' }">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="100">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">{{ $t('permission.editConply') }}</el-button>
          <el-button v-if="scope.row.UseStatus == 1" type="danger" size="small" @click="handleBan(scope.row)">{{ $t('permission.handleBan') }}</el-button>
          <el-button v-else type="success" size="small" @click="handleBan(scope.row)">{{ $t('permission.handleEnable') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">{{ $t('permission.deleteCompany') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.EditCompany') : $t('permission.addCompany')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
          <el-form-item :label="$t('permission.companyNo')" prop="companyNo"><el-input v-model="ruleForm.companyNo" :placeholder="$t('permission.companyNo')" /></el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
          <el-form-item :label="$t('permission.companyName')" prop="companyName">
            <el-input v-model="ruleForm.companyName" :placeholder="$t('permission.companyName')" />
          </el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
          <el-form-item :label="$t('permission.companyAllName')" prop="companyAllName">
            <el-input v-model="ruleForm.companyAllName" :placeholder="$t('permission.companyAllName')" />
          </el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
          <el-form-item :label="$t('permission.companyTel')"><el-input v-model="ruleForm.companyTel" :placeholder="$t('permission.companyTel')" /></el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
          <el-form-item :label="$t('permission.companyAddress')"><el-input v-model="ruleForm.companyAddress" :placeholder="$t('permission.companyAddress')" /></el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content7" placement="top-start">
          <el-form-item :label="$t('permission.companyLogo')">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="content8" placement="top-start">
          <el-form-item :label="$t('permission.companyDescription')">
            <el-input v-model="ruleForm.companyDescription" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.companyDescription')" />
          </el-form-item>
        </el-tooltip>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
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
      pagination: {
        PageIndex: 1,
        PageSize: 10,
        CompanyCode: undefined,
        companyName: undefined,
        IsDelete: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogType: 'new',
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      rules: {
        CompanyCode: [{ required: true, message: '请输入公司编号', trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入公司名字', trigger: 'blur' }]

      },
      parentMsg: this.$t('permission.importCompany'),
      content1: this.$t('permission.companyNo'),
      content2: this.$t('permission.companyName'),
      content3: this.$t('permission.inclusionCompany'),
      content4: this.$t('permission.companyAllName'),
      content5: this.$t('permission.companyTel'),
      content6: this.$t('permission.companyAddress'),
      content7: this.$t('permission.companyLogo'),
      content8: this.$t('permission.companyDescription')
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
      this.content1 = this.$t('permission.companyNo')
      this.content2 = this.$t('permission.companyName')
      this.content3 = this.$t('permission.inclusionCompany')
      this.content4 = this.$t('permission.companyAllName')
      this.content5 = this.$t('permission.companyTel')
      this.content6 = this.$t('permission.companyAddress')
      this.content7 = this.$t('permission.companyLogo')
      this.content8 = this.$t('permission.companyDescription')
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
        companyNo: [
          {
            required: true,
            message: this.$t('permission.companyNoInfo'),
            trigger: 'blur'
          }
        ],
        companyName: [
          {
            required: true,
            message: this.$t('permission.companyNameInfo'),
            trigger: 'blur'
          }
        ]
      }
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
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
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

    // 图片上传
    handleAvatarSuccess(res, file) {},
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 2

      if (!type) {
        this.$message.error(this.$t('permission.imgErrorInfo'))
      }
      if (!isLt5M) {
        this.$message.error(this.$t('permission.imgSize'))
      }
      return type && isLt5M
    },
    // 删除角色
    handleDelete({ $index, row }) {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.avatar-uploader .el-upload {
  border: 1px dashed #999999;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #999999;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
