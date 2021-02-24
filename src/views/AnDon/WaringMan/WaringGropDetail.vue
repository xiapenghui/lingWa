<template>
  <div class="app-container">
    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addUser') }}</el-button>
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

      <el-table-column align="center" label="员工编号" width="180" prop="UserJobNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UserJobNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="员工名称" width="180" prop="UserNameCN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UserNameCN }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分组编号" width="180" prop="GroupNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分组名称" width="180" prop="GroupName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" prop="Remark" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" prop="name" sortable width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">

        <el-form-item label="编号code" style="display: none;"><el-input v-model.trim="ruleForm.GroupCode" /></el-form-item>
        <el-form-item label="分组编号" prop="GroupNum"><el-input v-model.trim="ruleForm.GroupNum" :disabled="true" /></el-form-item>

        <el-form-item label="分组名称" prop="GroupName"><el-input v-model.trim="ruleForm.GroupName" :disabled="true" /></el-form-item>

        <el-form-item label="员工编号" prop="UserJobNum">
          <el-input v-model.trim="ruleForm.UserJobNum" placeholder="员工编号" class="disActive" @focus="personBox()" />
        </el-form-item>

        <el-form-item label="员工名称" prop="UserNameCN"><el-input v-model.trim="ruleForm.UserNameCN" placeholder="员工名称" :disabled="true" /></el-form-item>

        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 人员信息弹窗 -->
    <person-name
      :person-show="personFormVisible"
      :person-box-loading="personBoxLoading"
      :table-box-height="tableBoxHeight"
      :person-data="personData"
      :pagination-search-person="paginationSearchPerson"
      :log-total="logTotal"
      @personClose="personClose"
      @personClick="personClick"
      @handleSearchPerson="handleSearchPerson"
      @pageChange="getLogList"
    />
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Bus from '@/api/bus.js'
import PersonName from '@/components/PersonName' //  工位信息
import { PerList } from '@/api/BasicData'
import { AdnGroupUserList, AdnGroupUserAdd, AdnGroupUserDelete, AdnGroupUserModify } from '@/api/Andon'
const fixHeight = 190
const fixHeightBox = 350
export default {
  name: 'UserMangement',
  components: { Pagination, PersonName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        GroupNum: '',
        GroupName: '',
        GroupCode: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30
      },
      // 人员信息搜索条件
      paginationSearchPerson: {
        PageIndex: 1,
        PageSize: 30,
        JobNum: undefined,
        NameCN: undefined
      },

      GroupCode: this.$route.query.GroupCode,
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 0,
      logTotal: 0,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      personData: [], // 人员信息数组
      personBoxLoading: false, // 人员信息搜索loading
      personFormVisible: false, // input人员信息弹窗
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      rules: {
        UserJobNum: [{ required: true, message: '请选择员工编号', trigger: 'blur' }],
        UserNameCN: [{ required: true, message: '请选择员工名称', trigger: 'blur' }]
      },
      content1: this.$t('permission.userName'),
      content2: this.$t('permission.fullName'),
      content3: this.$t('permission.containInfo'),
      content4: this.$t('permission.company'),
      content5: this.$t('permission.department'),
      content6: this.$t('permission.password'),
      content7: this.$t('permission.passwords'),
      content8: this.$t('permission.roleUser'),
      content9: this.$t('permission.description')
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
      this.content1 = this.$t('permission.userName')
      this.content2 = this.$t('permission.fullName')
      this.content3 = this.$t('permission.containInfo')
      this.content4 = this.$t('permission.company')
      this.content5 = this.$t('permission.department')
      this.content6 = this.$t('permission.password')
      this.content7 = this.$t('permission.passwords')
      this.content8 = this.$t('permission.roleUser')
      this.content9 = this.$t('permission.description')
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
    // Mock: get all routes and roles list from server
    this.getList()
    this.setFormRules()

    // 监听详情页getList事件
    const self = this
    Bus.$on('getList', function() {
      self.getList()
    })
  },

  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        UserJobNum: [{ required: true, message: '请选择员工编号', trigger: 'blur' }],
        UserNameCN: [{ required: true, message: '请选择员工名称', trigger: 'blur' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      const params = {
        PageIndex: this.pagination.PageIndex,
        PageSize: this.pagination.PageSize,
        GroupCode: this.$route.query.GroupCode
      }
      AdnGroupUserList(params).then(res => {
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
      this.isPassword = true
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
      this.ruleForm.GroupNum = this.tableData[0].GroupNum
      this.ruleForm.GroupName = this.tableData[0].GroupName
      this.ruleForm.GroupCode = this.tableData[0].GroupCode
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.isPassword = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
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
            AdnGroupUserDelete({ RsCode: row.RsCode }).then(res => {
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
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            AdnGroupUserModify(this.ruleForm).then(res => {
              debugger
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
            AdnGroupUserAdd(this.ruleForm).then(res => {
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

    // 人员信息弹窗
    personBox() {
      this.personFormVisible = true
      this.personBoxLoading = true
      PerList(this.paginationSearchPerson).then(res => {
        if (res.IsPass === true) {
          this.personData = res.Obj
          this.logTotal = res.TotalRowCount
          this.personBoxLoading = false
        }
      })
    },
    // 人员信息搜索
    handleSearchPerson() {
      this.paginationSearchPerson.PageIndex = 1
      this.personBox()
    },
    // 增加人员信息双击事件获取当前行的值
    personClick(row) {
      this.$set(this.ruleForm, 'UserJobNum', row.JobNum)
      this.ruleForm.UserNameCN = row.NameCN
      this.ruleForm.UserCode = row.UserCode
      this.personFormVisible = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 人员弹窗分页
    getLogList(val) {
      this.paginationSearchPerson.PageIndex = val.current
      this.paginationSearchPerson.PageSize = val.size
      this.personBox()
    },
    // 关闭人员信息查询弹窗
    personClose() {
      this.personFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
