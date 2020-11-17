<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.PlanNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.PlanNum" :placeholder="$t('permission.PlanNum')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.ProductNum" :placeholder="$t('permission.ProductNum')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.ProductName" :placeholder="$t('permission.ProductName')" /></el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="4">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.CreateTime') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="pagination.importDate"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
            <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
          </el-col>
        </el-col>
        <el-col :span="1">
          <el-button v-if="btnShow" class="btnSearchUP" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('0')" />
          <el-button v-else class="btnSearchDown" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('1')" />
        </el-col>
      </el-row>

      <el-row v-show="showSearch" :gutter="20" style="margin-top: 20px;">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.CustomerName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.CustomerFullName" :placeholder="$t('permission.CustomerName')" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.PlanTypeName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PlanType" :placeholder="$t('permission.PlanTypeName')" clearable style="width: 100%">
              <el-option v-for="item in PlanTypeNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content7" placement="top-start">
              <label class="radio-label">{{ $t('permission.StatusName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PlanStatus" :placeholder="$t('permission.StatusName')" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addPlan') }}</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">{{ $t('permission.exportPlan') }}</el-button>
      <el-button type="danger" icon="el-icon-remove-outline" @click="planFrozen">{{ $t('permission.planFrozen') }}</el-button>
      <el-button type="success" icon="el-icon-circle-check" @click="cancelFrozen">{{ $t('permission.cancelFrozen') }}</el-button>
      <el-button type="danger" icon="el-icon-remove-outline" @click="forceOver">{{ $t('permission.forceOver') }}</el-button>

      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importcompany') }}</el-button> -->
      <!-- <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" /> -->
    </div>

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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" fixed />
      <el-table-column align="center" :label="$t('permission.PlanNum')" width="150">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ProductNum')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ProductName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.PlanQuantity')" width="200">
        <template slot-scope="scope">
          {{ scope.row.PlanQuantity }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.SchedulingQuantity')" width="200">
        <template slot-scope="scope">
          {{ scope.row.SchedulingQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CompleteQuantity')" width="100">
        <template slot-scope="scope">
          {{ scope.row.CompleteQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CustomerName')" width="100">
        <template slot-scope="scope">
          {{ scope.row.CustomerName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleNum')" width="100">
        <template slot-scope="scope">
          {{ scope.row.SaleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleLineNum')" width="100">
        <template slot-scope="scope">
          {{ scope.row.SaleLineNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CustomerNum')" width="100">
        <template slot-scope="scope">
          {{ scope.row.CustomerNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.LastQuantity')" width="100">
        <template slot-scope="scope">
          {{ scope.row.LastQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CreateUser')" width="100">
        <template slot-scope="scope">
          {{ scope.row.CreateUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanTypeName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.PlanTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.StatusName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.StatusName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanDeliveryDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.PlanDeliveryDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanStartDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.PlanStartDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanEndDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.PlanEndDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RealStartDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.RealStartDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RealEndDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.RealEndDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CreateTime')" width="200">
        <template slot-scope="scope">
          {{ scope.row.CreateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="250">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="关联工单" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-link" plain @click="handleRelation(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="BOM" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-tickets" plain @click="handleBOM(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="工艺路线" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-s-operation" plain @click="handleLine(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="计划拆分" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-edit" plain @click="planOpen(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon=" el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <!--  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.EditProduction') : $t('permission.addProductiony')"
    > -->

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <el-form-item :label="$t('permission.PlanNum')" prop="PlanNum" :rules="[{ required: isAlarmItem, message: '请输入生产计划单号', trigger: 'blur' }]">
                <el-input v-model="ruleForm.PlanNum" :placeholder="$t('permission.PlanNum')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <!--
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <el-form-item :label="$t('permission.PlanTypeName')" prop="PlanTypeName" :rules="[{ required: isAlarmItem, message: '请输入生产计划类型', trigger: 'blur' }]">
                <el-input v-model="ruleForm.PlanTypeName" :placeholder="$t('permission.PlanTypeName')" />
              </el-form-item>
            </el-tooltip> -->

            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <el-form-item :label="$t('permission.PlanTypeName')" prop="PlanTypeName" :rules="[{ required: isAlarmItem, message: '请输入生产计划类型', trigger: 'change' }]">
                <el-radio-group v-model="ruleForm.PlanTypeName">
                  <el-radio v-for="item in isGive" :key="item.value" :label="item.text">{{ item.text }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="计划数量" placement="top-start">
              <el-form-item :label="$t('permission.PlanQuantity')" prop="PlanQuantity" :rules="[{ required: isAlarmItem, message: '请输入计划数量', trigger: 'blur' }]">
                <el-input v-model="ruleForm.PlanQuantity" :placeholder="$t('permission.PlanQuantity')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="可拆分数量" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.SchedulingQuantityOther')" prop="SchedulingQuantityOther">
                <el-input v-model="ruleForm.SchedulingQuantityOther" :placeholder="$t('permission.SchedulingQuantityOther')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="拆分数量" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.splitNumOther')" prop="splitNumOther">
                <el-input v-model="ruleForm.splitNumOther" :placeholder="$t('permission.splitNumOther')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="销售单号" placement="top-start">
              <el-form-item v-if="planAdd" :label="$t('permission.SaleNum')"><el-input v-model="ruleForm.SaleNum" :placeholder="$t('permission.SaleNum')" /></el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="计划开始日期" placement="top-start">
              <el-form-item :label="$t('permission.PlanStartDate')" prop="PlanStartDate" :rules="[{ required: isAlarmItem, message: '请输入计划开始日期', trigger: 'blur' }]">
                <el-date-picker v-model="ruleForm.PlanStartDate" type="datetime" placeholder="选择日期" />
              </el-form-item>
            </el-tooltip>
          </div>
          <div class="boxRight">
            <el-tooltip class="item" effect="dark" content="成品名称" placement="top-start">
              <el-form-item :label="$t('permission.ProductName')" prop="ProductName" :rules="[{ required: isAlarmItem, message: '请输入成品名称', trigger: 'blur' }]">
                <el-input v-model="ruleForm.ProductName" :placeholder="$t('permission.ProductName')" :disabled="isDisabled" @focus="finshBox" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="客户名称" placement="top-start">
              <el-form-item :label="$t('permission.CustomerName')" prop="CustomerName">
                <el-input v-model="ruleForm.CustomerName" :placeholder="$t('permission.CustomerName')" :disabled="isDisabled" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="计划投入产线" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.ProductLineCode')" prop="ProductLineCode">
                <el-input v-model="ruleForm.ProductLineCode" :placeholder="$t('permission.ProductLineCode')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="优先级" placement="top-start">
              <el-form-item v-if="planShow" :label="$t('permission.Priority')" prop="Priority">
                <el-input v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="销售单行号" placement="top-start">
              <el-form-item v-if="planAdd" :label="$t('permission.SaleLineNum')" prop="ProductName">
                <el-input v-model="ruleForm.companyAllName" :placeholder="$t('permission.SaleLineNum')" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="计划发货日期" placement="top-start">
              <el-form-item v-if="planAdd" :label="$t('permission.PlanDeliveryDate')">
                <el-date-picker v-model="ruleForm.PlanDeliveryDate" type="datetime" placeholder="选择日期" />
              </el-form-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="计划完成日期" placement="top-start">
              <el-form-item :label="$t('permission.PlanEndDate')" prop="PlanEndDate" :rules="[{ required: isAlarmItem, message: '请输入计划完成日期', trigger: 'blur' }]">
                <el-date-picker v-model="ruleForm.PlanEndDate" type="datetime" placeholder="选择日期" />
              </el-form-item>
            </el-tooltip>
          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitForm('ruleForm')">{{ $t('permission.continueAdd') }}</el-button>
        <el-button v-if="splitShow" type="primary" @click="submitForm('ruleForm')">{{ $t('permission.continueSplit') }}</el-button>

        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 成品名称对应弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="finshFormVisible" title="成品名称" width="70%" height="50%">
      <div class="searchBox" style="margin-bottom: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-col :span="6">
              <el-tooltip class="item" effect="dark" content="成名编码" placement="top-start">
                <label class="radio-label">{{ $t('permission.ProductNum') }}:</label>
              </el-tooltip>
            </el-col>
            <el-col :span="16"><el-input v-model="paginationSearch.MaterialNum" /></el-col>
          </el-col>

          <el-col :span="8">
            <el-col :span="6">
              <el-tooltip class="item" effect="dark" content="成品名称" placement="top-start">
                <label class="radio-label">{{ $t('permission.ProductNane') }}:</label>
              </el-tooltip>
            </el-col>
            <el-col :span="16"><el-input v-model="paginationSearch.Name" /></el-col>
          </el-col>

          <el-col :span="4">
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-search" @click="handleSearchBox">{{ $t('permission.search') }}</el-button>
            </el-col>
          </el-col>
        </el-row>
      </div>

      <el-table
        v-loading="listBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
        :data="finshData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="成品编号" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="成品名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.Name }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="成品规格" width="150">
          <template slot-scope="scope">
            {{ scope.row.Spec }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.Describe }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="颜色" width="150">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工艺路线" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialType }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护者" width="150">
          <template slot-scope="scope">
            {{ scope.row.PlanNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
// import moment from 'moment'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { productionList, productionFreeze, productionUnFreeze, ForceComplete, GetDictionary, GetMaterialList, productionDelete, OrganAdd, OrganModify } from '@/api/OrganlMan'
// import { productionList, OrganAdd, OrganDelete, OrganModify } from '@/api/role'
const fixHeight = 270
const fixHeightBox = 350

export default {
  name: 'CompanyMaintenance',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      selectedData: [], // 批量选择新数组
      CreateTime: '',
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      isDisabled: false, // 拆分弹窗默认不能修改
      planShow: true, // 拆分弹窗默认可见字段
      planAdd: false, // 新增编辑弹窗默认可见字段
      addShow: true, // 继续添加仅新增可见
      splitShow: true, // 继续拆分仅拆分可见
      isAlarmItem: true, // 必填项可见不可见
      PlanTypeNameData: [], // 计划类型下拉框
      StatusNameData: [], // 计划状态下拉框
      finshData: [], // 弹窗数组
      isGive: [], // 弹窗计划类型radio数组
      pagination: {
        PageIndex: 1,
        PageSize: 10,
        importDate: [],
        PlanNum: undefined,
        ProductNum: undefined,
        ProductName: undefined,
        CustomerName: undefined,
        PlanTypeName: undefined,
        StatusName: undefined
      },
      paginationSearch: {
        PageIndex: 1,
        PageSize: 10,
        MaterialType: 1,
        MaterialNum: undefined,
        Name: undefined
      },
      listLoading: false,
      listBoxLoading: false, // 成品名称搜索loading
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      finshFormVisible: false, // input产成品弹窗
      dialogType: 'new',
      dialogTypeTitle: '',
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 表格高度
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      parentMsg: this.$t('permission.importCompany'),
      content1: this.$t('permission.PlanNum'),
      content2: this.$t('permission.ProductNum'),
      content3: this.$t('permission.ProductName'),
      content4: this.$t('permission.CreateTime'),
      content5: this.$t('permission.CustomerName'),
      content6: this.$t('permission.PlanTypeName'),
      content7: this.$t('permission.StatusName')
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
      this.parentMsg = this.$t('permission.importCompany')
      this.content1 = this.$t('permission.PlanNum')
      this.content2 = this.$t('permission.ProductNum')
      this.content3 = this.$t('permission.ProductName')
      this.content4 = this.$t('permission.CreateTime')
      this.content5 = this.$t('permission.CustomerName')
      this.content6 = this.$t('permission.PlanTypeName')
      this.content7 = this.$t('permission.StatusName')
    }
  },
  created() {
    // 搜索框初始化开始结束时间
    this.pagination.importDate[0] = this.$moment(new Date())
      .subtract(1, 'months')
      .format('YYYY-MM-DD 00:00:00')
    this.pagination.importDate[1] = this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')
    this.pagination.CreateStartDate = this.pagination.importDate[0]
    this.pagination.CreateEndDate = this.pagination.importDate[1]
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
        that.tableBoxHeight = window.innerHeight - fixHeightBox
      })()
    }

    GetDictionary({ code: '0008' }).then(res => {
      if (res.IsPass === true) {
        debugger
        this.PlanTypeNameData = res.Obj
        this.isGive = res.Obj
      }
    })
    GetDictionary({ code: '0016' }).then(res => {
      if (res.IsPass === true) {
        debugger
        this.StatusNameData = res.Obj
      }
    })
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    // 改变搜索框开始结束时间触发
    importChange(val) {
      this.pagination.importDate[0] = val[0]
      this.pagination.importDate[1] = val[1]
    },

    // 折叠按钮互斥
    toggle(status) {
      debugger
      if (status === '0') {
        this.tableHeight = '67vh'
      } else {
        this.tableHeight = '72vh'
      }
      this.btnShow = !this.btnShow
      this.showSearch = !this.showSearch
    },

    // 禁用，启用权限
    handleBan(scope, status) {},

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 重置
    handleReset() {},
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
    // 选择框
    tableKey() {},
    // 导出用户
    handleExport() {},
    // 导出用户
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 导入
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    // handleSuccess({ results, header }) {
    //   this.tableData = results
    //   this.tableHeader = header
    // },
    // 获取列表
    getList() {
      this.listLoading = true
      productionList(this.pagination).then(res => {
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

    // 增加
    handleAdd() {
      this.dialogTypeTitle = this.$t('permission.addProductiony')
      this.dialogFormVisible = true
      this.planAdd = true
      this.planShow = false
      this.isDisabled = false
      this.addShow = true
      this.splitShow = false
      this.isAlarmItem = true
      this.ruleForm = {}
    },
    // 编辑
    handleEdit(row) {
      this.dialogTypeTitle = this.$t('permission.EditProduction')
      this.dialogFormVisible = true
      this.planAdd = true
      this.planShow = false
      this.isDisabled = false
      this.splitShow = false
      this.addShow = false
      this.isAlarmItem = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            OrganModify(this.ruleForm).then(res => {
              debugger
              if (res.code === 200) {
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
            OrganAdd(this.ruleForm).then(res => {
              debugger
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              }
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
    // 关联工单
    handleRelation() {},
    // BOM
    handleBOM() {},
    // 查看工艺路线
    handleLine() {},

    // 删除按钮
    handleDelete(row) {
      debugger
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          productionDelete({ PlanCodes: [row.PlanCode] }).then(res => {
            debugger
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
    // 计划拆分
    planOpen() {
      this.dialogTypeTitle = this.$t('permission.splitProductiony')
      this.dialogFormVisible = true
      this.planAdd = false
      this.planShow = true
      this.isDisabled = true
      this.addShow = false
      this.splitShow = true
      this.isAlarmItem = false
    },
    // 计划冻结
    planFrozen() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.FrozenInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              const newFeatid = item.PlanCode
              idList.push(newFeatid)
            })
            productionFreeze({ PlanCodes: idList }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: res.MSG
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
              type: 'error',
              message: this.$t('table.operationError')
            })
          })
      }
    },
    // 取消冻结
    cancelFrozen() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.CancelInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              debugger
              const newFeatid = item.PlanCode
              idList.push(newFeatid)
            })
            productionUnFreeze({ PlanCodes: idList }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: res.MSG
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
              type: 'error',
              message: this.$t('table.operationError')
            })
          })
      }
    },
    // 强制完工
    forceOver() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.forceInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              debugger
              const newFeatid = item.PlanCode
              idList.push(newFeatid)
            })
            ForceComplete({ PlanCodes: idList }).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: res.MSG
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
              type: 'error',
              message: this.$t('table.operationError')
            })
          })
      }
    },
    // 编辑产成品弹窗
    finshBox() {
      this.finshFormVisible = true
      this.listBoxLoading = true
      GetMaterialList(this.paginationSearch).then(res => {
        if (res.IsPass === true) {
          this.finshData = res.Obj
          this.listBoxLoading = false
        }
      })
    },
    // 产成品弹窗搜索
    handleSearchBox() {
      this.pagination.PageIndex = 1
      this.finshBox()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .el-col-6 {
    height: 30px;
    line-height: 25px;
    text-align: right;
  }
}
</style>
