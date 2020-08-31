<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.serialNo') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="form.serialNo" :placeholder="$t('permission.serialInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.serialName') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="form.serialName" :placeholder="$t('permission.serialNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-checkbox v-model="form.showReviewer" @change="tableKey">{{ $t('permission.inclusionProhibition') }}</el-checkbox>
          </el-col>
        </el-col>
      </el-row>

      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addSerial') }}</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">{{ $t('permission.exportSerial') }}</el-button>
      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importserial') }}</el-button> -->
      <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" />
    </div>

    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%" border>
      <el-table-column align="center" :label="$t('permission.serialNo')" width="150" fixed sortable prop="key">
        <template slot-scope="scope">
          {{ scope.row.serialNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.serialName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.serialName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.serialIdentification')" width="300">
        <template slot-scope="scope">
          {{ scope.row.serialIdentification }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.serialCode')" width="300">
        <template slot-scope="scope">
          {{ scope.row.serialCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.serialDescription')" width="300">
        <template slot-scope="scope">
          {{ scope.row.serialDescription }}
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
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('permission.EditSerial') }}</el-button>
          <el-button type="warning" size="small" @click="handleLook(scope)">{{ $t('permission.lookPermission') }}</el-button>
          <el-button v-if="scope.row.status == '启用'" type="danger" size="small" @click="handleBan(scope, '禁用')">{{ $t('permission.handleSerial') }}</el-button>
          <el-button v-else type="success" size="small" @click="handleBan(scope, '启用')">{{ $t('permission.SpecificationsSerial') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('permission.deleteSerial') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="isShow" :data="tableData" border highlight-current-row><el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" /></el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? $t('permission.EditSerial') : $t('permission.addSerial')">
      <el-form :model="role" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('permission.serialNo')" prop="serialNo">
          <el-input v-model="role.serialNo" :placeholder="$t('permission.serialNo')" clearable />
        </el-form-item>

        <el-form-item :label="$t('permission.serialName')" prop="serialName">
          <el-input v-model="role.serialName" :placeholder="$t('permission.serialName')" clearable />
        </el-form-item>

        <el-form-item :label="$t('permission.serialIdentification')">
          <el-radio v-model="role.serialIdentification" label="1">{{ this.$t('permission.yes') }}</el-radio>
          <el-radio v-model="role.serialIdentification" label="2">{{ this.$t('permission.no') }}</el-radio>
        </el-form-item>

        <el-form-item :label="$t('permission.serialCode')">
          <el-input v-model="role.serialCode" :placeholder="$t('permission.serialCode')" clearable />
        </el-form-item>

        <el-form-item :label="$t('permission.serialDescription')">
          <el-input v-model="role.serialDescription" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.serialDescription')" />
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
        serialNo: '',
        serialName: '',
        serialIdentification: '1',
        serialCode: '',
        serialDescription: ''
      },
      routes: [],
      rolesList: [
        {
          serialNo: '123456',
          serialName: '熟料',
          serialDescription: '不错',
          serialIdentification: '是',
          serialCode: '代码',
          status: '禁用',
          user: '张三',
          time: '2020-8-19'
        }
      ],
      dialogVisible: false,
      dialogType: 'new',
      form: {
        serialNo: '',
        serialName: '',
        showReviewer: false,
        page: 1,
        limit: 20
      },

      listLoading: true,
      total: 10,
      tableData: [],
      tableHeader: [],
      isShow: true,
      parentMsg: this.$t('permission.importSerial')
    }
  },
  computed: {},
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.parentMsg = this.$t('permission.importSerial')
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
        serialName: [
          {
            required: true,
            message: this.$t('permission.serialNameInfo'),
            trigger: 'blur'
          }
        ]
      }
    },
    // 禁用，启用权限
    handleBan(scope, status) {
      this.$message({
        message: status + '成功',
        type: 'success'
      })
      scope.row.status = status
    },

    // 查询
    handleSearch() {
      this.form.page = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.form = {
        serialNo: '',
        serialName: '',
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
            this.$t('permission.serialNo'),
            this.$t('permission.serialName'),
            this.$t('permission.title'),
            this.$t('permission.department'),
            this.$t('permission.company'),
            this.$t('permission.description'),
            this.$t('permission.state'),
            this.$t('permission.user'),
            this.$t('permission.time')
          ]
          const filterVal = ['serialNo', 'name', 'title', 'department', 'company', 'description', 'state', 'user', 'time']
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
      if (this.role.serialNo === '') {
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
</style>
