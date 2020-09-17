<template>
  <div class="app-container">
    <el-popconfirm title="删除后不可恢复，确认删除？" @onConfirm="deleteCollection">
      <el-button slot="reference" class="collection_delete" type="danger">删除</el-button>
    </el-popconfirm>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    deleteCollection() {
      alert(123)
    }

  }
}
</script>

<style></style>
