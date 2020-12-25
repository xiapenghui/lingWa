<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="fishShow" :before-close="fishClose" title="成品名称" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark"   :enterable="false" content="成名编号" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="paginationSearch.MaterialNum" /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark"   :enterable="false" content="成品名称" placement="top-start">
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
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="finshData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="fishClick"
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
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'FinshName',
  props: {
    fishShow: {
      type: Boolean,
      default: true
    },
    listBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    finshData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearch: {
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
    fishClose() {
      this.$emit('fishClose')
    },
    // 成品名称双击确认
    fishClick(row) {
      this.$emit('fishClick', row)
    },
    // 成品名称查询
    handleSearchBox() {
      this.$emit('handleSearchBox')
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
