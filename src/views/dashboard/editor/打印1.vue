<template>
  <div class="app-container">
    <el-button title="打印" @click="Toprint">
      <div>
        <i class="iconfont kf-dayin" />
        打印
      </div>
    </el-button>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: ' #1890ff ', color: '#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="行号" width="50" type="index" :index="table_index" fixed />

      <el-table-column align="center" type="selection" width="55" fixed />

      <el-table-column prop="name" label="名字" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="phone" label="电话" />
    </el-table>
  </div>
</template>

<script>
import printJS from 'print-js'
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '111-111-1111'
        },
        {
          name: 'Barry Allen',
          email: 'barry@flash.com',
          phone: '222-222-2222'
        },
        {
          name: 'Cool Dude',
          email: 'cool@dude.com',
          phone: '333-333-3333'
        }
      ]
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    Toprint() {
      printJS({
        header: `<div style="display: flex;flex-direction: column;text-align: center">
                   <h3>还款情况</h3>
                 </div>`,
        printable: this.multipleSelection,
        // properties: ['name', 'email', 'phone'],
        properties: [{ field: 'name', displayName: '姓名' }, { field: 'email', displayName: '邮箱' }, { field: 'phone', displayName: '电话' }],
        type: 'json',
        gridHeaderStyle: 'border: 1px solid #000;text-align:center',
        gridStyle: 'border: 1px solid #000;text-align:center'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
