<template>
  <div class="login-container">
    <vue-particles color="#dedede" :particle-opacity="0.7" :particles-number="80" shape-type="circle" :particle-size="4"
      lines-color="#dedede" :lines-width="1" :line-linked="true" :line-opacity="0.4" :lines-distance="150" :move-speed="3"
      :hover-effect="true" hover-mode="grab" :click-effect="true" click-mode="push" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" /></span>
        <el-input ref="username" v-model="loginForm.username" v-focus :placeholder="$t('login.username')" name="username"
          type="text" tabindex="1" autocomplete="on" clearable />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" /></span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" :placeholder="$t('login.password')"
            name="password" tabindex="2" autocomplete="on" clearable @keyup.native="checkCapslock" @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
      </el-tooltip>

      <el-row style="margin-top:10px;">
        <drag-verify :width="450" :height="30" text="请按住拖动滑块验证" successText="验证成功" background="blue"
          progressBarBg="red" completedBg="yellow" handlerBg="pink" handlerIcon="el-icon-d-arrow-right"
          textSize="15" successIcon="el-icon-circle-check" ref="Verify"  @passcallback="passcallback2">
        </drag-verify>

      </el-row>


      <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin()" @keyup.enter="handleLogin()">{{ $t('login.logIn') }}</el-button>
    </el-form>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.min.css'
  import dragVerify from 'vue-drag-verify'
  // import { validUsername } from '@/utils/validate'
  import LangSelect from '@/components/LangSelect'
  export default {
    name: 'Login',
    components: {
      LangSelect,
      dragVerify
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error(this.$t('login.errorName')))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error(this.$t('login.errorPassword')))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      passcallback2() {
         alert(this.$refs.Verify.isPassing)
      },
      checkCapslock(e) {
        const {
          key
        } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        console.info('1.登录页面按钮点击')
        const _this = this
        _this.$refs.loginForm.validate(valid => {
          if (valid) {
            _this.loading = true
            _this.$store
              .dispatch('user/login', _this.loginForm)
              .then(res => {
                console.log('res', res)
                if (res.IsPass === true) {
                  _this.$router.push({
                    path: '/'
                  })
                } else {
                  this.$message.error(res.MSG)
                }
                console.info('3.vuex 里面的 login 方法被调用 完毕', _this.$route.query.redirect)
                // _this.$router.push({ path: _this.redirect || '/', query: _this.otherQuery })

                _this.loading = false
              })
              .catch(() => {
                _this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }

        &::-webkit-input-placeholder {
          color: #ffffff;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .svg-icon {
      color: #ffffff;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #ffffff;

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    // background-image: linear-gradient(to right, #1a68ad, #4ea962);
    background-image: url(../../assets/home/bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 50px 35px 50px 35px;
      margin: -750px auto;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 20px;

      .el-button {
        width: 100%;
        margin-top: 10px;
        background-color: #f8b502;
        border: 1px solid #f8b502;
        font-weight: bold;
        letter-spacing: 5px;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 35px;
        color: $light_gray;
        margin: 0px auto 30px auto;
        text-align: center;
        font-weight: bold;
        letter-spacing: 5px;
        font-family: '宋体';
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    .login-form ::v-deep input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      -webkit-text-fill-color: #ededed !important;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      background-color: transparent;
      background-image: none;
      transition: background-color 50000s ease-in-out 0s;
    }

    .login-form ::v-deep input {
      background-color: transparent;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }

    @media screen and (min-width:1601px) and (max-width:1900px) {
      .login-form {
        margin: -600px auto;
      }
    }

    @media screen and (min-width:1350px) and (max-width:1600px) {
      .login-form {
        margin: -580px auto;
      }
    }

    @media screen and (min-width:1000px) and (max-width:1349px) {
      .login-form {
        margin: -450px auto;
      }
    }

  }
</style>
