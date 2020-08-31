<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.companyNo') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="form.companyNo" :placeholder="$t('permission.companysInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.companyName') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="form.companyName" :placeholder="$t('permission.companyNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-checkbox v-model="form.showReviewer" @change="tableKey">{{ $t('permission.inclusionCompany') }}</el-checkbox>
          </el-col>
        </el-col>
      </el-row>

      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addCompany') }}</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">{{ $t('permission.exportCompany') }}</el-button>
      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importcompany') }}</el-button> -->
      <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" />
    </div>

    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%" border>
      <el-table-column align="center" :label="$t('permission.companyNo')" width="150" fixed sortable prop="key">
        <template slot-scope="scope">
          {{ scope.row.companyNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyAllName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.companyAllName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyTel')" width="150">
        <template slot-scope="scope">
          {{ scope.row.companyTel }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.companyAddress')" width="150">
        <template slot-scope="scope">
          {{ scope.row.companyAddress }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.companyDescription')" width="300">
        <template slot-scope="scope">
          {{ scope.row.companyDescription }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.state')" width="150" sortable prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ color: scope.row.status === '禁用' ? '#FF5757' : '#13ce66' }">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" prop="name" sortable width="250">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="200">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('permission.editPermission') }}</el-button>
          <el-button type="warning" size="small" @click="handleLook(scope)">{{ $t('permission.lookPermission') }}</el-button>
          <el-button v-if="scope.row.status == '启用'" type="danger" size="small" @click="handleBan(scope, '禁用')">{{ $t('permission.handleCompany') }}</el-button>
          <el-button v-else type="success" size="small" @click="handleBan(scope, '启用')">{{ $t('permission.SpecificationsCompany') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('permission.deleteCompany') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="isShow" :data="tableData" border highlight-current-row><el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" /></el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? $t('permission.EditCompany') : $t('permission.addCompany')">
      <el-form :model="role" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('permission.companyNo')"><el-input v-model="role.companyNo" :placeholder="$t('permission.companyNo')" clearable /></el-form-item>
        <el-form-item :label="$t('permission.companyName')" prop="companyName">
          <el-input v-model="role.companyName" :placeholder="$t('permission.companyName')" clearable />
        </el-form-item>
        <el-form-item :label="$t('permission.companyAllName')" prop="companyAllName">
          <el-input v-model="role.companyAllName" :placeholder="$t('permission.companyAllName')" clearable />
        </el-form-item>
        <el-form-item :label="$t('permission.companyTel')"><el-input v-model="role.companyTel" :placeholder="$t('permission.companyTel')" clearable /></el-form-item>
        <el-form-item :label="$t('permission.companyAddress')"><el-input v-model="role.companyAddress" :placeholder="$t('permission.companyAddress')" clearable /></el-form-item>
        <el-form-item :label="$t('permission.companyLogo')">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="role.imageUrl" :src="role.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('permission.companyDescription')">
          <el-input v-model="role.companyDescription" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.companyDescription')" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../../styles/scrollbar.css'
import '../../../../styles/commentBox.scss'
import { deleteRole } from '@/api/role'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  components: { Pagination, UploadExcelComponent },
  data() {
    return {
      // role: Object.assign({}, defaultRole),
      role: {
        companyNo: '',
        companyName: '',
        companyAllName: '',
        companyTel: '',
        companyAddress: '',
        imageUrl: '',
        companyDescription: ''
      },
      routes: [],
      rolesList: [
        {
          companyNo: '123456',
          companyName: '上海灵娃',
          companyAllName: '上海灵娃科技有限公司',
          companyTel: '17621627757',
          companyAddress: '上海市静安区365号',
          companyDescription: '不赖',
          status: '启用',
          user: '张三',
          time: '2020-8-19'
        }
      ],
      dialogVisible: false,
      dialogType: 'new',
      form: {
        companyNo: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 20
      },

      listLoading: true,
      total: 10,
      tableData: [],
      tableHeader: [],
      isShow: true,
      parentMsg: this.$t('permission.importCompany')
    }
  },
  computed: {},
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.parentMsg = this.$t('permission.importCompany')
      this.setFormRules()
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
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
    handleBan(scope, status) {
      if (status === '启用') {
        this.$confirm(this.$t('permission.EnableInfo'), this.$t('permission.EnableTitle'), {
          confirmButtonText: this.$t('permission.Confirm'),
          cancelButtonText: this.$t('permission.Cancel'),
          type: 'success'
        })
          .then(async() => {
            this.$message({
              message: status + '成功',
              type: 'success'
            })
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        this.$confirm(this.$t('permission.DisableInfo'), this.$t('permission.DisableTitle'), {
          confirmButtonText: this.$t('permission.Confirm'),
          cancelButtonText: this.$t('permission.Cancel'),
          type: 'warning'
        })
          .then(async() => {
            this.$message({
              message: status + '成功',
              type: 'success'
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
      scope.row.status = status
      // this.$message({
      //   message: status + '成功',
      //   type: 'success'
      // })
      // scope.row.status = status
    },

    // 查询
    handleSearch() {
      this.form.page = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.form = {
        companyNo: '',
        fullName: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 20
      }
    },
    // 选择框
    tableKey() {},
    // 导出用户
    handleExport() {
      if (this.rolesList.length) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            this.$t('permission.companyNo'),
            this.$t('permission.companyName'),
            this.$t('permission.title'),
            this.$t('permission.department'),
            this.$t('permission.company'),
            this.$t('permission.description'),
            this.$t('permission.state'),
            this.$t('permission.user'),
            this.$t('permission.time')
          ]
          const filterVal = ['companyNo', 'name', 'title', 'department', 'company', 'description', 'state', 'user', 'time']
          const list = this.rolesList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data
          })
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
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
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    // 获取列表
    getList() {
      this.listLoading = false
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
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
      this.dialogVisible = true
    },
    // 编辑角色
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true

      this.$nextTick(() => {
        // set checked state of a node not affects its father and child nodess
      })
    },

    // 查看用户
    handleLook() {
      this.$router.push('../SystemManagement/lookUser')
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.role.imageUrl = URL.createObjectURL(file.raw)
    },
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
    handleDelete({ $index, row }) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        debugger
      } else {
        debugger
      }

      // const { description, key, name } = this.role
      this.dialogVisible = false
      if (this.role.companyNo === '') {
        this.$notify({
          title: 'warning',
          dangerouslyUseHTMLString: true,
          message: this.$t('permission.noInfo'),
          type: 'warning'
        })
        return
      } else {
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          // message: `
          //     <div>Role Key: ${key}</div>
          //     <div>Role Name: ${name}</div>
          //     <div>Description: ${description}</div>
          //   `,
          message: this.$t('permission.success'),
          type: 'success'
        })
      }
    }
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
