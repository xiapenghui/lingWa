<template>
  <div class="app-container">
    <el-tree default-expand-all :data="data">
      <span

        slot-scope="{ node, data }"
        class="custom-tree-node"
        style="width:100%;"
        @mouseenter="mouseenter(data)"
        @mouseleave="mouseleave(data)"
      >
        <span>{{ node.label }}</span>
        <el-link v-show="data.show" size="mini" style="margin-left: 5px" type="primary" icon="el-icon-plus" />
        <el-link v-show="data.show" size="mini" style="margin-left: 5px" type="primary" icon="el-icon-delete" />
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 0,
          label: '水果',
          show: true,
          children: [
            {
              id: 1,
              label: '苹果',
              show: true
            }, {
              id: 2,
              label: '芒果',
              show: true
            }
          ]
        }
      ]
    }
  },

  methods: {
    mouseenter(data) {
      console.log(data)
      data.show = true
    },

    mouseleave(data) {
      console.log(data)
      data.show = false
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
