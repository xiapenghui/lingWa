<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :visible.sync="personShow" :before-close="personClose" title="人员信息表" width="70%" height="50%">
    <div class="searchBox" style="margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="员工编号" placement="top-start">
              <label class="radio-label">员工编号:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchPerson.JobNum" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" :enterable="false" content="员工名称" placement="top-start">
              <label class="radio-label">员工名称:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model.trim="paginationSearchPerson.NameCN" clearable /></el-col>
        </el-col>

        <el-col :span="4">
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="handleSearchPerson">{{ $t('permission.search') }}</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="personBoxLoading"
      :height="tableBoxHeight"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="personData"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @row-dblclick="personClick"
    >

      <el-table-column align="center" label="行号" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="员工编号" width="150" prop="JobNum" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.JobNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="员工名称" width="150" prop="NameCN" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.NameCN }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别" width="150" prop="Gender" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.Gender === true ? '#FF5757' : '#13ce66' }">{{ scope.row.Gender === true ? '男' : '女' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="部门" width="150" prop="DeptName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.DeptName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="职务" width="150" prop="JobName" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.JobName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否在职" width="150" prop="OnJob" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag :style="{ color: scope.row.OnJob === true ? '#13ce66': '#FF5757' }">{{ scope.row.OnJob === true ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="移动端密码" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮件地址" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="腕表地址" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="微信号" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="Mwssage" width="150" prop="MobilePwd" sortable :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.MobilePwd }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="200" prop="Remark" sortable :show-overflow-tooltip="true">
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
  name: 'PersonName',
  props: {
    personShow: {
      type: Boolean,
      default: true
    },
    personBoxLoading: {
      type: Boolean,
      default: true
    },
    tableBoxHeight: {
      type: Number,
      default: window.innerHeight - fixHeightBox
    },
    personData: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationSearchPerson: {
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
    personClose() {
      this.$emit('personClose')
    },
    // 成品名称双击确认
    personClick(row) {
      this.$emit('personClick', row)
    },
    // 成品名称查询
    handleSearchPerson() {
      this.$emit('handleSearchPerson')
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
