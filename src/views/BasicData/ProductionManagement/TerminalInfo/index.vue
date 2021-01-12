<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6" style="display: none;">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="公司名称" placement="top-start"><label class="radio-label">公司名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrgCode" placeholder="公司名称" style="width: 100%" @change="changeName">
              <el-option v-for="item in companyData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工作中心" placement="top-start"><label class="radio-label">工作中心:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-cascader v-model="pagination.CascadeArray" :options="allSubCatList" :props="optionProps" style="width: 100%" placeholder="正确格式为:车间/产线/中心" clearable />
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工位编号" placement="top-start"><label class="radio-label">工位编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.TerminalNum" placeholder="工位编号" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工位名称" placement="top-start"><label class="radio-label">工位名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.TerminalName" placeholder="工位名称" clearable /></el-col>
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

    <div class="rightBtn"><el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button></div>

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

      <el-table-column align="center" label="工位编号" width="150" prop="TerminalNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工位名称" width="150" prop="TerminalName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作中心名称" width="150" prop="WorkCenterName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WorkCenterName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属产线" width="150" prop="LineName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LineName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属车间" width="150" prop="WorkshopName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WorkshopName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属工序" width="150" prop="ProcessName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="100" prop="Status" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUserName" sortable>
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

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogType === 'edit' ? '编辑' : '新增'">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="工位编号" prop="TerminalNum">
          <el-input v-model.trim="ruleForm.TerminalNum" placeholder="工位编号" clearable />
        </el-form-item>
        <el-form-item label="工位名称" prop="TerminalName"><el-input v-model.trim="ruleForm.TerminalName" placeholder="工位名称" clearable /></el-form-item>

        <el-form-item label="公司名称" prop="OrgName" style="display: none;">
          <el-select v-model="ruleForm.OrgName" placeholder="请选择" style="width: 100%" clearable @change="changeName">
            <el-option v-for="item in companyData" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="所属工作中心" prop="CascadeArray">
          <el-cascader v-model="ruleForm.CascadeArray" :options="allSubCatList" :props="optionProps" style="width: 100%" placeholder="正确格式为:车间/产线/中心" clearable />
        </el-form-item>
        <!-- <el-form-item label="所属工序" prop="ProcessName"><el-input v-model="ruleForm.ProcessName" placeholder="请输入选择" clearable @input="workingBox" /></el-form-item> -->
        <el-form-item label="所属工序" prop="ProcessName">
          <el-input v-model="ruleForm.ProcessName" readonly placeholder="请选择" class="disActive" @focus="workingBox" />
        </el-form-item>

        <el-form-item label="描述"><el-input v-model.trim="ruleForm.Description" placeholder="描述" type="textarea" /></el-form-item>
        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 工序对应弹窗 -->
    <working-name
      :working-show="workingFormVisible"
      :working-box-loading="workingBoxLoading"
      :table-box-height="tableBoxHeight"
      :working-data="workingData"
      :pagination-search-working="paginationSearchWorking"
      @workingClose="workingClose"
      @workingClick="workingClick"
      @handleSearchWorking="handleSearchWorking"
    />
  </div>
</template>

