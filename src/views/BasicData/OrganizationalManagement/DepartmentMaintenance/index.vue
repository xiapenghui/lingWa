<template>
  <div class="app-container">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>{{ index + 1 }}</span>
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['第一个', '第2个', '第3个', '第4个', '第5个', '第6个']
    }
  },
  methods: {}
}
</script>
<style scoped="scoped">
li {
  list-style: none;
}
</style>
