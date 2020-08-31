<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <label class="radio-label">{{ $t('permission.title') }}:</label>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.title" :placeholder="$t('permission.title')" /></el-col>
        </el-col>
      </el-row>
      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddRole">{{ $t('permission.addRole') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%;" border>
      <el-table-column align="center" :label="$t('permission.name')" width="150">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="name" sortable>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150">
        <!-- <template slot-scope="scope">
          {{ scope.row.name }}
        </template> -->
      </el-table-column>

      <el-table-column align="header-center" :label="$t('permission.description')">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.operations')">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('permission.editPermission') }}</el-button>
          <el-button type="info" size="small" @click="handleCoply(scope)">{{ $t('permission.coplyPermission') }}</el-button>
          <el-button type="warning" size="small" @click="handleLook(scope)">{{ $t('permission.lookPermission') }}</el-button>
          <el-button v-if="scope.row.status == '启用'" type="success" size="small" @click="handleBan(scope, '启用')">{{ $t('permission.handleEnable') }}</el-button>
          <el-button v-else type="danger" size="small" @click="handleBan(scope, '禁用')">{{ $t('permission.handleBan') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('permission.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? $t('permission.editRole') : $t('permission.addRole')">
      <el-form :model="role" :rules="rules" label-width="100px" label-position="left">
        <el-form-item :label="$t('permission.name')" prop="name"><el-input v-model="role.name" :placeholder="$t('permission.name')" /></el-form-item>
        <el-form-item :label="$t('permission.description')">
          <el-input v-model="role.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" :placeholder="$t('permission.description')" />
        </el-form-item>
        <el-form-item :label="$t('permission.Menus')">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
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
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  components: { Pagination },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      listLoading: true,
      total: 10,
      isShow: true,
      listQuery: {
        title: undefined,
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.setFormRules()
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        name: [{ required: true, message: this.$t('permission.roleNameInfo') }]
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
      this.listQuery.page = 1
      this.getList()
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

    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      const routes = this.generateRoutes(res.data)
      this.routes = this.i18n(routes)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
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
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    // 增加角色
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    // 编辑角色
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    // 复制角色
    handleCoply() {},
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
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      // const { description, key, name } = this.role
      this.dialogVisible = false
      if (this.role.name === '') {
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
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped></style>
