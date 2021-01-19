<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="equShow" :before-close="equClose" title="设备明细表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备编号" placement="top-start">
              <label class="radio-label">设备编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchEqu.EquNum" clearable /></el-col>
        </el-col>

        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备名称" placement="top-start">
              <label class="radio-label">设备名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchEqu.EquName" clearable /></el-col>
        </el-col>

        <el-col :span="7">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="设备类型" placement="top-start"><label class="radio-label">设备类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="paginationSearchEqu.EquTypeCode" clearable style="width: 100%">
              <el-option v-for="item in EquTypeCodeData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="2">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchEqu">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="equBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="equData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="equClick"
    >

      <el-table-column align="center" label="行号" width="50">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备编号" width="150" prop="EquNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备名称" width="150" prop="EquName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备型号" width="150" prop="Spec" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Spec }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="设备类型" width="150" prop="EquTypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EquTypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="保养周期" width="150" prop="MaintainDays" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaintainDays }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="预警产量" width="150" prop="PreAlertTimes" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.PreAlertTimes }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商名称" width="150" prop="SupplierName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SupplierName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商电话" width="150" prop="Tel" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Tel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="购入日期" width="150" prop="GetData" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GetData | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="固定资产编号" width="150" prop="MtMethod" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MtMethod }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上次保养日期" width="150" prop="MtMethod" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GetData | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际产量" width="150" prop="MtMethod" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MtMethod }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" prop="MtMethod" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MtMethod }}
        </template>
      </el-table-column>

    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'EquNum',
  props: {
    equShow: {
      type: Boolean,
      default: true
    },
    equBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },

    EquTypeCodeData: {
      type: Array,
      default: function() {
        return []
      }
    },
    equData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchEqu: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // 成品名称弹窗关闭
    equClose() {
      this.$emit('equClose')
    },
    // 成品名称双击确认
    equClick(row) {
      this.$emit('equClick', row)
    },
    // 成品名称查询
    handleSearchEqu() {
      this.$emit('handleSearchEqu')
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-dialog__body {
    .searchBox{
      .el-col-6{
        height: 30px;
        line-height: 25px;
        text-align: right;
      }
    }
  }
</style>
