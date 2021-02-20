<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="waringShow" :before-close="waringClose" title="异常明细维护表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常编号" placement="top-start"><label class="radio-label">异常编号:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchWaring.ExceptNum" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常名称" placement="top-start"><label class="radio-label">异常名称:</label></el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchWaring.ExceptName" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :enterable="false" content="异常类型" placement="top-start"><label class="radio-label">异常类型:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="paginationSearchWaring.ExceptType" placeholder="异常类型" clearable style="width: 100%">
              <el-option v-for="item in ExceptTypeData" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="3">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchWaring">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="waringBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="waringData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="waringClick"
    >

      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常编号" width="150" prop="ExceptNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常名称" width="150" prop="ExceptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常类型" width="150" prop="ExceptTypeText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ExceptTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="异常部门" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否Andon" width="150" prop="IsAndonText" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.IsAndonText === '否' ? '#FF5757' : '#13ce66' }">{{ scope.row.IsAndonText }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Remark }}
        </template>
      </el-table-column>

    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'WaringName',
  props: {
    waringShow: {
      type: Boolean,
      default: true
    },
    waringBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },

    ExceptTypeData: {
      type: Array,
      default: function() {
        return []
      }
    },

    waringData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchWaring: {
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
    // 异常发送组弹窗关闭
    waringClose() {
      this.$emit('waringClose')
    },
    //  异常发送组双击确认
    waringClick(row) {
      this.$emit('waringClick', row)
    },
    // 异常发送组查询
    handleSearchWaring() {
      this.$emit('handleSearchWaring')
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
