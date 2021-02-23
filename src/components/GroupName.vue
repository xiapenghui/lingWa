<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="groupShow" :before-close="groupClose" title="异常发送组维护表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="分组编号" placement="top-start"><label class="radio-label">分组编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchGroup.GroupNum" clearable /></el-col>
        </el-col>

        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="分组名称" placement="top-start"><label class="radio-label">分组名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchGroup.GroupName" clearable /></el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchGroup">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="groupBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="groupData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="groupClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="分组编号" width="150" prop="GroupNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分组名称" width="150" prop="GroupName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上级分组" width="150" prop="ParentGroupCode" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ParentGroupCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分组级别" width="150" prop="GroupLevel" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.GroupLevel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="响应时间 (分钟)" width="150" prop="ResponseTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ResponseTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="处理时间 (分钟)" width="150" prop="HandleTime" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.HandleTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchGroup.PageIndex" :size.sync="paginationSearchGroup.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'GroupName',
  components: { Pagination },
  props: {
    groupShow: {
      type: Boolean,
      default: true
    },
    groupBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    groupData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchGroup: {
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
    groupClose() {
      this.$emit('groupClose')
    },
    //  异常发送组双击确认
    groupClick(row) {
      this.$emit('groupClick', row)
    },
    // 异常发送组查询
    handleSearchGroup() {
      this.$emit('handleSearchGroup')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchGroup.PageIndex - 1) * this.paginationSearchGroup.PageSize + index + 1
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
