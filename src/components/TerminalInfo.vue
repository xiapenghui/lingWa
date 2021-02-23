<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="terminShow" :before-close="terminClose" title="工位信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工位编号" placement="top-start">
              <label class="radio-label">工位编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTermin.TerminalNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工位名称" placement="top-start">
              <label class="radio-label">工位名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTermin.TerminalName" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchTermin">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="terminBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="terminData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="terminClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="工位编号" width="150" prop="TerminalNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工位名称" width="150" prop="TerminalName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TerminalName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作中心名称" width="150" prop="WorkCenterName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WorkCenterName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属产线" width="150" prop="LineName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.LineName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属车间" width="150" prop="WorkshopName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WorkshopName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属工序" width="150" prop="ProcessName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchTermin.PageIndex" :size.sync="paginationSearchTermin.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'TerminalInfo',
  components: { Pagination },
  props: {
    terminShow: {
      type: Boolean,
      default: true
    },
    terminBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },

    terminData: {
      type: Array,
      default: function() {
        return []
      }
    },

    paginationSearchTermin: {
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
    // 工位名称弹窗关闭
    terminClose() {
      this.$emit('terminClose')
    },
    // 工位名称双击确认
    terminClick(row) {
      this.$emit('terminClick', row)
    },
    // 工位名称查询
    handleSearchTermin() {
      this.$emit('handleSearchTermin')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchTermin.PageIndex - 1) * this.paginationSearchTermin.PageSize + index + 1
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
