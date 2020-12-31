<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="workingShow" :before-close="workingClose" title="列表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工序编号" placement="top-start">
              <label class="radio-label">工序编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchWorking.ProcessNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="工序名称" placement="top-start">
              <label class="radio-label">工序名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchWorking.Name" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchWorking">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="workingBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="workingData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="workingClick"
    >

      <el-table-column align="center" label="序号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="工序编号" width="250" prop="ProcessNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ProcessNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="工序名称" width="250" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="倒扣账标识" width="150" prop="IsBackFlush" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsBackFlush === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsBackFlush === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工序描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'WorkingName',
  props: {
    workingShow: {
      type: Boolean,
      default: true
    },
    workingBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    workingData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchWorking: {
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
    workingClose() {
      this.$emit('workingClose')
    },
    // 成品名称双击确认
    workingClick(row) {
      this.$emit('workingClick', row)
    },
    // 成品名称查询
    handleSearchWorking() {
      this.$emit('handleSearchWorking')
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
