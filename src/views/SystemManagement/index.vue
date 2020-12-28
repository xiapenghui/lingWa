<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.title') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.RoleName" :placeholder="$t('permission.titleInfo')" clearable /></el-col>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addRole') }}</el-button>
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
      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.name')" width="200" prop="RoleName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RoleName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status ===false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUser" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="200" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="header-center" :label="$t('permission.description')" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.operations')" width="250">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button v-show="scope.row.Keep == 0" type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row, 'edit', $t('permission.editRole'))" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="复制" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-star-on" plain @click="handleCoply(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="查看用户" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-view" plain @click="handleLook(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="禁用" placement="top-start">
            <el-button v-if="scope.row.Status == true" v-show="scope.row.Keep == 0" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="启用" placement="top-start">
            <el-button v-if="scope.row.Status == false" v-show="scope.row.Keep == 0" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button v-show="scope.row.Keep == 0" type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!-- 添加编辑菜单 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-tooltip class="item" effect="dark" :enterable="false" :content="content1" placement="top-start">
          <el-form-item :label="$t('permission.title')" prop="RoleName">
            <el-input v-model.trim="ruleForm.RoleName" :placeholder="$t('permission.title')" clearable /></el-form-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :enterable="false" :content="content2" placement="top-start">
          <el-form-item :label="$t('permission.DescriptionInfo')" prop="Description">
            <el-input v-model.trim="ruleForm.Description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" clearable :placeholder="$t('permission.DescriptionInfo')" />
          </el-form-item>
        </el-tooltip>

        <el-form-item :label="$t('permission.Menus')">
          <!-- <el-tree ref="tree" :data="routesData" node-key="MenuCode" :props="defaultProps" show-checkbox class="permission-tree" :default-expanded-keys="defaultShowNodes" /> -->
          <el-tree ref="tree" :data="routesData" node-key="Key" :props="defaultProps" show-checkbox class="permission-tree" :default-expanded-keys="defaultShowNodes" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 查看用户 -->
    <el-dialog
      title="列表"
      :visible.sync="dialogTableVisible"
    >
      <el-table
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="userData"
        :height="tableHeight"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >

        <el-table-column align="center" label="序号" width="50" fixed>
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('permission.fullName')" width="250" prop="NameCN" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.NameCN }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('permission.loginUser')" width="250" prop="AccountName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.AccountName }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('permission.company')" prop="OrgFullName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.OrgFullName }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('permission.department')" prop="DepFullName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.DepFullName }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import '../../styles/commentBox.scss'
import '../../styles/scrollbar.css'
import { ListRole, addRole, updateRole, deleteRole, ListMenuFunAll, ListUser, UpdateStatus, ListRoleMenuFun } from '@/api/role'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 260
export default {
  name: 'SystemManagement',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      routesData: [], // 权限菜单
      userData: [], //  查看用户
      defaultProps: {
        children: 'children',
        label: 'MenuTitle'
      },
      defaultShowNodes: [], // 这里存放要默认展开的节点 id
      ruleForm: {}, // 编辑弹窗
      logId: {}, // 查看用户行数据
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        RoleName: undefined
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      dialogTypeTitle: '',
      rules: {
        RoleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        Description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      content1: this.$t('permission.title'),
      content2: this.$t('permission.DescriptionInfo')
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
      this.content1 = this.$t('permission.title')
      this.content2 = this.$t('permission.DescriptionInfo')
      this.setFormRules()
    },
    routesData: {
      handler() {
        // 我这里默认展开一级, 指定几级就往里遍历几层取到 Key 就可以了
        this.routesData.forEach(item => {
          this.defaultShowNodes.push(item.Key)
        })
      },
      deep: true
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
    // this.getRoutes()
    this.getList()
    this.setFormRules()
  },
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        RoleName: [{ required: true, message: this.$t('permission.roleNameInfo') }],
        Description: [{ required: true, message: this.$t('permission.DescriptionInfo') }]
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
          RoleCode: row.RoleCode
        }
        UpdateStatus(params).then(res => {
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
    getList() {
      this.listLoading = true
      ListRole(this.pagination).then(res => {
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
      this.dialogTypeTitle = this.$t('permission.addRole')
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
      ListMenuFunAll({}).then(res => {
        if (res.IsPass === true) {
          newFn(res.Obj)
          function newFn(obj) {
            obj.map(item => {
              item.MenuTitle = item.ControlTitle === null ? item.MenuTitle : item.MenuTitle + '--' + '(' + item.ControlTitle + ')'
              // item.MenuCode = item.ControlCode === null ? item.MenuCode : item.MenuCode + '(' + item.ControlCode + ')'
              if (item.children && item.children.length) {
                newFn(item.children)
              }
            })
          }
          console.log('res.Obj', res.Obj)
          this.routesData = res.Obj
        }
      })
    },
    // 编辑角色
    handleEdit(row, type, typeTitle) {
      this.dialogType = type
      this.dialogTypeTitle = typeTitle
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
      ListRoleMenuFun({ RoleCode: row.RoleCode }).then(res => {
        if (res.IsPass === true) {
          // 重构代码MenuTitle、MenuCode
          newFn(res.Obj)
          function newFn(obj) {
            obj.map(item => {
              item.MenuTitle = item.ControlTitle === null ? item.MenuTitle : item.MenuTitle + '--' + '(' + item.ControlTitle + ')'
              // item.MenuCode = item.ControlCode === null ? item.MenuCode : item.MenuCode + '(' + item.ControlCode + ')'
              // item.MenuCode = item.ControlCode === null ? item.MenuCode : item.MenuCode + item.ControlCode
              if (item.children && item.children.length) {
                newFn(item.children)
              }
            })
          }

          // 已选择树节点进行选中效果
          this.routesData = res.Obj
          const data = []
          // 方法一
          this.fn(this.routesData, data)
          // 方法二
          // fn(this.routesData, data)
          // function fn(arr) {
          //   arr.map(item => {
          //     if (item.IsUse === '1') {
          //       if (item.children.length > 0) {
          //         fn(item.children)
          //       } else {
          //         data.push({
          //           MenuCode: item.MenuCode,
          //           MenuTitle: item.MenuTitle,
          //           ControlTitle: item.ControlTitle
          //         })
          //       }
          //     }
          //   })
          // }

          console.log('data', data)
          this.$nextTick(function() {
            this.$refs.tree.setCheckedNodes(data)
          })
        }
      })
    },
    fn(arr, data) {
      arr.map(item => {
        if (item.IsUse === '1') {
          if (item.children.length > 0) {
            this.fn(item.children, data)
          } else {
            data.push({
              Key: item.Key,
              MenuCode: item.MenuCode,
              MenuTitle: item.MenuTitle,
              ControlTitle: item.ControlTitle
            })
          }
        }
      })
      return data
    },
    // 编辑成功
    submitForm(formName) {
      // this.editLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const treeSelect = this.$refs.tree.getCheckedNodes(false, true)
          const newTreeSelect = []
          treeSelect.map(item => {
            if (item.ParentCode === '') {
              newTreeSelect.push({
                MenuTitle: item.MenuTitle,
                ControlCode: item.ControlCode,
                ControlTitle: item.ControlTitle,
                MenuCode: item.MenuCode,
                IsUse: '1',
                Key: item.Key,
                children: []
              })
            } else {
              newTreeSelect.map(child => {
                if (child.children) {
                  child.children.map(chi => {
                    if (item.ParentCode === chi.MenuCode) {
                      chi.children.push({
                        MenuTitle: item.MenuTitle,
                        ControlCode: item.ControlCode,
                        ControlTitle: item.ControlTitle,
                        MenuCode: item.MenuCode,
                        ParentCode: item.ParentCode,
                        Key: item.Key,
                        IsUse: '1'
                      })
                    }
                  })
                }
                if (item.ParentCode === child.MenuCode) {
                  child.children.push({
                    MenuTitle: item.MenuTitle,
                    ControlCode: item.ControlCode,
                    ControlTitle: item.ControlTitle,
                    MenuCode: item.MenuCode,
                    ParentCode: item.ParentCode,
                    IsUse: '1',
                    Key: item.Key,
                    children: []
                  })
                }
              })
            }
          })
          this.ruleForm.MenuFunList = newTreeSelect
          if (this.dialogType === 'edit') {
            updateRole(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
              this.editLoading = false
            })
          } else {
            addRole(this.ruleForm).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: res.MSG
                })
                this.dialogFormVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
              }
            })
            this.editLoading = false
            this.getList()
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

    // 复制角色
    handleCoply(row) {
      this.$confirm(this.$t('permission.cooplyInfo'), this.$t('permission.cooplyTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      }).then(() => {
        this.handleEdit(row, 'copy', this.$t('permission.copyRole'))
      })
    },
    // 查看用户
    handleLook(row) {
      this.logId = row
      ListUser(this.paginationLog, { RoleCode: row.RoleCode }).then(res => {
        if (res.TotalRowCount > 0) {
          this.dialogTableVisible = true
          this.userData = res.Obj
          this.logTotal = res.TotalRowCount
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无用户！')
        }
      })
    },

    // 删除角色
    handleDelete(row) {
      if (this.tableData.length > 0) {
        this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
          confirmButtonText: this.$t('permission.Confirm'),
          cancelButtonText: this.$t('permission.Cancel'),
          type: 'warning'
        })
          .then(() => {
            deleteRole({ RoleCode: row.RoleCode }).then(res => {
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
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
