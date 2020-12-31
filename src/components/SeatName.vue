<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="seatShow" :before-close="seatClose" title="列表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="仓库编号" placement="top-start">
              <label class="radio-label">仓库编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchSeat.WarehouseNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="仓库名称" placement="top-start">
              <label class="radio-label">仓库名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchSeat.WarehouseName" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchSeat">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="seatBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="seatData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="seatClick"
    >

      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库位编号" width="150" prop="LocationNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LocationNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库位名称" width="150" prop="LocationName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LocationName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库区编号" width="150" prop="RegionNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="库区名称" width="150" prop="RegionName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RegionName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="仓库编号" width="150" prop="WarehouseNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="仓库名称" width="150" prop="WarehouseName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUser" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUser }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.time')" width="150" prop="ModifyTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>

    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'SeatName',
  props: {
    seatShow: {
      type: Boolean,
      default: true
    },
    seatBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    seatData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchSeat: {
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
    seatClose() {
      this.$emit('seatClose')
    },
    // 成品名称双击确认
    seatClick(row) {
      this.$emit('seatClick', row)
    },
    // 成品名称查询
    handleSearchSeat() {
      this.$emit('handleSearchSeat')
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
