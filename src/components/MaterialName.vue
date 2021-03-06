<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="materialShow" :before-close="materialClose" title="原料信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="原料编号" placement="top-start">
              <label class="radio-label">原料编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchMaterial.MaterialNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="原料名称" placement="top-start">
              <label class="radio-label">原料名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchMaterial.Name" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchMaterial">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="materialBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="materialData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="materialClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="原料编号" width="150" prop="MaterialNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MaterialNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="原料名称" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="物料类型" width="150" prop="TypeName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.TypeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="原料规格" width="150" prop="Spec" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Spec }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="颜色" width="150" prop="Color" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Color }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="150" prop="UnitText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.UnitText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否免检" width="150" prop="IsInspection" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsInspection === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsInspection === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationSearchMaterial.PageIndex" :size.sync="paginationSearchMaterial.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'MaterialName',
  components: { Pagination },
  props: {
    materialShow: {
      type: Boolean,
      default: true
    },
    materialBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    materialData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchMaterial: {
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
    // 物料名称弹窗关闭
    materialClose() {
      this.$emit('materialClose')
    },
    //  物料名称双击确认
    materialClick(row) {
      this.$emit('materialClick', row)
    },
    //  物料名称查询
    handleSearchMaterial() {
      this.$emit('handleSearchMaterial')
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },
    // 分页
    table_index(index) {
      return (this.paginationSearchMaterial.PageIndex - 1) * this.paginationSearchMaterial.PageSize + index + 1
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
