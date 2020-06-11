<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Tixon Console</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号."
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="num" class="yzm">
        <span class="el-icon-chat-dot-square" style="color:#889aa4;padding-left:15px"></span>
        <!-- <span class="svg-container">
          <svg-icon icon-class="el-icon-chat-dot-square" />
        </span> -->
        <el-input
          ref="num"
          v-model="loginForm.num"
          placeholder="请输入验证码"
          name="num"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
          <el-button style="width:120px;padding:0;text-align:center;line-height:40px" :loading="yzmLoading" :disabled="yzmBtnDisabled" @click="getYzCode">{{ yzmTime }}</el-button>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>


    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login, logout, getInfo, verifyCode } from '@/api/user'
import { isEmpty } from '../../utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value)
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const validcodeName=(rule,value,callback)=>{
      let mobileReg=/^1[3-9]\d{9}$/
      let EmailReg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
      if(value.indexOf('@') === -1){   
          if(!mobileReg.test(value)){
              callback(new Error('用户名格式不正确,请用手机号或者是邮箱来作为用户名'))
          }else{
              callback()
          }
      }else{
          if(!EmailReg.test(value)){
              callback(new Error('用户名格式不正确,请用手机号或者是邮箱来作为用户名'))
          }else{
              callback()
          }
      }
    };

    return {
      yzmTime:'获取验证码',
      yzmBtnDisabled:false,
      yzmLoading:false,
      loginForm: {
        username: '',
        password: '',
        num:''
      },
      loginRules: {
        username: [
          {required:true,message:'账号不能为空',trigger:'blur'},
          {validator:validcodeName,trigger:'blur'}
        ],
        password: [{ required: true, trigger: 'blur',message:'密码不能为空' }],
        num: [{ required: true, trigger: 'blur',message:'验证码不能为空' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted(){
      // this.yzmBtnDisabled = false

  },
  methods: {
    getYzCode(){
      this.$refs.loginForm.validateField('username',errmsg => {
        if (errmsg) {
          this.$message({
            message:'账号不合法,请检查',
            type:'error'
          })
        } else {
          this.yzmLoading =true
          verifyCode({username:this.loginForm.username}).then(res=>{
            this.yzmLoading =false
            if(res.statusCode === 0){
              this.yzmBtnDisabled = true
              let time = 59;
              this.yzmTime = 60+"  秒后重发"
              const timer = setInterval(() => {
                let currentNum = time--
                this.yzmTime = `${currentNum} 秒后重发`;
                if(time <=-1){
                  this.yzmTime = '重新获取验证码'
                  this.yzmBtnDisabled =false;
                  clearTimeout(timer)
                }

              }, 1000);
              this.$message({
                message:'验证码发送成功,请注意查收',
                type:'success'
              })
            }
          }).catch(()=>{
            this.yzmLoading =false
          })
        }
      })

     
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
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
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
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .yzm{
    // width: 300px;
    position: relative;
    // .login-container .el-input{
    //   width: 200px;
    // }
    .el-button{
      position: absolute;
      top: 3px;
      right: 10px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
}
</style>
