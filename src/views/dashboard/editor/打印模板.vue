<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="模板编号" placement="top-start"><label class="radio-label">模板编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.TempNum" placeholder="模板编号" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="模板名称" placement="top-start"><label class="radio-label">模板名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.Name" placeholder="模板名称" clearable /></el-col>
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

      <el-table-column align="center" label="模板编号" width="150" prop="TempNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TempNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板路径" width="150" prop="Template" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Template }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板类型" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属公司" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" min-width="200" :show-overflow-tooltip="true">
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

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.editMaterial') : $t('permission.addMaterial')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="120px" label-position="left">
        <el-form-item label="模板编号" prop="TempNum"><el-input v-model.trim="ruleForm.TempNum" placeholder="模板编号" clearable /></el-form-item>
        <el-form-item label="模板名称" prop="Name"><el-input v-model.trim="ruleForm.Name" placeholder="模板名称" clearable /></el-form-item>
        <!-- <el-form-item label="模板路径" prop="Template"> -->
        <!-- <el-input v-model.trim="ruleForm.Template" placeholder="模板路径" clearable /> -->

        <el-form-item label="模板路径">
          <el-upload
            ref="uploadProduct"
            class="upload-demo"
            action="http://192.168.1.18:9000/WebAPI-Dev"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileListProduct"
            :on-success="onSuccess"
            :on-error="onError"
            :on-change="onChangeProduct"
            :before-remove="handleRemoveProduct"
            name="enterprise_product_file"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="模板类型"><el-input v-model.trim="ruleForm.TempType" placeholder="模板类型" clearable /></el-form-item>
        <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" clearable /></el-form-item>

        <div style="text-align:right;">
          <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
          <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">继续新增</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import '../../../styles/commentBox.scss'
import '../../../styles/scrollbar.css'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { BarList, BarDelete, BarAdd, BarModify } from '@/api/BasicData'
const fixHeight = 270
export default {
  name: 'MaterialInformation',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        TempNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      listLoading: false,
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      dialogTableVisible: false, // 查看用户弹出框
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogType: 'new',
      addShow: true, // 继续新增
      fileListProduct: [], // 上传附件
      rules: {
        TempNum: [{ required: true, message: '请输入模板编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        Template: [{ required: true, message: '请选择模板路径', trigger: 'blur' }]
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
    'ruleForm.TempNum': function(val) {
      if (val === '' || val === undefined) {
        return
      } else {
        this.ruleForm.TempNum = this.filterInput(val)
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

    this.getList()
    this.setFormRules()
  },
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
        TempNum: [{ required: true, message: '请输入模板编号', trigger: 'blur' }],
        Name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        Template: [{ required: true, message: '请选择模板路径', trigger: 'blur' }]
      }
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    getList() {
      this.listLoading = true
      BarList(this.pagination).then(res => {
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
          BarDelete({ TempCode: row.TempCode }).then(res => {
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
            BarModify(this.ruleForm).then(res => {
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
              this.addEnterprise()
              this.editLoading = false
            })
          } else {
            BarAdd(this.ruleForm).then(res => {
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
              this.addEnterprise()
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
          BarAdd(this.ruleForm).then(res => {
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

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onSuccess(files, fileList) {
      this.$parent.findAllEnterprise()
      this.$message({
        message: '成功',
        type: 'success'
      })
      this.handlerClose()
    },
    onError() {
      this.$message({
        message: '网络错误',
        type: 'warning'
      })
    },
    handleRemoveProduct(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).then(() => {
        // this.isUploadFileProduct = false
        this.fileListProduct.pop(file)
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    onChangeProduct(file, fileList) {
      debugger
      // console.log(file)
      if (/.(txt)$/.test(file.name)) {
        this.$message({
          message: '不允许上传以txt结尾的文件',
          type: 'warning'
        })
        this.$refs.uploadProduct.clearFiles()
        return
      }
      // 当选择好上传文件时，将这个文件的信息push到数组中去
      this.fileListProduct.push(file)
    },
    // 新增
    addEnterprise() {
      debugger
      // 将上传的文件附件转成二进制转给后台 this.form就是表单输入框的内容
      const formData = new FormData()
      Object.keys(this.ruleForm).forEach(key => {
        if (key === 'enterprise_product_file') {
          // 判断是否是产品概况的字段，是的话将刚刚push进fileListProduct转换成二进制给后台
          // 注意，需要的是写到raw，否则传给后端就是"[object, object]"
          formData.append(key, this.fileListProduct[0].raw)
        } else {
          // 若是表单中的字段，则直接append进去
          formData.append(key, this.ruleForm[key])
        }
      })
      // 调用vuex中的方法，将formData传给后端。此时上传的附件已经转换成二进制流
      this.addEnterpriseCustomers(formData)
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$parent.findAllEnterprise()
          this.handlerClose()
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '网络异常'
          })
        })
    },
    // 修改
    updateEnterprise() {
      const formData = new FormData()
      Object.keys(this.form).forEach(key => {
        if (key === 'enterprise_product_file' && this.fileListProduct.length !== 0) {
          formData.append(key, this.fileListProduct[0].raw)
        } else if (key === 'enterprise_introduct_file' && this.fileListIndoc.length !== 0) {
          formData.append(key, this.fileListIndoc[0].raw)
        } else {
          formData.append(key, this.form[key])
        }
      })
      const params = {
        id: this.form.enterprise_pk_id,
        form: formData
      }
      // delete params.form.enterprise_pk_id
      this.updateEnterpriseCustomers(params)
        .then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.handlerClose()
          this.$parent.findAllEnterprise()
        })
        .catch(() => {
          this.$message({
            message: '网络错误',
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
