<template>
  <div class="app-container">
    <div class="TestWord">
      <el-button @click="addLine">添加行数</el-button>
      <el-button @click="save">保存</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="bookname" label="书名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bookname" placeholder="书名" />
          </template>
        </el-table-column>
        <el-table-column prop="bookvolume" label="册数">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bookvolume" placeholder="册数" />
          </template>
        </el-table-column>
        <el-table-column prop="bookbuyer" label="购买者">
          <template slot-scope="scope">

            <el-input v-model="scope.row.bookbuyer" placeholder="购买者" />
          </template>
        </el-table-column>
        <el-table-column prop="bookborrower" label="借阅者">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bookborrower" placeholder="借阅者" />
          </template>
        </el-table-column>
        <el-table-column prop="bookbuytime" label="购买日期">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.bookbuytime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="购买日期"
            />
          </template>
        </el-table-column>
        <el-table-column prop="bookbuytime" label="购买日期">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.editing"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TestWorld',
  data() {
    return {
      tableData: [{
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: ''
      }]
    }
  },
  methods: {
    addLine() { // 添加行数
      var newValue = {
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: ''
      }
      // 添加新的行数
      this.tableData.push(newValue)
    },
    handleDelete(index) { // 删除行数
      this.tableData.splice(index, 1)
    },
    save() {
      // 这部分应该是保存提交你添加的内容
      console.log(JSON.stringify(this.tableData))
    }
  }

}

</script>

<style lang="scss" scoped></style>
