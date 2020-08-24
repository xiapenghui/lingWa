<!-- 建议新建单独组件 -- components/MyEltable/index.vue -->
<template>
  <!-- stripe:是否为斑马纹 table; -->
  <!-- border:是否带有纵向边框; -->
  <!-- fit:列的宽度是否自撑开; -->
  <!-- highlight-current-row:是否要高亮当前行; -->
  <el-table
    ref="multipleTable"
    v-loading="loading"
    :data="rolesList"
    border
    stripe
    fit
    highlight-current-row
    :height="tabheight"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    @row-dblclick="rowDblclick"
  >
    <!-- 是否需要全选， isshow控制-->
    <el-table-column v-if="isshow" type="selection" align="center" fixed />
    <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值),
        oper: 是否有操作列, oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 -->
    <el-table-column v-for="(th, key) in tableHeader" :key="key" :prop="th.prop" :label="th.label" :fixed="th.fixed" :width="th.width" :min-width="th.minWidth" align="left">
      <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，这里操作一栏的名字定死（oper表示是操作这一列，否则就不是） -->
      <template slot-scope="scope">
        <div v-if="th.oper">
          <el-button v-for="(o, index) in th.oper" :key="index" :type="o.style" :icon="o.icon" size="small" @click="o.clickFun(scope.row)">{{ o.name }}</el-button>
        </div>
        <!--formatData：自定义过滤器-->
        <div v-else>
          <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
          <span v-else>
            <!--这一块做el-tag标签样式判断。不需要可以去除判断 ** start **-->
            <el-tag v-if="th.isok == 1 && scope.row[th.prop] == true">{{ scope.row[th.prop] | formatters(th.formatData) }}</el-tag>
            <el-tag v-else-if="th.isok == 1 && scope.row[th.prop] == false" type="success">{{ scope.row[th.prop] | formatters(th.formatData) }}</el-tag>
            <!-- ** end**-->
            <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Index',
  // 传入的数据
  props: {
    rolesList: {
      // 表格数据
      type: Array,
      default: function() {
        return []
      }
    },
    rowDblclick: {
      // 单行点击事件
      type: Function,
      default: (row, event, column) => {
        console.log('default: ' + row + '---' + event + '---' + column)
      }
    },
    tableHeader: {
      // 表格头部
      type: Array,
      default: function() {
        return []
      }
    },
    tabheight: {
      type: String,
      default: '100%'
    },
    loading: {
      // 加载等待
      type: Boolean,
      default: false
    },
    isshow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取选择行数信息
    getmydata() {
      const data = this.$refs.multipleTable.selection
      const IDS = []
      for (let i = 0; i < data.length; i++) {
        IDS.push(data[i].ID)
      }
      this.$emit('func', IDS)
    }
  }
}
</script>

<style scoped></style>
