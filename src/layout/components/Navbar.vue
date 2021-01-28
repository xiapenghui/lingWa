<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-tooltip :content="$t('navbar.size')" effect="dark" :enterable="false" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip :content="$t('navbar.words')" effect="dark" :enterable="false" placement="bottom" style="display: none;">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip :content="$t('navbar.Chinese')" effect="dark" :enterable="false" placement="bottom"><lang-select class="right-menu-item hover-effect" /></el-tooltip>
      </template>
      <el-select v-model="companyVal" placeholder="请选择" style="bottom: 7px; width: auto; " @change="changeCompany">
        <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value" />
      </el-select>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div v-rest-styleColor="theme" class="avatar-wrapper">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          {{ this.$store.state.permission.userName }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item><span style="display:block;" @click="revisePas">修改密码</span></el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密 -->
    <el-dialog v-dialogDrag title="修改密码" :visible.sync="dialogPassWord" :modal-append-to-body="false" :close-on-click-modal="false" width="30%">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:">{{ this.$store.state.permission.userName }}</el-form-item>
        <el-form-item label="密码:" prop="AccountPwd"><el-input v-model.trim="ruleForm.AccountPwd" type="password" :show-password="true" /></el-form-item>
        <el-form-item label="确认密码:" prop="checkPass"><el-input v-model.trim="ruleForm.checkPass" type="password" :show-password="true" /></el-form-item>
        <el-form-item style="text-align: center"><el-button type="primary" @click="submitForm('ruleForm')">提交</el-button></el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
// import Search from '@/components/HeaderSearch'
import { UpdatePassword } from '@/api/role'
import { GetAuthOrganizationRange, ChangeOrganization, Logout } from '@/api/user'
import Bus from '@/api/bus.js'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    LangSelect
    // Search
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.AccountPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogPassWord: false,
      companyVal: '',
      options: [],
      ruleForm: {
        UserCode: this.$store.state.permission.userCode,
        AccountPwd: '',
        checkPass: ''
      },
      rules: {
        AccountPwd: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'username']),
    theme() {
      return this.$store.state.settings.theme
    }
  },

  created() {
    this.companyList()
    const self = this
    Bus.$on('companyList', function() {
      self.companyList()
    })

    // Bus.$on('changeCompanyList', function() {
    //   self.changeCompanyList()
    // })
  },

  methods: {
    // 获取导航公司下拉
    companyList() {
      GetAuthOrganizationRange().then(res => {
        if (res.IsPass === true) {
          this.options = res.Obj
          this.companyVal = res.Obj[0].text
        }
      })
    },

    // // 获取当前用户授权公司列表
    // changeCompanyList() {
    //   GetAuthOrganizationRange().then(res => {
    //     if (res.IsPass === true) {
    //       this.options = res.Obj
    //     }
    //   })
    // },

    // 主页面切换公司
    changeCompany(val) {
      const params = {
        UserCode: this.$store.state.permission.userCode,
        OrgCode: val
      }
      ChangeOrganization(params).then(res => {
        if (res.IsPass === true) {
          this.$message({
            type: 'success',
            message: res.MSG
          })
        }
      })
    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      Logout().then(res => {
        Bus.$emit('clearTag')
        this.$store.dispatch('user/logout')
        this.$store.dispatch('permission/logout')
        this.$router.push({ path: '/login' })
      })
      // Bus.$emit('clearTag')
      // this.$store.dispatch('user/logout')
      // this.$store.dispatch('permission/logout')
      // this.$router.push({ path: '/login' })
    },
    // 修改密码
    revisePas() {
      this.dialogPassWord = true
    },
    // 密码提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          UpdatePassword(this.ruleForm).then(res => {
            if (res.IsPass === true) {
              this.$message({
                type: 'success',
                message: '修改密码成功,请从新登录!'
              })
              this.dialogPassWord = false
              setTimeout(() => {
                this.logout()
              }, 2000)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 40px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
