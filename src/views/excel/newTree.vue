<template>
  <div class="app-container">
    <el-button style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">{{ $t('excel.selectedExport') }}</el-button>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="date" label="日期" sortable width="180" />
      <el-table-column prop="name" label="姓名" sortable width="180" />
      <el-table-column prop="address" sortable label="地址" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '启用'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '啊小虎',
          address: '启用'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '波小虎',
          address: '禁用',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '吃小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '地小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '禁用'
        }
      ]
    }
  },

  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
    handleDownload() {
      debugger
      if (this.tableData.length) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['日期', '姓名', '地址']
          const filterVal = ['date', 'name', 'address']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data
          })
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style></style>
