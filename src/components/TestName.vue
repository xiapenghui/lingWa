<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="testShow" :before-close="testClose" title="抽检比例参数表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="抽检编号" placement="top-start"><label class="radio-label">抽检编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTest.RuleNum" clearable /></el-col>
        </el-col>

        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="抽检名称" placement="top-start"><label class="radio-label">抽检名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTest.Name" clearable /></el-col>
        </el-col>

        <el-col :span="7">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="方案描述" placement="top-start"><label class="radio-label">方案描述:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchTest.Description" placeholder="方案描述" clearable /></el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchTest">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="testBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="testData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="testClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="抽检方案编号" width="250" prop="RuleNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.RuleNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="抽检方案名称" width="250" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="抽检方案描述" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchTest.PageIndex" :size.sync="paginationSearchTest.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'TestName',
  components: { Pagination },
  props: {
    testShow: {
      type: Boolean,
      default: true
    },
    testBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    testData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchTest: {
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
    // 客户名称弹窗关闭
    testClose() {
      this.$emit('testClose')
    },
    //  客户名称双击确认
    testClick(row) {
      this.$emit('testClick', row)
    },
    //  客户名称查询
    handleSearchTest() {
      this.$emit('handleSearchTest')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchTest.PageIndex - 1) * this.paginationSearchTest.PageSize + index + 1
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
