<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="lineShow" title="列表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="7">
            <el-tooltip class="item" effect="dark" content="工艺路线名称" placement="top-start"><label class="radio-label">工艺路线名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="paginationSearchLine.Name" clearable /></el-col>
        </el-col>
        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="lineBox">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="lineLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#004184 ', color: '#ffffff' }"
      :data="lineData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="lineClick"
    >
      <el-table-column align="center" label="工艺路线名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="版本" width="200">
        <template slot-scope="scope">
          {{ scope.row.Version }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.Description }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生效时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.EffectiveDate | substringTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="200">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Status === false ? '#FF5757' : '#13ce66' }">{{ scope.row.Status === false ? '禁用' : '启用' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="200">
        <template slot-scope="scope">
          {{ scope.row.ModifyUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="200">
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
  name: 'LineName',
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
    lineBox() {
      this.$emit('lineBox')
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
