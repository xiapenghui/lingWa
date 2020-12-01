<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="userShow" title="客户名称" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="客户编码" placement="top-start">
              <label class="radio-label">{{ $t('permission.CustomerNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="paginationUser.CustomerNum" /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" content="客户名称" placement="top-start">
              <label class="radio-label">{{ $t('permission.FullName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="paginationUser.FullName" /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleUserBox">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="userBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: '#46a6ff', color: '#ffffff' }"
      :data="userData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="userClick"
    >
      <el-table-column align="center" label="客户编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.CustomerNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.FullName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系人" width="150">
        <template slot-scope="scope">
          {{ scope.row.ShortName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" width="150">
        <template slot-scope="scope">
          {{ scope.row.Describe }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" width="150">
        <template slot-scope="scope">
          {{ scope.row.Color }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" width="150">
        <template slot-scope="scope">
          {{ scope.row.MaterialTypeText }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="150">
        <template slot-scope="scope">
          {{ scope.row.MaterialType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护者" width="150">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="维护时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.ModifyTime }}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
const fixHeightBox = 350
export default {
  name: 'CustomerName',
  props: {
    userShow: {
      type: Boolean,
      default: true
    },
    userBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    userData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationUser: {
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
    // 客户名称弹窗关闭
    userClose() {
      this.$emit('userClose')
    },
    //  客户名称双击确认
    userClick(row) {
      this.$emit('userClick', row)
    },
    //  客户名称查询
    handleUserBox() {
      this.$emit('handleUserBox')
    }

  }
}
</script>
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
