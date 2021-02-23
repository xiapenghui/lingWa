<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="locationShow" :before-close="locationClose" title="库区信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="库区编号" placement="top-start">
              <label class="radio-label">库区编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchLocation.RegionNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="库区名称" placement="top-start">
              <label class="radio-label">库区名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchLocation.RegionName" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchLocation">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="locationBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="locationData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="locationClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

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

    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchLocation.PageIndex" :size.sync="paginationSearchLocation.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'LocationName',
  components: { Pagination },
  props: {
    locationShow: {
      type: Boolean,
      default: true
    },
    locationBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    locationData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchLocation: {
      type: Object,
      default: function() {
        return {}
      }
    },
    logTotal: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    // 成品名称弹窗关闭
    locationClose() {
      this.$emit('locationClose')
    },
    // 成品名称双击确认
    locationClick(row) {
      this.$emit('locationClick', row)
    },
    // 成品名称查询
    handleSearchLocation() {
      this.$emit('handleSearchLocation')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchLocation.PageIndex - 1) * this.paginationSearchLocation.PageSize + index + 1
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
