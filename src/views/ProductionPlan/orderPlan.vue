<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="生产工单号" placement="top-start"><label class="radio-label">生产工单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.OrderNum" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductCode" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="成品名称" placement="top-start"><label class="radio-label">成品名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductName" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="客户名称" placement="top-start"><label class="radio-label">客户名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.CustomerName" clearable /></el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
        <el-col :span="1">
          <el-button v-if="btnShow" class="btnSearchUP" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('0')" />
          <el-button v-else class="btnSearchDown" type="primary" size="mini" icon="el-icon-d-arrow-left" circle @click="toggle('1')" />
        </el-col>
      </el-row>

      <el-row v-show="showSearch" :gutter="20" style="margin-top: 10px;">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="生产计划单号" placement="top-start"><label class="radio-label">生产计划单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.PlanCode" /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工单类型" placement="top-start"><label class="radio-label">工单类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrderType" clearable style="width: 100%">
              <el-option v-for="item in PlanTypeNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工单状态" placement="top-start"><label class="radio-label">工单状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.Status" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="维护时间" placement="top-start"><label class="radio-label">维护时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="pagination.importDate"
              style="width: 250px;"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="true"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">导出</el-button>
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
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生产计划单号" width="150" prop="PlanNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生产工单号" width="150" prop="OrderNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品编号" width="150" prop="ProductNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="成品名称" width="150" prop="ProductName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单数量" width="150" prop="PlanQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单类型" width="150" prop="OrderTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.OrderTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户名称" width="150" prop="CustomerName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CustomerName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="已投数量" width="150" prop="InputQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.InputQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="完工数量" width="150" prop="CompleteQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CompleteQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="未完工数" width="150" prop="UnfinishedQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UnfinishedQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="报废数量" width="150" prop="ScrapQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ScrapQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="销售单号" width="150" prop="SaleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="销售单行号" width="150" prop="SaleLineNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleLineNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工单状态" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StatusText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="优先级" width="150" prop="Priority" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Priority }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划投入产线" width="150" prop="ProductLineCode" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductLineCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="BOM版本" width="150" prop="BomVersion" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.BomVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工艺路线" width="150" prop="RouteName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RouteName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计开始日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计划完成日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际开始日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际完成日期" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :enterable="false" content="修改" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="工单发布" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-s-promotion" plain @click="orderSend(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="取消发布" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-circle-close" plain @click="cancelSend(scope.row)" />
          </el-tooltip>

          <el-popover placement="top" trigger="hover" popper-class="popoverBackB">
            <el-tooltip class="item" effect="dark" :enterable="false" content="BOM" placement="top-start">
              <el-button type="primary" size="small" icon="el-icon-tickets" plain @click="handleBOM(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="工艺路线" placement="top-start">
              <el-button type="primary" size="small" icon="el-icon-s-operation" plain @click="handleLine(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="计划冻结" placement="top-start">
              <el-button type="danger" size="small" icon="el-icon-warning" plain @click="planFrozen(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="取消冻结" placement="top-start">
              <el-button type="success" size="small" icon="el-icon-remove-outline" plain @click="cancelFrozen(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="强制完工" placement="top-start">
              <el-button type="danger" size="small" icon="el-icon-success" plain @click="forceOver(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
              <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="作废" placement="top-start">
              <el-button type="danger" size="small" icon="el-icon-error" plain @click="handleVoid(scope.row)" />
            </el-tooltip>

            <el-button slot="reference" type="success" size="small" icon="el-icon-menu" plain style="margin-left: 10px;" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="生产工单号" prop="OrderNum" :rules="[{ required: true, message: '请输入生产工单号', trigger: 'blur' }]">
              <el-input v-model.trim="ruleForm.OrderNum" :placeholder="$t('permission.PlanNum')" onkeyup="value=value.replace(/[\u4e00-\u9fa5/\s+/]/ig,'')" clearable />
            </el-form-item>

            <el-form-item label="工单类型" prop="OrderType" :rules="[{ required: true, message: '请选择生产计划类型', trigger: 'change' }]">
              <el-radio-group v-model="ruleForm.OrderType" @change="changeRadio">
                <el-radio v-for="item in isGive" :key="item.value" :label="item.value" :value="item.value">{{ item.text }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="计划数量" prop="PlanQuantity" :rules="[{ required: true, message: '请输入计划数量', trigger: 'blur' }]">
              <el-input-number v-model.trim="ruleForm.PlanQuantity" :placeholder="$t('permission.PlanQuantity')" :min="0" clearable style="width: 100%" />
            </el-form-item>

            <el-form-item label="计划开始日期">
              <el-date-picker v-model="ruleForm.PlanStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>

            <el-form-item label="计划投入线" prop="ProductLineCode">
              <el-select v-model="ruleForm.ProductLineCode" placeholder="计划投入产线" style="width: 100%" clearable @change="changeLine">
                <el-option v-for="item in ProductList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="备注"><el-input v-model.trim="ruleForm.Description" type="textarea" clearable /></el-form-item>
          </div>

          <div class="boxRight">
            <el-form-item label="成品名称" prop="ProductName" :rules="[{ required: true, message: '请输入成品名称', trigger: 'change' }]">
              <el-input v-model="ruleForm.ProductName" readonly placeholder="请选择" class="disActive" @focus="finshBox" />
            </el-form-item>

            <el-form-item label="BOM版本" prop="BomVersion"><el-input v-model.trim="ruleForm.BomVersion" placeholder="BOM版本" disabled /></el-form-item>

            <el-form-item label="工艺路线" prop="RouteCode" :rules="[{ required: true, message: '请选择工艺路线', trigger: 'change' }]">
              <el-select v-model="ruleForm.RouteCode" placeholder="工艺路线" style="width: 100%" clearable>
                <el-option v-for="item in RouteNameList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="客户名称" prop="CustomerName">
              <el-input v-model="ruleForm.CustomerName" readonly placeholder="请选择" class="disActive" @focus="userBox" />
            </el-form-item>

            <el-form-item label="优先级" prop="Priority">
              <el-select v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" style="width: 100%" clearable @change="changePriority">
                <el-option v-for="item in PriorityList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="计划结束日期">
              <el-date-picker v-model="ruleForm.PlanEndDate" value-format="yyyy-MM-dd" type="date" splaceholder="选择日期" clearable />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd('ruleForm')">{{ $t('permission.continueAdd') }}</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 成品名称对应弹窗 -->
    <FinshName
      :fish-show="finshFormVisible"
      :list-box-loading="listBoxLoading"
      :table-box-height="tableBoxHeight"
      :finsh-data="finshData"
      :pagination-search="paginationSearch"
      @fishClose="fishClose"
      @fishClick="fishClick"
      @handleSearchBox="handleSearchBox"
    />

    <!-- 新增加页面客户名称聚焦弹窗 -->
    <CustomerName
      :user-show="userFormVisible"
      :user-box-loading="userBoxLoading"
      :table-box-height="tableBoxHeight"
      :user-data="userData"
      :pagination-user="paginationUser"
      @userClose="userClose"
      @userClick="userClick"
      @handleUserBox="handleUserBox"
    />

    <!-- BOM弹窗 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="bomFormVisible" title="BOM信息表" width="70%" height="50%">
      <el-table
        v-loading="bomBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="bomData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="50" fixed>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="序号" width="50" fixed>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工序编号" width="150" prop="ProcessCodeNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessCodeNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="工序名称" width="150" prop="ProcessCodeName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessCodeName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="原料编号" width="150" prop="MaterialNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MaterialNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="原料名称" width="150" prop="MaterialName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MaterialName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="原料规格" width="150" prop="MaterialSpec" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.MaterialSpec }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="用量" width="150" prop="Usage" sortable>
          <template slot-scope="scope">
            {{ scope.row.Usage }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="替代原料编号" width="170" prop="SubMaterialNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SubMaterialNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="替代原料名称" width="170" prop="SubMaterialName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.SubMaterialName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Remark }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 工艺线路弹窗 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="lineFormVisible" title="工艺路线信息表" width="70%" height="50%">
      <el-table
        v-loading="lineBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="lineData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="50" fixed>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工序编号" width="200" prop="ProcessNum" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessNum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="工序名称" width="200" prop="ProcessName" sortable :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ProcessName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否检验" prop="IsChecked" sortable>
          <template slot-scope="scope">
            <el-tag :style="{ color: scope.row.IsChecked === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsChecked === false ? '否' : '是' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="检验方式" prop="CheckedTypeText" sortable>
          <template slot-scope="scope">
            {{ scope.row.CheckedTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否必过" prop="IsMustPass" sortable>
          <template slot-scope="scope">
            <el-tag :style="{ color: scope.row.IsMustPass === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsMustPass === false ? '否' : '是' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否打印" prop="IsPrint" sortable>
          <template slot-scope="scope">
            <el-tag :style="{ color: scope.row.IsPrint === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsPrint === false ? '否' : '是' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="顺序" prop="OrderNum" sortable>
          <template slot-scope="scope">
            {{ scope.row.OrderNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.Description }}
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
import { GetDictionary, GetMaterialList, GetCustomerList, GetLine, bomDetailList, baseDetailList, GetBomVersion, GetRouteTextValuePair, GetMaterial } from '@/api/BasicData'
import { orderList, orderDelete, orderFreeze, orderAdd, orderModify, orderStatus } from '@/api/ProductionPlan'
import FinshName from '@/components/FinshName' // 成品名称弹窗
import CustomerName from '@/components/CustomerName' // 客户名称弹窗
const fixHeight = 260
const fixHeightBox = 350

export default {
  name: 'OrderPlan',
  components: { Pagination, FinshName, CustomerName },
  data() {
    return {
      tableData: [],
      ruleForm: {
        ProductName: '',
        CustomerName: '',
        BomVersion: ''
      }, // 编辑弹窗
      CreateTime: null,
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      dialogTypeTitle: null,
      newLine: null, // 获取计划下拉产线
      newRoute: null, // 获取工艺路线
      newPriority: null, // 获取下拉优先级
      BOMCode: null, // 获取新的Bomcode值
      RouteNameCode: null, // 获取新的routeCode值
      PlanTypeNameData: [], // 工单类型下拉框
      StatusNameData: [], // 工单状态下拉框
      finshData: [], // 成品弹窗数组
      userData: [], // 客户名称弹窗数组
      bomData: [], // BOM弹窗
      lineData: [], // 工艺路线弹窗
      isGive: [], // 弹窗计划类型radio数组
      PriorityList: [], // 优先级下拉列表
      ProductList: [], // 计划投入产线
      RouteNameList: [], // 工艺路线
      typeCode: null, // 计划类型code值
      pagination: {
        PageIndex: 1,
        PageSize: 30,
        importDate: [],
        OrderNum: undefined,
        ProductCode: undefined,
        ProductName: undefined,
        CustomerName: undefined,
        OrderType: undefined,
        PrevStatus: undefined
      },
      // 成品聚焦搜索条件
      paginationSearch: {
        PageIndex: 1,
        PageSize: 30,
        MaterialType: 1,
        MaterialNum: undefined,
        Name: undefined
      },
      // 客户聚焦搜索条件
      paginationUser: {
        PageIndex: 1,
        PageSize: 30,
        CustomerNum: undefined,
        FullName: undefined
      },
      listLoading: false, // 主列表
      listBoxLoading: false, // 成品名称搜索loading
      userBoxLoading: false, // 客户名称搜索loading
      bomBoxLoading: false, // bom弹窗loading
      lineBoxLoading: false, // 工艺路线弹窗loading
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      finshFormVisible: false, // input产品名称弹窗
      userFormVisible: false, // input客户名称弹窗
      bomFormVisible: false, // BOM弹窗
      lineFormVisible: false, // 工艺路线弹窗
      addShow: true, // 继续添加仅新增可见
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
    },

    immediate: true,
    deep: true
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

    // 工单类型下拉
    GetDictionary({ code: '0008' }).then(res => {
      if (res.IsPass === true) {
        this.PlanTypeNameData = res.Obj
        this.isGive = res.Obj
      }
    })
    // 工单状态下拉
    GetDictionary({ code: '0010' }).then(res => {
      if (res.IsPass === true) {
        this.StatusNameData = res.Obj
      }
    })
    // 优先级下拉
    GetDictionary({ code: '0017' }).then(res => {
      if (res.IsPass === true) {
        this.PriorityList = res.Obj
      }
    })
    // 拆分生产计划产线下拉
    GetLine().then(res => {
      if (res.IsPass === true) {
        this.ProductList = res.Obj
      }
    })
    // 获取新增修改工艺路线下拉
    GetRouteTextValuePair().then(res => {
      if (res.IsPass === true) {
        this.RouteNameList = res.Obj
      }
    })

    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    // 改变搜索框开始结束时间触发
    importChange(val) {
      if (val === null) {
        this.$nextTick(function() {
          this.pagination.importDate = []
          this.pagination.ModifyTimeStart = ''
          this.pagination.ModifyTimeEnd = ''
        })
      } else {
        this.pagination.importDate[0] = val[0]
        this.pagination.importDate[1] = val[1]
        this.pagination.ModifyTimeStart = this.pagination.importDate[0]
        this.pagination.ModifyTimeEnd = this.pagination.importDate[1]
      }
    },

    // 折叠按钮互斥
    toggle(status) {
      if (status === '0') {
        if (window.innerHeight < 800) {
          this.tableHeight = '60vh'
        } else {
          this.tableHeight = '68vh'
        }
      }
      if (status === '1') {
        if (window.innerHeight < 800) {
          this.tableHeight = '63vh'
        } else {
          this.tableHeight = '73vh'
        }
      }
      this.btnShow = !this.btnShow
      this.showSearch = !this.showSearch
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },

    // 获取计划下拉产线
    changeLine(val) {
      this.newLine = val
    },

    // 获取工艺路线下拉
    changeRoute(val) {
      this.newRoute = val
    },

    // 获取下拉优先级
    changePriority(val) {
      this.newPriority = val
    },

    // 新增获取单选value的值
    changeRadio(val) {
      this.typeCode = val
    },
    // 导出用户
    handleExport() {},
    // 导出用户
    formatJson(filterVal, jsonData) {
      // return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 导入
    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 1
      // if (isLt1M) {
      //   return true
      // }
      // this.$message({
      //   message: 'Please do not upload files larger than 1m in size.',
      //   type: 'warning'
      // })
      // return false
    },
    // handleSuccess({ results, header }) {
    //   this.tableData = results
    //   this.tableHeader = header
    // },
    // 获取列表
    getList() {
      this.listLoading = true
      orderList(this.pagination).then(res => {
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
      this.dialogTypeTitle = this.$t('permission.addOrder')
      this.dialogFormVisible = true
      this.addShow = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = {
        PlanCode: ''
      }
    },

    // 编辑
    handleEdit(row) {
      this.dialogTypeTitle = this.$t('permission.EditOrder')
      this.dialogFormVisible = true
      this.addShow = false
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTypeTitle === this.$t('permission.EditOrder')) {
            const params = this.ruleForm
            params.BomCode = this.BOMCode
            orderModify(params).then(res => {
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
          } else if (this.dialogTypeTitle === this.$t('permission.addOrder')) {
            const params = this.ruleForm
            params.PlanType = this.typeCode
            params.ProductLineCode = this.newLine
            params.BomCode = this.BOMCode
            params.Priority = this.newPriority
            orderAdd(params).then(res => {
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
          const params = this.ruleForm
          params.PlanType = this.typeCode
          params.ProductLineCode = this.newLine
          params.BomCode = this.BOMCode
          // params.RouteCode = this.newRoute
          params.Priority = this.newPriority
          orderAdd(params).then(res => {
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
    // BOM
    handleBOM(row) {
      const params = {
        BomCode: row.BomCode
      }
      if (row.BomCode === null) {
        this.$message('暂无数据！')
      } else {
        bomDetailList(params).then(res => {
          if (res.IsPass === true) {
            this.bomFormVisible = true
            this.bomBoxLoading = true
            this.bomData = res.Obj
          }
          this.bomBoxLoading = false
        })
      }
    },

    // 查看工艺路线
    handleLine(row) {
      const params = {
        ProcessRouteCode: row.RouteCode
      }
      if (row.RouteCode === null) {
        this.$message('暂无数据！')
      } else {
        baseDetailList(params).then(res => {
          if (res.IsPass === true) {
            this.lineFormVisible = true
            this.lineBoxLoading = true
            this.lineData = res.Obj
          }
          this.lineBoxLoading = false
        })
      }
    },

    // 删除按钮
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          orderDelete({ OrderCode: row.OrderCode }).then(res => {
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
            message: this.$t('table.cancelSuccess')
          })
        })
    },

    // 工单发布
    orderSend(row) {
      this.$confirm(this.$t('permission.sendInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode,
            Status: 1
          }
          orderStatus(params).then(res => {
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
            type: 'info',
            message: this.$t('table.cancelSuccess')
          })
        })
    },
    // 取消发布
    cancelSend(row) {
      this.$confirm(this.$t('permission.cancelOtherInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode,
            Status: 0
          }
          orderStatus(params).then(res => {
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
            type: 'info',
            message: this.$t('table.cancelSuccess')
          })
        })
    },

    // 计划冻结
    planFrozen(row) {
      this.$confirm(this.$t('permission.dongjInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode,
            Status: 3
          }
          orderStatus(params).then(res => {
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
            type: 'info',
            message: this.$t('table.cancelSuccess')
          })
        })
    },
    // 取消冻结
    cancelFrozen(row) {
      this.$confirm(this.$t('permission.cancelInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode
          }
          orderFreeze(params).then(res => {
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
            type: 'info',
            message: this.$t('table.cancelSuccess')
          })
        })
    },
    // 强制完工
    forceOver(row) {
      this.$confirm(this.$t('permission.overInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode,
            Status: 4
          }
          orderStatus(params).then(res => {
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
            type: 'info',
            message: this.$t('table.cancelSuccess')
          })
        })
    },

    // 作废
    handleVoid(row) {
      this.$confirm(this.$t('permission.VoidInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode,
            Status: 5
          }
          orderStatus(params).then(res => {
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
            type: 'info',
            message: this.$t('table.cancelSuccess')
          })
        })
    },

    // 聚焦事件产成品弹窗
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
      this.paginationSearch.PageIndex = 1
      this.finshBox()
    },
    // 增加成品名称双击事件获取当前行的值
    fishClick(row) {
      // this.ruleForm.ProductName = row.Name
      this.$set(this.ruleForm, 'ProductName', row.Name)
      this.ruleForm.ProductCode = row.MaterialCode
      const params = {
        MaterialType: '1',
        MaterialCode: row.MaterialCode
      }
      GetMaterial(params).then(res => {
        if (res.IsPass === true) {
          debugger
          this.$set(this.ruleForm, 'RouteCode', res.Obj.RouteCode)
          // this.RouteNameCode = res.Obj.RouteCode
        }
      })
      GetBomVersion(params).then(res => {
        if (res.IsPass === true) {
          this.$set(this.ruleForm, 'BomVersion', res.Obj.Version)
          this.BOMCode = res.Obj.Code
        }
      })

      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.finshFormVisible = false
    },
    // 关闭成品名称查询弹窗
    fishClose() {
      this.finshFormVisible = false
    },
    // 聚焦事件客户弹窗
    userBox() {
      this.userFormVisible = true
      this.usBoxLoading = true
      GetCustomerList(this.paginationUser).then(res => {
        if (res.IsPass === true) {
          this.userData = res.Obj
          this.usBoxLoading = false
        }
      })
    },
    handleUserBox() {
      this.paginationUser.PageIndex = 1
      this.userBox()
    },
    // 增加客户名称双击事件获取当前行的值
    userClick(row) {
      // this.ruleForm.CustomerName = row.FullName
      this.$set(this.ruleForm, 'CustomerName', row.FullName)
      this.ruleForm.CustomerCode = row.CustomerCode
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.userFormVisible = false
    },
    // 关闭客户名称查询弹窗
    userClose() {
      this.userFormVisible = false
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

.app-container .pagination-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
