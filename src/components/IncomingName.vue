<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="incomingShow" :before-close="incomingClose" title="来料信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="来料检验规则编号" placement="top-start">
              <label class="radio-label">检验编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="14"><el-input v-model.trim="paginationSearchIncoming.RuleNum" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchIncoming">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="incomingBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="incomingData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="incomingClick"
    >

      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="检验规则编号" width="150" prop="RuleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RuleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="批量范围从" width="150" prop="StartQty" sortable>
        <template slot-scope="scope">
          {{ scope.row.StartQty }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="批量范围至" width="150" prop="EndQty" sortable>
        <template slot-scope="scope">
          {{ scope.row.EndQty }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="采样数量" width="150" prop="SampleQty" sortable>
        <template slot-scope="scope">
          {{ scope.row.SampleQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="拒绝数量" width="150" prop="RejQty" sortable>
        <template slot-scope="scope">
          {{ scope.row.RejQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'IncomingName',
  props: {
    incomingShow: {
      type: Boolean,
      default: true
    },
    incomingBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    incomingData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchIncoming: {
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
    // 物料名称弹窗关闭
    incomingClose() {
      this.$emit('incomingClose')
    },
    //  物料名称双击确认
    incomingClick(row) {
      this.$emit('incomingClick', row)
    },
    //  物料名称查询
    handleSearchIncoming() {
      this.$emit('handleSearchIncoming')
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-dialog__body {
    .searchBox{
      .el-col-8{
        height: 30px;
        line-height: 25px;
        text-align: right;
      }
    }
  }
</style>
