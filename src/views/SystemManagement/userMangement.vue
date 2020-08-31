<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.userName') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="form.userName" :placeholder="$t('permission.userNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.fullName') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="form.fullName" :placeholder="$t('permission.fullNameInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <el-checkbox v-model="form.showReviewer" @change="tableKey">{{ $t('permission.containInfo') }}</el-checkbox>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.company') }}:</label>
          </el-col>
          <el-col :span="16">
            <el-select v-model="form.company" :placeholder="$t('permission.companyInfo')" clearable style="width: 100%">
              <el-option v-for="item in companyOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.department') }}:</label>
          </el-col>
          <el-col :span="16">
            <el-select v-model="form.department" :placeholder="$t('permission.departmentInfo')" clearable style="width: 100%">
              <el-option v-for="item in departmentOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.addUser') }}</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExportUser">{{ $t('permission.exportUser') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%" border>
      <el-table-column align="center" :label="$t('permission.userName')" width="150" fixed sortable prop="key">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.fullName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.title')" width="150">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.department')" width="150">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.company')" width="250">
        <template slot-scope="scope">
          {{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.description')" width="300">
        <template slot-scope="scope">
          {{ scope.row.description }}
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
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('permission.editUser') }}</el-button>
          <el-button type="warning" size="small" @click="handleLook(scope)">{{ $t('permission.lookPermission') }}</el-button>
          <el-button v-if="scope.row.status == '启用'" type="danger" size="small" @click="handleBan(scope, '禁用')">{{ $t('permission.handleBan') }}</el-button>
          <el-button v-else type="success" size="small" @click="handleBan(scope, '启用')">{{ $t('permission.handleEnable') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('permission.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? $t('permission.editUsers') : $t('permission.addUser')">
      <el-form :model="role" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('permission.userName')" prop="userName"><el-input v-model="role.userName" :placeholder="$t('permission.userNameInfo')" clearable /></el-form-item>
        <el-form-item :label="$t('permission.password')" prop="password"><el-input v-model="role.password" :placeholder="$t('permission.password')" clearable /></el-form-item>
        <el-form-item :label="$t('permission.passwords')" prop="passwords"><el-input v-model="role.passwords" :placeholder="$t('permission.passwords')" clearable /></el-form-item>
        <el-form-item :label="$t('permission.fullName')" prop="fullName"><el-input v-model="role.fullName" :placeholder="$t('permission.fullNameInfo')" clearable /></el-form-item>

        <el-form-item :label="$t('permission.roleUser')">
          <el-select v-model="role.roleUser" :placeholder="$t('permission.roleUserInfo')" clearable style="width: 100%">
            <el-option v-for="item in roleUserOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('permission.company')">
          <el-select v-model="role.company" :placeholder="$t('permission.companyInfo')" clearable style="width: 100%">
            <el-option v-for="item in companyOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('permission.department')">
          <el-select v-model="role.department" :placeholder="$t('permission.departmentInfo')" clearable style="width: 100%">
            <el-option v-for="item in departmentOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('permission.description')">
          <el-input v-model="role.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.description')" />
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
import '../../styles/commentBox.scss'
import '../../styles/scrollbar.css'
import { deleteRole } from '@/api/role'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      // role: Object.assign({}, defaultRole),
      role: {
        userName: '',
        password: '',
        passwords: '',
        fullName: '',
        roleUser: '',
        company: '',
        department: ''
      },
      routes: [],
      rolesList: [
        {
          userName: '管理员',
          fullName: '王小虎',
          title: '部长',
          department: '开发部',
          company: '上海灵娃技术有限公司',
          description: '拥有所有权限',
          status: '禁用',
          user: '张三',
          time: '2020-8-19'
        },
        {
          userName: '管理员',
          fullName: '王小虎',
          title: '部长',
          department: '开发部',
          company: '上海灵娃技术有限公司',
          description: '拥有所有权限',
          status: '开启',
          user: '夏鹏辉',
          time: '2020-8-19'
        }
      ],
      dialogVisible: false,
      dialogType: 'new',

      form: {
        userName: '',
        fullName: '',
        company: '',
        department: '',
        showReviewer: false,
        page: 1,
        limit: 20
      },
      companyOptions: ['上海中智浩云有限公司', '上海灵娃有限公司'],
      departmentOptions: ['研发部', '财务部'],
      roleUserOptions: ['管理员', '生产组长'],
      listLoading: true,
      total: 10
    }
  },
  computed: {},
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.setFormRules()
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()
    var getDate = this.$getDate
    console.log('getDate', getDate())
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        userName: [{ required: true, message: this.$t('permission.userNameInfo'), trigger: 'blur' }],
        password: [
          {
            required: true,
            message: this.$t('permission.passwordInfo'),
            trigger: 'blur'
          }
        ],
        passwords: [
          {
            required: true,
            message: this.$t('permission.passwordsInfo'),
            trigger: 'blur'
          }
        ],
        fullName: [
          {
            required: true,
            message: this.$t('permission.fullNamesInfo'),
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
        userName: '',
        fullName: '',
        company: '',
        department: '',
        showReviewer: false,
        page: 1,
        limit: 20
      }
    },
    // 选择框
    tableKey() {},
    // 导出用户
    handleExportUser() {
      if (this.rolesList.length) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            this.$t('permission.userName'),
            this.$t('permission.fullName'),
            this.$t('permission.title'),
            this.$t('permission.department'),
            this.$t('permission.company'),
            this.$t('permission.description'),
            this.$t('permission.state'),
            this.$t('permission.user'),
            this.$t('permission.time')
          ]
          const filterVal = ['userName', 'name', 'title', 'department', 'company', 'description', 'state', 'user', 'time']
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
    handleAddUser() {
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
        console.log(1)
      } else {
        debugger
        console.log('this.role', this.role)
      }

      // const { description, key, name } = this.role
      this.dialogVisible = false
      if (this.role.userName === '') {
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

<style lang="scss" scoped></style>
