<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content1" placement="top-start"><label class="radio-label">计划单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.PlanNum" :placeholder="$t('permission.PlanNum')" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductNum" :placeholder="$t('permission.ProductNum')" clearable /></el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.ProductName" :placeholder="$t('permission.ProductName')" clearable /></el-col>
        </el-col>

        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.CustomerName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="pagination.CustomerFullName" :placeholder="$t('permission.CustomerName')" clearable /></el-col>
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
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.PlanTypeName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PlanType" :placeholder="$t('permission.PlanTypeName')" clearable style="width: 100%">
              <el-option v-for="item in PlanTypeNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content7" placement="top-start">
              <label class="radio-label">{{ $t('permission.StatusName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PlanStatus" :placeholder="$t('permission.StatusName')" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.CreateTime') }}:</label>
            </el-tooltip>
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
              :clearable="false"
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
      <!-- <el-button type="primary" icon="el-icon-document-remove">{{ $t('permission.importcompany') }}</el-button> -->
      <!-- <upload-excel-component class="handleImport" :on-success="handleSuccess" :before-upload="beforeUpload" :message="parentMsg" /> -->
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanNum')" width="150" prop="PlanNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ProductNum')" width="150" prop="ProductNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ProductName')" width="150" prop="ProductName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProductName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.PlanQuantity')" width="150" prop="PlanQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanQuantity }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.SchedulingQuantity')" width="150" prop="SchedulingQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SchedulingQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.LastQuantity')" width="150" prop="LastQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LastQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CompleteQuantity')" width="150" prop="CompleteQuantity" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CompleteQuantity }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.CustomerName')" width="150" prop="CustomerName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CustomerName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleNum')" width="150" prop="SaleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleLineNum')" width="150" prop="SaleLineNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SaleLineNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanTypeName')" width="150" prop="PlanTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.StatusName')" width="150" prop="StatusName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.StatusName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanDeliveryDate')" width="120" prop="PlanDeliveryDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanDeliveryDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanStartDate')" width="150" prop="PlanStartDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.PlanEndDate')" width="150" prop="PlanEndDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PlanEndDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RealStartDate')" width="150" prop="RealStartDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealStartDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RealEndDate')" width="150" prop="RealEndDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RealEndDate | substringTime }}
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

          <el-tooltip class="item" effect="dark" :enterable="false" content="计划拆分" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-scissors" plain @click="planOpen(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" :enterable="false" content="关联工单" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-link" plain @click="handleRelation(scope.row)" />
          </el-tooltip>

          <el-popover placement="top" trigger="hover" popper-class="popoverBackB">
            <el-tooltip class="item" effect="dark" :enterable="false" content="BOM" placement="top-start">
              <el-button type="primary" size="small" icon="el-icon-tickets" plain @click="handleBOM(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="工艺路线" placement="top-start">
              <el-button type="primary" size="small" icon="el-icon-s-operation" plain @click="handleLine(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="计划冻结" placement="top-start">
              <el-button type="danger" size="small" icon="el-icon-remove-outline" plain @click="planFrozen(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="取消冻结" placement="top-start">
              <el-button type="success" size="small" icon="el-icon-circle-check" plain @click="cancelFrozen(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="强制完工" placement="top-start">
              <el-button type="danger" size="small" icon="el-icon-remove-outline" plain @click="forceOver(scope.row)" />
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top-start">
              <el-button type="danger" size="small" icon=" el-icon-delete" plain @click="handleDelete(scope.row)" />
            </el-tooltip>
            <el-button slot="reference" type="success" size="small" icon="el-icon-menu" plain style="margin-left: 10px;" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTypeTitle">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="生产计划单号" prop="PlanNum" :rules="[{ required: isAlarmItem, message: '请输入生产计划单号', trigger: 'blur' }]">
              <el-input v-model.trim="ruleForm.PlanNum" placeholder="生产计划单号" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item :label="$t('permission.PlanTypeName')" prop="PlanType" :rules="[{ required: isAlarmItem, message: '请选择生产计划类型', trigger: 'change' }]">
              <el-radio-group v-model="ruleForm.PlanType" @change="changeRadio">
                <el-radio v-for="item in isGive" :key="item.value" :label="item.value" :value="item.value">{{ item.text }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('permission.PlanQuantity')" prop="PlanQuantity" :rules="[{ required: isAlarmItem, message: '请输入计划数量', trigger: 'blur' }]">
              <el-input v-model.trim="ruleForm.PlanQuantity" :placeholder="$t('permission.PlanQuantity')" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item v-if="planShow" :label="$t('permission.SchedulingQuantityOther')" prop="SchedulingQuantityOther">
              <el-input v-model="ruleForm.RemainingQuantity" :placeholder="$t('permission.SchedulingQuantityOther')" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item v-if="planShow" label="拆分数量" prop="SplitQuantity" :rules="[{ required: isAlarmItem, message: '请输入拆分数量', trigger: 'blur' }]">
              <el-input-number v-model.trim="ruleForm.SplitQuantity" placeholder="拆分数量" :min="0" clearable style="width: 100%" />
            </el-form-item>

            <el-form-item v-if="planAdd" :label="$t('permission.SaleNum')"><el-input v-model="ruleForm.SaleNum" :placeholder="$t('permission.SaleNum')" clearable /></el-form-item>

            <el-form-item label="备注"><el-input v-model.trim="ruleForm.Remark" placeholder="备注" type="textarea" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item :label="$t('permission.ProductName')" prop="ProductName" :rules="[{ required: isAlarmItem, message: '请输入成品名称', trigger: 'blur' }]">
              <el-input v-model="ruleForm.ProductName" placeholder="请选择" :disabled="isDisabled" clearable @input="finshBox" />
            </el-form-item>

            <el-form-item v-if="planAdd" label="BOM版本"><el-input v-model="ruleForm.BomVersion" placeholder="BOM版本" :disabled="true" /></el-form-item>

            <el-form-item :label="$t('permission.CustomerName')" prop="CustomerName">
              <el-input v-model="ruleForm.CustomerName" :placeholder="$t('permission.CustomerName')" :disabled="isDisabled" clearable @input="userBox" />
            </el-form-item>

            <el-form-item v-if="planShow" :label="$t('permission.ProductLineCode')" prop="ProductLineCode">
              <el-select v-model="ruleForm.ProductLineCode" :placeholder="$t('permission.ProductLineCode')" style="width: 100%" clearable @change="changeLine">
                <el-option v-for="item in ProductList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item v-if="planShow" :label="$t('permission.Priority')" prop="Priority">
              <el-select v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" style="width: 100%" clearable @change="changePriority">
                <el-option v-for="item in PriorityList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item v-if="planAdd" :label="$t('permission.SaleLineNum')">
              <el-input v-model.trim="ruleForm.SaleLineNum" :placeholder="$t('permission.SaleLineNum')" clearable />
            </el-form-item>

            <el-form-item v-if="planAdd" :label="$t('permission.PlanDeliveryDate')">
              <el-date-picker v-model="ruleForm.PlanDeliveryDate" value-format="yyyy-MM-dd" placeholder="选择日期" />
            </el-form-item>
            <el-form-item :label="$t('permission.PlanStartDate')" prop="PlanStartDate" :rules="[{ required: isAlarmItemOther, message: '请输入计划开始日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.PlanStartDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>

            <el-form-item :label="$t('permission.PlanEndDate')" prop="PlanEndDate" :rules="[{ required: isAlarmItemOther, message: '请输入计划完成日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.PlanEndDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button v-if="addShow" type="primary" @click="submitAdd">{{ $t('permission.continueAdd') }}</el-button>
        <el-button v-if="splitShow" type="primary" @click="submitSplit">{{ $t('permission.continueSplit') }}</el-button>
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

    <!-- 关联工单弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="orderFormVisible" title="关联工单" width="70%" height="50%">
      <el-table
        v-loading="orderBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
        :data="orderData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="生产计划单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.PlanCode }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="生产工单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="成品编码" width="150">
          <template slot-scope="scope">
            {{ scope.row.ShortName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="成品名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.ProductCode }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工单数量" width="150">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工单类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.OrderType }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="客户名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialType }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="已投人数" width="150">
          <template slot-scope="scope">
            {{ scope.row.InputQuantity }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="完工数量" width="150">
          <template slot-scope="scope">
            {{ scope.row.CompleteQuantity }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="未完工人数" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="报废数量" width="150">
          <template slot-scope="scope">
            {{ scope.row.ScrapQuantity }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="销售单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="销售单行号" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="客户编号" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建人" width="150">
          <template slot-scope="scope">
            {{ scope.row.CreateUser }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工单状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.PrevStatus }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="计开始日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.PlanStartDate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="计划完成日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.PlanEndDate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="实际开始日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.RealStartDate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="实际完成日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.RealEndDate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.CreateTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- BOM弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="bomFormVisible" title=" BOM弹窗" width="70%" height="50%">
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
        <el-table-column align="center" label="工序编号" width="150">
          <template slot-scope="scope">
            {{ scope.row.CustomerNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工序名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="原料编号" width="150">
          <template slot-scope="scope">
            {{ scope.row.ShortName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="原料名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.Describe }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="用量" width="150">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="替代原料编号" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="替代原料名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialType }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建人" width="150">
          <template slot-scope="scope">
            {{ scope.row.user }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 工艺线路弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="lineFormVisible" title="工艺路线" width="70%" height="50%">
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
        <el-table-column align="center" label="工艺路线名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.CustomerNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="版本" width="150">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            {{ scope.row.ShortName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="生效时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.Describe }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护者" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialType }}
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import FinshName from '@/components/FinshName' // 成品名称弹窗
import CustomerName from '@/components/CustomerName' // 客户名称弹窗
import { GetDictionary, GetMaterialList, GetCustomerList, GetLine, GetBomVersion } from '@/api/BasicData'
import {
  productionList,
  productionFreeze,
  productionUnFreeze,
  ForceComplete,
  productionDelete,
  productionPlanNum,
  productionAdd,
  productionUpdate,
  SplitQuery,
  productionSplit,
  orderList
} from '@/api/ProductionPlan'
const fixHeight = 270
const fixHeightBox = 350

export default {
  name: 'CompanyMaintenance',
  components: { Pagination, FinshName, CustomerName },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      selectedData: [], // 批量选择新数组
      CreateTime: null,
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      isDisabled: false, // 拆分弹窗默认不能修改
      planShow: true, // 拆分弹窗默认可见字段
      planAdd: false, // 新增编辑弹窗默认可见字段
      addShow: true, // 继续添加仅新增可见
      splitShow: true, // 继续拆分仅拆分可见
      isAlarmItem: true, // 必填项可见不可见
      isAlarmItemOther: true, // 必填项可见不可见
      PlanTypeNameData: [], // 计划类型下拉框
      StatusNameData: [], // 计划状态下拉框
      finshData: [], // 成品弹窗数组
      userData: [], // 客户名称弹窗数组
      orderData: [], // 关联工单弹窗
      bomData: [], // BOM弹窗
      lineData: [], // 工艺路线弹窗
      isGive: [], // 弹窗计划类型radio数组
      PriorityList: [], // 优先级下拉列表
      ProductList: [], // 计划投入产线
      typeCode: null, // 计划类型code值
      MaterialCode: null, // Bom版本值
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
      // 成品聚焦搜索条件
      paginationSearch: {
        PageIndex: 1,
        PageSize: 100,
        MaterialType: 1,
        MaterialNum: undefined,
        Name: undefined,
        ShowBanned: false
      },
      // 客户聚焦搜索条件
      paginationUser: {
        PageIndex: 1,
        PageSize: 100,
        CustomerNum: undefined,
        FullName: undefined,
        ShowBanned: false
      },

      listLoading: false, // 主列表
      listBoxLoading: false, // 成品名称搜索loading
      userBoxLoading: false, // 客户名称搜索loading
      orderBoxLoading: false, // 关联工单弹窗loading
      bomBoxLoading: false, // bom弹窗loading
      lineBoxLoading: false, // 工艺路线弹窗loading
      editLoading: false, // 编辑loading
      total: 10,
      dialogFormVisible: false, // 编辑弹出框
      finshFormVisible: false, // input产品名称弹窗
      userFormVisible: false, // input客户名称弹窗
      orderFormVisible: false, // 关联工单弹窗
      bomFormVisible: false, // BOM弹窗
      lineFormVisible: false, // 工艺路线弹窗
      dialogTypeTitle: null,
      newLine: null, // 获取计划下拉产线
      newPriority: null, // 获取下拉优先级
      newBOMCode: null, // ...
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      tableBoxHeight: window.innerHeight - fixHeightBox, // 弹窗表格高度
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
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
        that.tableBoxHeight = window.innerHeight - fixHeightBox
      })()
    }

    // 计划类型下拉
    GetDictionary({ code: '0008' }).then(res => {
      if (res.IsPass === true) {
        this.PlanTypeNameData = res.Obj
        this.isGive = res.Obj
      }
    })
    // 计划状态下拉
    GetDictionary({ code: '0016' }).then(res => {
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
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    // 改变搜索框开始结束时间触发
    importChange(val) {
      this.pagination.importDate[0] = val[0]
      this.pagination.importDate[1] = val[1]
      this.pagination.CreateStartDate = this.pagination.importDate[0]
      this.pagination.CreateEndDate = this.pagination.importDate[1]
    },

    // 折叠按钮互斥
    toggle(status) {
      if (status === '0') {
        this.tableHeight = '67vh'
      } else {
        this.tableHeight = '72vh'
      }
      this.btnShow = !this.btnShow
      this.showSearch = !this.showSearch
    },

    // 查询
    handleSearch() {
      this.pagination.PageIndex = 1
      this.getList()
    },
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },

    // 获取计划下拉产线
    changeLine(val) {
      this.newLine = val
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
      this.isAlarmItemOther = true
      this.ruleForm = {
        PlanNum: '',
        BomVersion: ''
      }
      productionPlanNum().then(res => {
        this.$nextTick(function() {
          this.ruleForm.PlanNum = res.Obj
        })
      })
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
      this.isAlarmItemOther = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 封装拆分
    commonSplit() {
      productionSplit(this.ruleForm).then(res => {
        if (res.IsPass === true) {
          this.$message({
            type: 'success',
            message: this.$t('table.SplitSuc')
          })
          SplitQuery({ PlanCode: this.ruleForm.PlanCode }).then(res => {
            if (res.IsPass === true) {
              this.ruleForm = res.Obj
            }
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
    },

    // 封装新增
    commonAdd() {
      const params = this.ruleForm
      params.PlanType = this.typeCode
      params.ProductLineCode = this.newLine
      params.Priority = this.newPriority
      params.BomCode = this.newBOMCode
      productionAdd(params).then(res => {
        if (res.IsPass === true) {
          this.$message({
            type: 'success',
            message: this.$t('table.addSuc')
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
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTypeTitle === this.$t('permission.EditProduction')) {
            const params = this.ruleForm
            productionUpdate(params).then(res => {
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
          } else if (this.dialogTypeTitle === this.$t('permission.addProductiony')) {
            this.commonAdd()
          } else {
            this.commonSplit()
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
    },

    // 继续新增
    submitAdd() {
      this.commonAdd()
      // this.handleAdd()
    },

    // 继续拆分
    submitSplit() {
      this.commonSplit()
    },
    // 关联工单
    handleRelation(row) {
      this.orderFormVisible = true
      this.orderBoxLoading = true
      orderList({ PlanCode: row.PlanCode }).then(res => {
        if (res.IsPass === true) {
          this.orderData = res.Obj
        }
        this.orderBoxLoading = false
      })
    },
    // BOM
    handleBOM(row) {
      this.bomFormVisible = true
    },
    // 查看工艺路线
    handleLine(row) {
      this.lineFormVisible = true
    },

    // 删除按钮
    handleDelete(row) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          productionDelete({ PlanCodes: [row.PlanCode] }).then(res => {
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
    planOpen(row) {
      this.dialogTypeTitle = this.$t('permission.splitProductiony')
      this.dialogFormVisible = true
      this.planAdd = false
      this.planShow = true
      this.isDisabled = true
      this.addShow = false
      this.splitShow = true
      this.isAlarmItem = true
      this.isAlarmItemOther = false
      SplitQuery({ PlanCode: row.PlanCode }).then(res => {
        if (res.IsPass === true) {
          this.ruleForm = res.Obj
        }
      })
    },

    // 计划冻结
    planFrozen(row) {
      this.$confirm(this.$t('permission.dongjInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      })
        .then(() => {
          productionFreeze({ PlanCodes: [row.PlanCode] }).then(res => {
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
    },
    // 取消冻结
    cancelFrozen(row) {
      this.$confirm(this.$t('permission.cancelInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      })
        .then(() => {
          productionUnFreeze({ PlanCodes: [row.PlanCode] }).then(res => {
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
    },
    // 强制完工
    forceOver(row) {
      this.$confirm(this.$t('permission.overInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      })
        .then(() => {
          ForceComplete({ PlanCodes: [row.PlanCode] }).then(res => {
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
    },

    // 聚焦事件成品弹窗
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
      this.ruleForm.ProductName = row.Name
      this.ruleForm.ProductCode = row.MaterialCode
      GetBomVersion({ MaterialCode: row.MaterialCode, MaterialType: '1' }).then(res => {
        if (res.IsPass === true) {
          this.$nextTick(function() {
            this.newBOMCode = res.Obj.Code
            this.ruleForm.BomVersion = res.Obj.Version
          })
        }
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
      this.ruleForm.CustomerName = row.FullName
      this.ruleForm.CustomerCode = row.CustomerCode
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
.app-container .pagination-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
