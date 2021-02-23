<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="userShow" :before-close="userClose" title="客户信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="客户编号" placement="top-start">
              <label class="radio-label">{{ $t('permission.CustomerNum') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationUser.CustomerNum" /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="客户名称" placement="top-start">
              <label class="radio-label">{{ $t('permission.FullName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationUser.FullName" /></el-col>
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
      :header-cell-style="{ background: '#1890ff ', color: '#ffffff' }"
      :data="userData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="userClick"
    >

      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" label="客户编号" width="150" prop="CustomerNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.CustomerNum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称" width="150" prop="FullName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.FullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系人" width="150" prop="Contact" sortable>
        <template slot-scope="scope">
          {{ scope.row.Contact }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" width="150" prop="Name" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Tel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" width="150" prop="Email" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Email }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" prop="Address" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.Address }}
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationUser.PageIndex" :size.sync="paginationUser.PageSize" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
const fixHeightBox = 350
export default {
  name: 'CustomerName',
  components: { Pagination },
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
    },

    getLogList(val) {
      this.$emit('pageChange', val)
    },

    // 分页
    table_index(index) {
      return (this.paginationUser.PageIndex - 1) * this.paginationUser.PageSize + index + 1
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