<script>
import '../../../../styles/commentBox.scss'
import '../../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { stationList, stationDelete, stationAdd, stationModify, stationStatus, treeList, GetAuthOrganizationRange, BaseProList } from '@/api/BasicData'
import WorkingName from '@/components/WorkingName' // 工序名称
const fixHeight = 270
const fixHeightBox = 350
export default {
  name: 'TerminalInfo',
  components: { Pagination, WorkingName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        ProcessName: ''
      }, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        OrgCode: null,
        CascadeArray: [],
        TerminalNum: undefined,
        TerminalName: undefined,
        ShowBanned: false
      },
      // 工序搜索条件
      paginationSearchWorking: {
        PageIndex: 1,
        PageSize: 10000,
        ProcessNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      dialogType: 'new',
      companyVal: null, // 获取公司下拉值
      companyData: [], // 获取搜索框公司列表
      allSubCatList: [], // 获取工作中心级联数组
      workingData: [], // 工序数组
      workingBoxLoading: false, // 工序搜索loading
      workingFormVisible: false, // input工序名称弹窗
      optionProps: {
        value: 'value',
        label: 'label',
        children: 'children'
      }, // 格式化工单信息// 新增加产线级联
      rules: {
        TerminalNum: [{ required: true, message: '请输入工位编号', trigger: 'blur' }],
        TerminalName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }],
        OrgName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        CascadeArray: [{ required: true, message: '请输入工作中心', trigger: 'blur' }],
        ProcessName: [{ required: true, message: '请选择所属工序', trigger: 'blur' }]
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

    'ruleForm.TerminalNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.TerminalNum = this.filterInput(val)
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

    // 获取搜索公司下来
    GetAuthOrganizationRange().then(res => {
      if (res.IsPass === true) {
        this.companyData = res.Obj
        this.companyData.map((item, index) => {
          if (index === 0) {
            this.pagination.OrgCode = item.value
            this.companyVal = item.value
          }
        })
      }
    })

    // 获取新增产线名称级联
    treeList({ MinUnitType: 6 }).then(res => {
      this.allSubCatList = this.getTreeData(res.Obj[0].children)
    })

    this.getList()
    this.setFormRules()
  },
  mounted() {},
  methods: {
    // 分页
    table_index(index) {
      return (this.pagination.PageIndex - 1) * this.pagination.PageSize + index + 1
    },

    // 输入框禁止输入中文
    filterInput(val) {
      if (val === '') {
        return val
      } else {
        return val.replace(/[\u4e00-\u9fa5\s]/gi, '')
      }
    },
    // 表单验证切换中英文
    setFormRules: function() {
      this.rules = {
        TerminalNum: [{ required: true, message: '请输入工位编号', trigger: 'blur' }],
        TerminalName: [{ required: true, message: '请输入工位名称', trigger: 'blur' }],
        OrgName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        CascadeArray: [{ required: true, message: '请输入工作中心', trigger: 'blur' }],
        ProcessName: [{ required: true, message: '请选择所属工序', trigger: 'blur' }]
      }
    },

    // 公司下拉获取值
    changeName(val) {
      this.companyVal = val
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
          TerminalCode: row.TerminalCode
        }
        stationStatus(params).then(res => {
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
      stationList(this.pagination).then(res => {
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

    // 增加工位
    handleAdd() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {
        OrgName: this.companyVal
      }
    },

    // 获取新增工作中心名称级联
    getTreeData(data) {
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
    // 编辑工位
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 删除工位
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          stationDelete({ TerminalCode: row.TerminalCode }).then(res => {
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
            params.OrgCode = this.companyVal
            stationModify(params).then(res => {
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
            const params = this.ruleForm
            params.OrgCode = this.companyVal
            stationAdd(params).then(res => {
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

    // 工序聚焦事件原料弹窗
    workingBox() {
      this.workingFormVisible = true
      this.workingBoxLoading = true
      BaseProList(this.paginationSearchWorking).then(res => {
        if (res.IsPass === true) {
          this.workingData = res.Obj
          this.workingBoxLoading = false
        }
      })
    },
    // 工序弹窗搜索
    handleSearchWorking() {
      this.paginationSearchWorking.PageIndex = 1
      this.workingBox()
    },
    // 增加工序名称双击事件获取当前行的值
    workingClick(row) {
      console.log('row', row)
      this.ruleForm.ProcessCode = row.ProcessCode
      this.$set(this.ruleForm, 'ProcessName', row.Name)
      // this.ruleForm.ProcessName = row.Name
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.workingFormVisible = false
    },
    // 关闭工序名称查询弹窗
    workingClose() {
      this.workingFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
