<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="materShow" :before-close="materClose" title="物料类型表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="类型编号" placement="top-start"><label class="radio-label">类型编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchMater.TypeNum" placeholder="类型编号" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="类型名称" placement="top-start"><label class="radio-label">类型名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchMater.Name" placeholder="类型名称" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchMater">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="materBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="materData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="materClick"
    >
      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料类型编号" width="200" prop="TypeNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TypeNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料类型名称" width="200" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" min-width="200" :show-overflow-tooltip="true">
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
  name: 'MaterType',
  props: {
    materShow: {
      type: Boolean,
      default: true
    },
    materBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    materData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchMater: {
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
    // 物料名称弹窗关闭
    materClose() {
      this.$emit('materClose')
    },
    //  物料名称双击确认
    materClick(row) {
      this.$emit('materClick', row)
    },
    //  物料名称查询
    handleSearchMater() {
      this.$emit('handleSearchMater')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .searchBox {
    .el-col-6 {
      height: 30px;
      line-height: 25px;
      text-align: right;
    }
  }
}
</style>
