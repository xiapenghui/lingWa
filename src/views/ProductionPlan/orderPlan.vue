<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="生产工单号" placement="top-start"><label class="radio-label">生产工单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.PlanNum" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="成品编号" placement="top-start"><label class="radio-label">成品编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.ProductCode" /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="成品名称" placement="top-start"><label class="radio-label">成品名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.ProductName" /></el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="4">
            <el-tooltip class="item" effect="dark" content="创建日期" placement="top-start"><label class="radio-label">创建日期:</label></el-tooltip>
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
            <el-tooltip class="item" effect="dark" content="生产计划单号" placement="top-start"><label class="radio-label">生产计划单号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.PlanCode" /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="客户名称" placement="top-start"><label class="radio-label">客户名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.PlanCode" /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="工单类型" placement="top-start"><label class="radio-label">工单类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.OrderType" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="工单状态" placement="top-start"><label class="radio-label">工单状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="pagination.PrevStatus" clearable style="width: 100%">
              <el-option v-for="item in StatusNameData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">{{ $t('permission.addPlan') }}</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="handleExport">{{ $t('permission.exportPlan') }}</el-button>
      <!-- <el-button type="success" icon="el-icon-circle-plus-outline" @click="orderSend">{{ $t('permission.orderSend') }}</el-button>
      <el-button type="danger" icon="el-icon-circle-plus-outline" @click="cancelSend">{{ $t('permission.cancelSend') }}</el-button> -->
      <!-- <el-button type="success" icon="el-icon-circle-check" @click="cancelFrozen">{{ $t('permission.cancelFrozen') }}</el-button>
      <el-button type="danger" icon="el-icon-remove-outline" @click="planFrozen">{{ $t('permission.planFrozen') }}</el-button>
      <el-button type="danger" icon="el-icon-remove-outline" @click="forceOver">{{ $t('permission.forceOver') }}</el-button> -->

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
          {{ scope.row.OrderTypeText }}
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
          {{ scope.row.StatusText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="计开始日期" width="150">
        <template slot-scope="scope">
          <!-- {{ scope.row.PlanStartDate }} -->
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

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="350">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="BOM" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-tickets" plain @click="handleBOM(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="工艺路线" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-s-operation" plain @click="handleLine(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" plain @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="工单发布" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-s-promotion" plain @click="orderSend(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="取消发布" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-circle-close" plain @click="cancelSend(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="计划冻结" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-warning" plain @click="planFrozen(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="取消冻结" placement="top-start">
            <el-button type="success" size="small" icon="el-icon-remove-outline" plain @click="cancelFrozen(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="强制完工" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-success" plain @click="forceOver(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleDelete(scope.row)" />
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.PageIndex" :size.sync="pagination.PageSize" @pagination="getList" />

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogTypeTitle"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">

            <el-form-item label="生产工单号" prop="PlanNum" :rules="[{ required: true, message: '请输入生产工单号', trigger: 'blur' }]">
              <el-input v-model="ruleForm.PlanNum" :placeholder="$t('permission.PlanNum')" />
            </el-form-item>

            <el-form-item label="工单类型" prop="PlanType" :rules="[{ required: true, message: '请选择生产计划类型', trigger: 'change' }]">
              <el-radio-group v-model="ruleForm.PlanType" @change="changeRadio">
                <el-radio v-for="item in isGive" :key="item.value" :label="item.value" :value="item.value">{{ item.text }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="计划数量" prop="PlanQuantity" :rules="[{ required: true, message: '请输入计划数量', trigger: 'blur' }]">
              <el-input v-model="ruleForm.PlanQuantity" :placeholder="$t('permission.PlanQuantity')" />
            </el-form-item>

            <el-form-item label="计划开始日期" prop="PlanStartDate" :rules="[{ required: true, message: '请输入计划开始日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.PlanStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
            </el-form-item>

          </div>

          <div class="boxRight">

            <el-form-item label="成品名称" prop="ProductName" :rules="[{ required: true, message: '请输入成品名称', trigger: 'blur' }]">
              <el-input v-model="ruleForm.ProductName" :placeholder="$t('permission.ProductName')" @focus="finshBox" />
            </el-form-item>

            <el-form-item label="客户名称" prop="CustomerName">
              <el-input v-model="ruleForm.CustomerName" :placeholder="$t('permission.CustomerName')" @focus="userBox" />
            </el-form-item>

            <el-form-item label="优先级" prop="Priority">
              <el-select v-model="ruleForm.Priority" :placeholder="$t('permission.Priority')" style="width: 100%">
                <el-option v-for="item in PriorityList" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('permission.PlanEndDate')" prop="PlanEndDate" :rules="[{ required: true, message: '请输入计划完成日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.PlanEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" splaceholder="选择日期" />
            </el-form-item>

          </div>
        </div>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogFormVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="submitAdd">{{ $t('permission.continueAdd') }}</el-button>
        <!-- <el-button v-if="splitShow" type="primary" @click="submitSplit">{{ $t('permission.continueSplit') }}</el-button>s -->
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
        @row-dblclick="rowDblclick"
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
            {{ scope.row.user }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 新增加页面客户名称聚焦弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="userFormVisible" title="客户名称" width="70%" height="50%">
      <div class="searchBox" style="margin-bottom: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-col :span="6">
              <el-tooltip class="item" effect="dark" content="客户编码" placement="top-start">
                <label class="radio-label">{{ $t('permission.CustomerNum') }}:</label>
              </el-tooltip>
            </el-col>
            <el-col :span="16"><el-input v-model="paginationUser.CustomerNum" /></el-col>
          </el-col>

          <el-col :span="8">
            <el-col :span="6">
              <el-tooltip class="item" effect="dark" content="客户名称" placement="top-start">
                <label class="radio-label">{{ $t('permission.FullName') }}:</label>
              </el-tooltip>
            </el-col>
            <el-col :span="16"><el-input v-model="paginationUser.FullName" /></el-col>
          </el-col>

          <el-col :span="4">
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-search" @click="handleUserhBox">{{ $t('permission.search') }}</el-button>
            </el-col>
          </el-col>
        </el-row>
      </div>

      <el-table
        v-loading="userBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
        :data="userData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
        @row-dblclick="UserDblclick"
      >
        <el-table-column align="center" label="客户编号" width="150">
          <template slot-scope="scope">
            {{ scope.row.CustomerNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="客户名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="联系人" width="150">
          <template slot-scope="scope">
            {{ scope.row.ShortName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="电话" width="150">
          <template slot-scope="scope">
            {{ scope.row.Describe }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="邮箱" width="150">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="地址" width="150">
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
            {{ scope.row.user }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="维护时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.ModifyTime }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- BOM弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="bomFormVisible" title=" BOM弹窗" width="70%" height="50%">
      <el-table
        v-loading="bomBoxLoading"
        :height="tableBoxHeight"
        :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
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
        :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
        :data="lineData"
        style="width: 100%"
        border
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="工序代码" width="150">
          <template slot-scope="scope">
            {{ scope.row.CustomerNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="工序名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否检验" width="150">
          <template slot-scope="scope">
            {{ scope.row.ShortName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="检验方式" width="150">
          <template slot-scope="scope">
            {{ scope.row.Describe }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否必过" width="150">
          <template slot-scope="scope">
            {{ scope.row.Color }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否打印" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialTypeText }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="顺序" width="150">
          <template slot-scope="scope">
            {{ scope.row.MaterialType }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" width="150">
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
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
// import moment from 'moment'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { GetDictionary, GetMaterialList, GetCustomerList, productionAdd, productionUpdate, GetLine } from '@/api/OrganlMan'
import { orderList, orderDelete, orderFreeze, orderStatus } from '@/api/OrganlMan'
const fixHeight = 270
const fixHeightBox = 350

export default {
  name: 'CompanyMaintenance',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      CreateTime: null,
      btnShow: true, // 互斥按钮
      showSearch: false, // 隐藏搜素条件
      PlanTypeNameData: [], // 计划类型下拉框
      StatusNameData: [], // 计划状态下拉框
      finshData: [], // 成品弹窗数组
      userData: [], // 客户名称弹窗数组
      bomData: [], // BOM弹窗
      lineData: [], // 工艺路线弹窗
      isGive: [], // 弹窗计划类型radio数组
      PriorityList: [], // 优先级下拉列表
      ProductList: [], // 计划投入产线
      finshCode: null, // 成品名称code值
      userCode: null, // 客户名称code值
      typeCode: null, // 计划类型code值
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
        PageSize: 10,
        MaterialType: 1,
        MaterialNum: undefined,
        Name: undefined
      },
      // 客户聚焦搜索条件
      paginationUser: {
        PageIndex: 1,
        PageSize: 10,
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
      dialogTypeTitle: null,
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
    // this.pagination.importDate[0] = this.$moment(new Date()).format('YYYY-MM-DD')
    // this.pagination.importDate[1] = this.$moment(new Date()).format('YYYY-MM-DD')
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
    // 重置
    handleReset() {},
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
      orderList(this.pagination).then(res => {
        debugger
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
      this.splitShow = false
      this.true = true
      this.ruleForm = {}
    },
    // 继续新增
    submitAdd() {
      this.handleAdd()
    },

    // 编辑
    handleEdit(row) {
      this.dialogTypeTitle = this.$t('permission.EditProduction')
      this.dialogFormVisible = true
      this.planAdd = true
      this.planShow = false
      this.splitShow = false
      this.true = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTypeTitle === this.$t('permission.EditProduction')) {
            const params = this.ruleForm
            console.log('params.ProductCode', params.ProductCode)
            // params.ProductCode=this.finshCode
            // params.CustomerCode = this.userCode
            productionUpdate(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.editSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
                this.editLoading = false
                this.dialogFormVisible = false
              }
            })
          } else if (this.dialogTypeTitle === this.$t('permission.addProductiony')) {
            debugger
            const params = this.ruleForm
            params.ProductCode = this.finshCode
            params.CustomCode = this.userCode
            params.PlanType = this.typeCode
            productionAdd(params).then(res => {
              if (res.IsPass === true) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.editLoading = false
                this.getList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.MSG
                })
                this.editLoading = false
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
            Status: 2
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
    // 取消冻结
    cancelFrozen(row) {
      this.$confirm(this.$t('permission.cancelInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(() => {
          const params = {
            OrderCode: row.OrderCode,
            Status: 1
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
    // 新增获取单选value的值
    changeRadio(val) {
      this.typeCode = val
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
    rowDblclick(row) {
      this.ruleForm.ProductName = row.Name
      this.finshCode = row.MaterialCode
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
    handleUserhBox() {
      this.paginationUser.PageIndex = 1
      this.userBox()
    },
    // 增加客户名称双击事件获取当前行的值
    UserDblclick(row) {
      this.ruleForm.CustomerName = row.FullName
      this.userCode = row.CustomerCode
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
</style>
