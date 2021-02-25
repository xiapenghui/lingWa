<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="supShow" :before-close="supClose" title="供应商信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="供应商编号" placement="top-start"><label class="radio-label">供应商编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchSup.SupplierNum" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="供应商名称" placement="top-start"><label class="radio-label">供应商名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchSup.Name" clearable /></el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchSup">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="supBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="supData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="supClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="供应商编号" width="150" prop="SupplierNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.SupplierNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商代码" width="150" prop="ExceptTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系人" width="150" prop="Contact" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Contact }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" width="150" prop="Tel" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Tel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" width="200" prop="Address" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchSup.PageIndex" :size.sync="paginationSearchSup.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'SupName',
  components: { Pagination },
  props: {
    supShow: {
      type: Boolean,
      default: true
    },
    supBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },

    supData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchSup: {
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
    //  供应商弹窗关闭
    supClose() {
      this.$emit('supClose')
    },
    //   供应商双击确认
    supClick(row) {
      this.$emit('supClick', row)
    },
    // 供应商查询
    handleSearchSup() {
      this.$emit('handleSearchSup')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchSup.PageIndex - 1) * this.paginationSearchSup.PageSize + index + 1
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
