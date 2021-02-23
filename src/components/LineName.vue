<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="lineShow" :before-close="lineClose" title="工艺路线信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工艺路线名称" placement="top-start"><label class="radio-label">工艺路线名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchLine.Name" clearable /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchLine">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="lineLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="lineData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="lineClick"
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="工艺路线名称" width="200" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="版本" width="200" prop="Version" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生效时间" width="200" prop="EffectiveDate" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.EffectiveDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchLine.PageIndex" :size.sync="paginationSearchLine.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'LineName',
  components: { Pagination },
  props: {
    lineShow: {
      type: Boolean,
      default: true
    },
    lineLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    lineData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchLine: {
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
    // 工艺路线名称弹窗关闭
    lineClose() {
      this.$emit('lineClose')
    },
    // 工艺路线名称双击确认
    lineClick(row) {
      this.$emit('lineClick', row)
    },
    // 工艺路线名称查询
    handleSearchLine() {
      this.$emit('handleSearchLine')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchLine.PageIndex - 1) * this.paginationSearchLine.PageSize + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__body {
  .searchBox {
    .el-col-8 {
      height: 30px;
      line-height: 25px;
      text-align: right;
    }
  }
}
</style>
