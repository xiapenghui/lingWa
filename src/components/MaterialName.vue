<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="materialShow" :before-close="materialClose" title="原料编码" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="原料编码" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="paginationSearchMaterial.MaterialNum" /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="原料名称" placement="top-start">
              <label class="radio-label">{{ $t('permission.ProductNane') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="paginationSearchMaterial.Name" /></el-col>
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
      :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
      :data="materialData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="materialClick"
    >
      <el-table-column align="center" label="原料编码" width="150">
        <template slot-scope="scope">
          {{ scope.row.MaterialNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="原料名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="原料规格" width="150">
        <template slot-scope="scope">
          {{ scope.row.Spec }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="颜色" width="100">
        <template slot-scope="scope">
          {{ scope.row.Color }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="单位" width="100">
        <template slot-scope="scope">
          {{ scope.row.UnitText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否免检" width="100">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsInspection === false ? '#FF5757' : '#13ce66' }">{{ scope.row.IsInspection === false ? '否' : '是' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime | substringTime }}
        </template>
      </el-table-column>
    </el-table></el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'MaterialName',
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
