<template>
  <div class="app-container">
    <div class="heartSearch">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <div class="leftIpt">
              <el-form-item label="设备编号" prop="EquNum">
                <el-input v-model="ruleForm.EquNum" placeholder="请选择设备编号" readonly class="leftNum disActive" @focus="equBox" />
                <el-button type="primary" icon="el-icon-search" @click="handleAdd">维修历史</el-button>
              </el-form-item>
            </div>

            <el-form-item label="故障类型" prop="FaultCode"><el-input v-model="ruleForm.FaultCode" placeholder="故障类型" /></el-form-item>
            <el-form-item label="故障描述" prop="Description">
              <el-input v-model.trim="ruleForm.Description" placeholder="故障描述" type="textarea" resize="none" clearable />
            </el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="维修时间" prop="RepairDate"><el-input v-model="ruleForm.RepairDate" placeholder="维修时间" /></el-form-item>
            <el-form-item label="维修人员" prop="RepairUser"><el-input v-model="ruleForm.RepairUser" placeholder="维修人员" /></el-form-item>
            <el-form-item label="维修方法" prop="RepairMethod">
              <el-input v-model.trim="ruleForm.RepairMethod" placeholder="维修方法" type="textarea" resize="none" clearable />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <div class="rightBtn"><el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增零件</el-button></div>

    <el-table
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="备件编号" width="200" prop="CustomerNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.EquCode" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="备件名称" width="200" prop="FullName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.SpareName" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="备件数量" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.SpareQty" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="150" prop="Contact" sortable>
        <template slot-scope="scope">
          <el-input v-model="scope.row.SpareUnit" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" prop="Email" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Remark" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.index,scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-button icon="el-icon-s-tools" type="primary" style="float: left;margin-top: 20px;" @click="submitForm('ruleForm')">维修完成</el-button>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" />

    <!-- 设备编号弹窗 -->
    <equ-num
      :equ-show="equFormVisible"
      :equ-box-loading="equBoxLoading"
      :table-box-height="tableBoxHeight"
      :equ-data="equData"
      :pagination-search-equ="paginationSearchEqu"
      :equ-type-code-data="EquTypeCodeData"
      @equClose="equClose"
      @equClick="equClick"
      @handleSearchEqu="handleSearchEqu"
    />
  </div>

  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import EquNum from '@/components/EquNum' // 工序名称
import { GetValuePair, EquDataList } from '@/api/DeviceData'
const fixHeight = 380
const fixHeightBox = 350
export default {
  name: 'CustomerInformation',
  components: { Pagination, EquNum },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30
      },
      total: 10,
      equData: [], // 设备编号数组
      equFormVisible: false, // input设备编号弹窗
      equBoxLoading: false, // 设备编号loading
      EquTypeCodeData: [], // 设备类型数组
      paginationSearchEqu: {
        PageIndex: 1,
        PageSize: 10000,
        EquNum: undefined,
        EquName: undefined,
        EquTypeCode: undefined,
        ShowBanned: false
      },
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
      rules: {
        EquNum: [{ required: true, message: '请选择设备编号', trigger: 'blur' }],
        FaultCode: [{ required: true, message: '请选择故障类型', trigger: 'blur' }],
        RepairDate: [{ required: true, message: '请选择维修时间', trigger: 'blur' }],
        RepairUser: [{ required: true, message: '请选择维修人员', trigger: 'blur' }],
        Description: [{ required: true, message: '请输入故障描述', trigger: 'blur' }],
        RepairMethod: [{ required: true, message: '请输入维修方法', trigger: 'blur' }]
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

    // input禁止输入中文
    'this.tableData.EquNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.tableData.EquNum = this.filterInput(val)
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
    // Mock: get all routes and roles list from server
    // 设备类型下拉
    GetValuePair().then(res => {
      if (res.IsPass === true) {
        this.EquTypeCodeData = res.Obj
      }
    })
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
        EquNum: [{ required: true, message: '请选择设备编号', trigger: 'blur' }],
        FaultCode: [{ required: true, message: '请选择故障类型', trigger: 'blur' }],
        RepairDate: [{ required: true, message: '请选择维修时间', trigger: 'blur' }],
        RepairUser: [{ required: true, message: '请选择维修人员', trigger: 'blur' }],
        Description: [{ required: true, message: '请输入故障描述', trigger: 'blur' }],
        RepairMethod: [{ required: true, message: '请输入维修方法', trigger: 'blur' }],
        FullName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }]
      }
    },

    // 新增零件
    handleAdd() {
      // 添加行数
      var newValue = {
        EquCode: '',
        SpareName: '',
        SpareUnit: '',
        SpareQty: '',
        Remark: ''
      }

      // 添加新的行数
      this.tableData.push(newValue)
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger
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

    // 删除
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
    },

    // 设备编号弹窗
    equBox() {
      this.equFormVisible = true
      this.equBoxLoading = true
      EquDataList(this.paginationSearchEqu).then(res => {
        if (res.IsPass === true) {
          this.equData = res.Obj
          this.equBoxLoading = false
        }
      })
    },
    // 设备编号弹窗搜索
    handleSearchEqu() {
      this.paginationSearchEqu.PageIndex = 1
      this.equBox()
    },
    // 设备编号双击事件获取当前行的值
    equClick(row) {
      debugger
      this.$set(this.ruleForm, 'EquNum', row.EquNum)
      this.ruleForm.EquNum = row.EquNum
      this.equFormVisible = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 关闭设备编号查询弹窗
    equClose() {
      this.equFormVisible = false
    }

  }
}
</script>

<style lang="scss" scoped></style>
