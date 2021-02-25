<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常名称" placement="top-start"><label class="radio-label">异常名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ExceptName" placeholder="异常名称" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="分组名称" placement="top-start"><label class="radio-label">分组名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.GroupName" placeholder="分组名称" clearable /></el-col>
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

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addMaterial') }}</el-button>
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

      <el-table-column align="center" label="异常编号" width="150" prop="ExceptNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常名称" width="150" prop="ExceptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分组编号" width="150" prop="GroupNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分组名称" width="150" prop="GroupName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable>
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip v-if="scope.row.Status == true" class="item" effect="dark" :enterable="false" content="禁用" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip v-if="scope.row.Status == false" class="item" effect="dark" :enterable="false" content="启用" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="分组编号" prop="GroupNum"><el-input v-model.trim="ruleForm.GroupNum" placeholder="分组编号" class="disActive" @focus="groupBox" /></el-form-item>
        <el-form-item label="分组名称" prop="GroupName"><el-input v-model.trim="ruleForm.GroupName" placeholder="分组名称" :disabled="true" /></el-form-item>
        <el-form-item label="异常编号" prop="ExceptNum"><el-input v-model.trim="ruleForm.ExceptNum" placeholder="异常编号" class="disActive" @focus="waringBox" /></el-form-item>
        <el-form-item label="异常名称" prop="ExceptName"><el-input v-model.trim="ruleForm.ExceptName" placeholder="异常名称" :disabled="true" /></el-form-item>
        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" clearable /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 异常发送组弹窗 -->
    <group-name
      :group-show="groupFormVisible"
      :group-box-loading="groupBoxLoading"
      :table-box-height="tableBoxHeight"
      :group-data="groupData"
      :pagination-search-group="paginationSearchGroup"
      :log-total="logTotal"
      @groupClose="groupClose"
      @groupClick="groupClick"
      @handleSearchGroup="handleSearchGroup"
      @pageChange="getLogList"
    />

    <!-- 异常明细弹窗 -->
    <waring-name
      :waring-show="waringFormVisible"
      :waring-box-loading="waringBoxLoading"
      :except-type-data="ExceptTypeData"
      :table-box-height="tableBoxHeight"
      :waring-data="waringData"
      :pagination-search-waring="paginationSearchWaring"
      :log-total="logTotal2"
      @waringClose="waringClose"
      @waringClick="waringClick"
      @handleSearchWaring="handleSearchWaring"
      @pageChange="getLogList2"
    />
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import GroupName from '@/components/GroupName' //  异常发送组
import WaringName from '@/components/WaringName' //  异常发送组
import { GetDictionary } from '@/api/BasicData'
import { AdnGroupList, AdnSendList, AnList, AdnSendDelete, AdnSendAdd, AdnSendModify, AdnSendModifyStatus } from '@/api/Andon'
const fixHeight = 260
const fixHeightBox = 350
export default {
  name: 'MaterialInformation',
  components: { Pagination, GroupName, WaringName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        ExceptName: undefined,
        GroupName: undefined,
        ShowBanned: false
      },

      // 异常发送组搜索条件
      paginationSearchGroup: {
        PageIndex: 1,
        PageSize: 30,
        GroupNum: undefined,
        GroupName: undefined,
        ShowBanned: false
      },

      // 异常明细搜索条件
      paginationSearchWaring: {
        PageIndex: 1,
        PageSize: 30,
        ExceptNum: undefined,
        ExceptName: undefined,
        ExceptType: undefined,
        ShowBanned: false
      },

      listLoading: false,
      editLoading: false, // 编辑loading
      total: 0,
      logTotal: 0,
      logTotal2: 0,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      addShow: true, // 继续新增
      groupData: [], // 异常分组数组
      groupBoxLoading: false, // 异常分组搜索loading
      groupFormVisible: false, // input异常分组名称弹窗
      waringData: [], // 异常明细数组
      waringBoxLoading: false, // 异常明细搜索loading
      waringFormVisible: false, // input异常明细弹窗
      ExceptTypeData: [], // 异常类型下拉
      rules: {
        GroupNum: [{ required: true, message: '请输入异常编号', trigger: 'blur' }],
        GroupName: [{ required: true, message: '请输入异常名称', trigger: 'blur' }],
        ExceptNum: [{ required: true, message: '请选择异常编号', trigger: 'blur' }],
        ExceptName: [{ required: true, message: '请输入异常名称', trigger: 'blur' }]
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

    // 异常类型下拉
    GetDictionary({ code: '0036' }).then(res => {
      if (res.IsPass === true) {
        this.ExceptTypeData = res.Obj
      }
    })

    this.getList()
    this.setFormRules()
  },
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        GroupNum: [{ required: true, message: '请输入异常编号', trigger: 'blur' }],
        GroupName: [{ required: true, message: '请输入异常名称', trigger: 'blur' }],
        ExceptNum: [{ required: true, message: '请选择异常编号', trigger: 'blur' }],
        ExceptName: [{ required: true, message: '请输入异常名称', trigger: 'blur' }]
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
          RsCode: row.RsCode
        }
        AdnSendModifyStatus(params).then(res => {
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
      AdnSendList(this.pagination).then(res => {
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
      this.dialogFormVisible = true
      this.addShow = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {}
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.addShow = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          AdnSendDelete({ RsCode: row.RsCode }).then(res => {
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
            AdnSendModify(this.ruleForm).then(res => {
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
            AdnSendAdd(this.ruleForm).then(res => {
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

    // 继续新增
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          AdnSendAdd(this.ruleForm).then(res => {
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
            this.editLoading = false
          })
          this.handleAdd()
        }
      })
    },

    // 异常发送组弹窗
    groupBox() {
      this.groupFormVisible = true
      this.groupBoxLoading = true
      AdnGroupList(this.paginationSearchGroup).then(res => {
        if (res.IsPass === true) {
          this.groupData = res.Obj
          this.logTotal = res.TotalRowCount
          this.groupBoxLoading = false
        }
      })
    },
    // 异常发送组搜索
    handleSearchGroup() {
      this.paginationSearchGroup.PageIndex = 1
      this.groupBox()
    },
    // 增加异常发送组双击事件获取当前行的值
    groupClick(row) {
      this.$set(this.ruleForm, 'GroupNum', row.GroupNum)
      this.ruleForm.GroupName = row.GroupName
      this.ruleForm.GroupCode = row.GroupCode
      this.groupFormVisible = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },

    // 异常发送弹窗分页
    getLogList(val) {
      this.paginationSearchGroup.PageIndex = val.current
      this.paginationSearchGroup.PageSize = val.size
      this.groupBox()
    },

    // 关闭异常发送组查询弹窗
    groupClose() {
      this.groupFormVisible = false
    },

    // 异常明细弹窗
    waringBox() {
      this.waringFormVisible = true
      this.waringBoxLoading = true
      AnList(this.paginationSearchWaring).then(res => {
        if (res.IsPass === true) {
          this.waringData = res.Obj
          this.logTotal2 = res.TotalRowCount
          this.waringBoxLoading = false
        }
      })
    },
    // 异常明细搜索
    handleSearchWaring() {
      debugger
      this.paginationSearchWaring.PageIndex = 1
      this.waringBox()
    },
    // 增加异常明细双击事件获取当前行的值
    waringClick(row) {
      this.$set(this.ruleForm, 'ExceptNum', row.ExceptNum)
      this.ruleForm.ExceptName = row.ExceptName
      this.ruleForm.ExceptCode = row.ExceptCode
      this.waringFormVisible = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },

    // 异常明细弹窗分页
    getLogList2(val) {
      this.paginationSearchWaring.PageIndex = val.current
      this.paginationSearchWaring.PageSize = val.size
      this.waringBox()
    },

    // 关闭异常明细查询弹窗
    waringClose() {
      this.waringFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
