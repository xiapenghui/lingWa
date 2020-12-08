<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="公司名称" placement="top-start"><label class="radio-label">公司名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrgCode" placeholder="公司名称" clearable style="width: 100%" @change="FullNameVal">
              <el-option v-for="item in FullNameData" :key="item.OrgCode" :label="item.FullName" :value="item.OrgCode" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="工作中心编号" placement="top-start"><label class="radio-label">工作中心编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.WorkCenterNum" placeholder="工作中心编号" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="工作中心名称" placement="top-start"><label class="radio-label">工作中心名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.WorkCenterName" placeholder="工作中心名称" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="24">
            <el-tooltip class="item" effect="dark" content="包含禁状态的工作中心" placement="top-start">
              <el-checkbox v-model="pagination.ShowBanned">包含禁状态的工作中心</el-checkbox>
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

    <div class="rightBtn"><el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">新增</el-button></div>

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
      <el-table-column align="center" label="工作中心编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.WorkCenterNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作中心名称">
        <template slot-scope="scope">
          {{ scope.row.WorkCenterName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="产线编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.ParentCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="产线名称">
        <template slot-scope="scope">
          {{ scope.row.ParentName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="车间编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.WorkshopNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="车间名称">
        <template slot-scope="scope">
          {{ scope.row.WorkshopName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="公司编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.WorkshopNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司名称">
        <template slot-scope="scope">
          {{ scope.row.WorkshopName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作中心描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="150">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" size="small" icon=" el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="禁用" placement="top-start">
            <el-button v-if="scope.row.Status == true" type="danger" size="small" icon="el-icon-remove" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启用" placement="top-start">
            <el-button v-if="scope.row.Status == false" type="success" size="small" icon="el-icon-success" plain @click="handleBan(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑工作中心' : '增加工作中心'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="工作中心编号" prop="WorkCenterNum"><el-input v-model="ruleForm.WorkCenterNum" placeholder="工作中心编号" /></el-form-item>
        <el-form-item label="工作中心名称" prop="WorkCenterName"><el-input v-model="ruleForm.WorkCenterName" placeholder="工作中心名称" /></el-form-item>

        <!--        <el-form-item label="公司编号" prop="FactoryNum"><el-input v-model="ruleForm.FactoryNum" placeholder="公司编号" :disabled="true" /></el-form-item>
        <el-form-item label="公司名称" prop="FactoryName"><el-input v-model="ruleForm.FactoryName" placeholder="公司名称" :disabled="true" /></el-form-item> -->

        <el-form-item label="产线名称" prop="LineName">
          <el-cascader v-model="ruleForm.LineName" :options="allSubCatList" :props="optionProps" style="width: 100%" />
        </el-form-item>

        <el-form-item label="工作中心类别">
          <el-select v-model="pagination.WorkCenterType" placeholder="工作中心类别" style="width: 100%">
            <el-option v-for="item in CenterData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="工作中心描述"><el-input v-model="ruleForm.Description" placeholder="工作中心描述" type="textarea" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { WorkCenterList, WorkCenterDelete, WorkCenterAdd, WorkCenterModify, treeList, GetDictionary } from '@/api/BasicData'
const fixHeight = 270
export default {
  name: 'CenterInfo',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 50,
        WorkCenterNum: undefined,
        WorkCenterName: undefined,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      FullNameData: [], // 获取搜索框公司列表
      allSubCatList: [], // 获取产线级联数组
      CenterData: [], // 获取工作中心数组
      optionProps: {
        value: 'value',
        label: 'label',
        children: 'children'
      }, // 格式化工单信息// 新增加产线级联
      rules: {
        WorkCenterNum: [{ required: true, message: '请输入工作中心编号', trigger: 'blur' }],
        WorkCenterName: [{ required: true, message: '请输入工作中心名称', trigger: 'blur' }],
        FactoryNum: [{ required: true, message: '请输入公司编号', trigger: 'blur' }],
        FactoryName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        LineName: [{ required: true, message: '请选择产线名称', trigger: 'change' }]
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
    // 新增获取工作中心类别下拉
    GetDictionary({ code: '0007' }).then(res => {
      if (res.IsPass === true) {
        this.CenterData = res.Obj
      }
    })

    this.getList()
    this.setFormRules()
  },
  mounted() {},
  methods: {
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        WorkCenterNum: [{ required: true, message: '请输入工作中心编号', trigger: 'blur' }],
        WorkCenterName: [{ required: true, message: '请输入工作中心名称', trigger: 'blur' }],
        FactoryNum: [{ required: true, message: '请输入公司编号', trigger: 'blur' }],
        FactoryName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        LineName: [{ required: true, message: '请选择产线名称', trigger: 'change' }]
      }
    },

    // 公司下拉获取值
    FullNameVal(val) {
      debugger
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      WorkCenterList(this.pagination).then(res => {
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
      // 获取新增产线名称级联
      treeList({ MinUnitType: 5 }).then(res => {
        debugger
        this.allSubCatList = this.getTreeData(res.Obj[0].children)
      })
      this.ruleForm = {}
    },

    getTreeData(data) {
      debugger
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
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
          WorkCenterDelete({ FactoryCode: row.FactoryCode }).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: this.$t('table.deleteSuccess')
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
            WorkCenterModify(this.ruleForm).then(res => {
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
            WorkCenterAdd(this.ruleForm).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
