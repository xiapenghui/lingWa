<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="spareShow" :before-close="spareClose" title="设备备品备件表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="备件编号" placement="top-start"><label class="radio-label">备件编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchSpare.SpareNum" clearable /></el-col>
        </el-col>

        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="备件名称" placement="top-start"><label class="radio-label">备件名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchSpare.Name" clearable /></el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchSpare">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="spareBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="spareData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="spareClick"
    >

      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备件编号" width="150" prop="SpareNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SpareNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备件名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="100" prop="SpareUnitName" sortable>
        <template slot-scope="scope">
          {{ scope.row.SpareUnitName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备件描述" min-width="200" prop="Description" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'SparePart',
  props: {
    spareShow: {
      type: Boolean,
      default: true
    },
    spareBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    spareData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchSpare: {
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
    // 客户名称弹窗关闭
    spareClose() {
      this.$emit('spareClose')
    },
    //  客户名称双击确认
    spareClick(row) {
      this.$emit('spareClick', row)
    },
    //  客户名称查询
    handleSearchSpare() {
      this.$emit('handleSearchSpare')
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
