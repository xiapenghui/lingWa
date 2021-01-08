<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="wareShow" :before-close="wareClose" title="仓库信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="仓库编号" placement="top-start">
              <label class="radio-label">仓库编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchWare.WarehouseNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="仓库名称" placement="top-start">
              <label class="radio-label">仓库名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchWare.WarehouseName" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchWare">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="wareBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="wareData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="wareClick"
    >

      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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
      <el-table-column align="center" label="仓库类型" width="150" prop="WarehouseType" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.WarehouseType }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否FIFO" width="150" prop="IsFIFO" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsFIFO === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsFIFO === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否上架管理" width="150" prop="IsShelfManage" sortable>
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsShelfManage === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsShelfManage === false ? '否' : '是' }}</el-tag>
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

      <el-table-column align="center" :label="$t('permission.user')" width="150" prop="ModifyUserName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
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
  name: 'WarehouseName',
  props: {
    wareShow: {
      type: Boolean,
      default: true
    },
    wareBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    wareData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchWare: {
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
    wareClose() {
      this.$emit('wareClose')
    },
    // 成品名称双击确认
    wareClick(row) {
      this.$emit('wareClick', row)
    },
    // 成品名称查询
    handleSearchWare() {
      this.$emit('handleSearchWare')
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
