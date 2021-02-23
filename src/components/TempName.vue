<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="tempShow" :before-close="tempClose" title="异常明细维护表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="模板编号" placement="top-start"><label class="radio-label">模板编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTemp.ExceptNum" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="模板名称" placement="top-start"><label class="radio-label">模板名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTemp.ExceptName" clearable /></el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchTemp">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="tempBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="tempData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="tempClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="模板编号" width="150" prop="TempNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TempNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板路径" width="150" prop="Template" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Template }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="模板类型" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属公司" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearch.PageIndex" :size.sync="paginationSearch.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'TempName',
  components: { Pagination },
  props: {
    tempShow: {
      type: Boolean,
      default: true
    },
    tempBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },

    tempData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchTemp: {
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
    // 异常发送组弹窗关闭
    tempClose() {
      this.$emit('tempClose')
    },
    //  异常发送组双击确认
    tempClick(row) {
      this.$emit('tempClick', row)
    },
    // 异常发送组查询
    handleSearchTemp() {
      this.$emit('handleSearchTemp')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchTemp.PageIndex - 1) * this.paginationSearchTemp.PageSize + index + 1
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
