<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$emit('child-even',lang)
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      if(lang=='en'){
        this.$message({
          message: 'Switch Language Success!',
          type: 'success'
        })
      }else{
        this.$message({
          message: '语言切换成功!',
          type: 'success'
        })
      }

    }
  }
}
</script>
