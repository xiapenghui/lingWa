<template>
  <div v-loading="formLoading" class="app-container">
    <div class="heartSearch">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <div class="leftIpt">
              <el-form-item label="设备编号" prop="EquNum">
                <el-input v-model="ruleForm.EquNum" placeholder="请选择设备编号" readonly class="leftNum disActive" @focus="equBox" />
                <el-button type="primary" icon="el-icon-search" @click="handleHistory">维修历史</el-button>
              </el-form-item>
            </div>

            <el-form-item label="故障类型" prop="FaultCode">
              <el-select v-model="ruleForm.FaultCode" placeholder="故障类型" clearable style="width: 100%">
                <el-option v-for="item in FaultData" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="故障描述" prop="Description">
              <el-input v-model.trim="ruleForm.Description" placeholder="故障描述" type="textarea" resize="none" clearable />
            </el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="维修时间" prop="RepairDate">
              <el-date-picker v-model="ruleForm.RepairDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>

            <el-form-item label="维修人员" prop="RepairUser">
              <el-select v-model="ruleForm.RepairUser" placeholder="维修人员" clearable style="width: 100%">
                <el-option v-for="item in RepairUserData" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

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
      <el-table-column align="center" label="行号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="备件编号" width="200" prop="RowCode" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RowCode }}
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="备件名称" width="200" prop="SpareName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.SpareName" sortable />
        </template>
      </el-table-column>

      <el-table-column align="center" label="备件数量" width="150" prop="SpareQty" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.SpareQty" sortable />
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="150" prop="SpareUnit" sortable>
        <template slot-scope="scope">
          <!-- <el-input v-model="scope.row.SpareUnit" /> -->
          <el-select v-model="scope.row.SpareUnit" clearable>
            <el-option v-for="item in UnitTextList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>

        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Remark" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.index, scope.row)" />
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
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import EquNum from '@/components/EquNum' // 工序名称
import { GetDictionary } from '@/api/BasicData'
// import { GetValuePair, EquDataList, EquRpAdd, EquRpAdd2 } from '@/api/DeviceData'
import { GetValuePair, EquDataList, Add_Union } from '@/api/DeviceData'
import Bus from '@/api/bus.js'
const fixHeight = 380
const fixHeightBox = 350
export default {
  name: 'MainManage',
  components: { Pagination, EquNum },
  data() {
    return {
      tableData: [],
      ruleForm: {
        EquNum: '',
        FaultCode: '',
        RepairUser: '123',
        Description: '',
        RepairDate: '',
        RepairMethod: ''
      },
      // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30
      },
      total: 10,
      equData: [], // 设备编号数组
      equFormVisible: false, // input设备编号弹窗
      equBoxLoading: false, // 设备编号loading
      formLoading: false, // form表单loading
      EquTypeCodeData: [], // 设备类型数组
      FaultData: [], // 故障类型数组
      RepairUserData: [], // 维修人员数组
      newEquCode: null, // 获取设备编号回传Code
      UnitTextList: [], // 获取新增页面单位下拉
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

    // 故障类型下拉
    GetDictionary({ code: '0031' }).then(res => {
      if (res.IsPass === true) {
        this.FaultData = res.Obj
      }
    })

    // 单位下拉
    GetDictionary({ code: '0021' }).then(res => {
      if (res.IsPass === true) {
        this.UnitTextList = res.Obj
      }
    })

    this.setFormRules()
  },
  mounted() {},
  methods: {
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
        EquCode: this.newEquCode,
        TaskNum: '00',
        SpareName: '',
        SpareUnit: '',
        SpareQty: '',
        Remark: ''
      }
      // 添加新的行数
      this.tableData.push(newValue)
    },

    // 编辑成功
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       const params = this.ruleForm
    //       params.EquCode = this.newEquCode
    //       EquRpAdd(params).then(res => {
    //         this.formLoading = true
    //         if (res.IsPass === true) {
    //           this.$message({
    //             type: 'success',
    //             message: '新增设备成功'
    //           })
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             message: res.MSG
    //           })
    //         }
    //         this.formLoading = false
    //       })
    //       const self = this
    //       if (self.tableData.length <= 0) {
    //         return
    //       } else {
    //         EquRpAdd2(this.tableData).then(res => {
    //           this.tableLoading = true
    //           if (res.IsPass === true) {
    //             const self = this
    //             setTimeout(function() {
    //               self.$message({
    //                 type: 'success',
    //                 message: '新增零件成功'
    //               })
    //             }, 2000)
    //           } else {
    //             const self = this
    //             setTimeout(function() {
    //               self.$message({
    //                 type: 'error',
    //                 message: res.MSG
    //               })
    //             }, 2000)
    //           }
    //           this.tableLoading = false
    //         })
    //       }
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '必填项不能为空'
    //       })
    //       return false
    //     }
    //   })
    // },

    // 编辑成功
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.ruleForm
          params.EquCode = this.newEquCode
          params.Li = this.tableData
          Add_Union(params).then(res => {
            this.formLoading = true
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.MSG
              })
            }
            this.formLoading = false
          })
        } else {
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

    handleHistory() {
      if (this.ruleForm.EquNum === '') {
        this.$message({
          message: '请选择设备编号！',
          type: 'warning'
        })
      } else {
        this.$router.push({
          path: '/DeviceManage/MainDetail',
          query: {
            EquCode: this.newEquCode,
            EquNum: this.ruleForm.EquNum
          }
        })
        Bus.$emit('mainList')
      }
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
      this.$set(this.ruleForm, 'EquNum', row.EquNum)
      this.ruleForm.EquNum = row.EquNum
      this.newEquCode = row.EquCode
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
