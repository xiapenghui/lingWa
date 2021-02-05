
<template>
  <div class="dashboard-editor-container"><div class="center">欢迎您登录上海灵娃MES系统</div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Editor',

  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  }
}
</script>

<style lang="scss" scoped>
  .hasTagsView .app-main,
  .hasTagsView .fixed-header + .app-main {
    padding-top: 0 !important;
  }
  .hasTagsView .app-main{
    max-height: initial !important;
  }
.dashboard-editor-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  -webkit-display: flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  text-align: center;
  .center{
    width: 100%;
    height: 300px;
    font-size: 3.5rem;
    font-weight: bold;
    letter-spacing: 5px;
    color: #0a76da;
  }
}
</style>
