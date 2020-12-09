<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="incomingShow" :before-close="incomingClose" title="原料编码" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="来料检验规则编号" placement="top-start">
              <label class="radio-label">来料检验规则编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="14"><el-input v-model="paginationSearchIncoming.RuleNum" /></el-col>
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
      :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
      :data="incomingData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="incomingClick"
    >
      <el-table-column align="center" label="检验规则编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.RuleNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="批量范围从" width="150">
        <template slot-scope="scope">
          {{ scope.row.StartQty }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="批量范围至" width="150">
        <template slot-scope="scope">
          {{ scope.row.EndQty }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="采样数量" width="150">
        <template slot-scope="scope">
          {{ scope.row.SampleQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="拒绝数量" width="150">
        <template slot-scope="scope">
          {{ scope.row.RejQty }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.state')" width="150">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="200">
        <template slot-scope="scope">
          {{ scope.row.CreateUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="200">
        <template slot-scope="scope">
          {{ scope.row.CreateTime }}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'MaterialName',
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
