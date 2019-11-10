<template>
  <div class="login">
    <div class="input_wrap">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="formLabelAlign.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password placeholder="请输入密码" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-row>
          <el-button @click="loginFuc" type="primary">登录</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { setSession, getSession, isMobile } from '@/Tools/intScaleNum'
export default {
  data() {
    return {
      formLabelAlign: {
        user_name: '',
        password: '',
      }
    };
  },
  created() {
    sessionStorage.removeItem('userInfo')
  },
  // 判断设备信息跳转不同设备登录页
  beforeRouteEnter(to, from, next) {
    let isMob = isMobile();
    if (isMob) next('/mlogin');
    else next()
  },
  methods: {
    loginFuc() {
      let { user_name, password } = this.formLabelAlign;
      user_name == 'mql' && password == 'mql' ? this.trueLogin() : this.falseLogin();
    },
    trueLogin() {
      this.$notify({
        title: '登录成功',
        message: '欢迎您',
        type: 'success'
      });
      setSession('userInfo', 2);
      this.$router.push({
        path: '/page',
        query: {
          title: '全部订单'
        }
      });
      // console.log(this.$store.state.is_login)
    },
    falseLogin() {
      // alert('用户名密码错误')
      this.formLabelAlign.user_name = '';
      this.formLabelAlign.password = '';
      this.$notify({
        title: '登录失败',
        message: '用户名或密码错误',
        type: 'error'
      });

    }
  }
}
</script>

<style lang="scss" scope>
.login {
  width: 100vw;
  // background: url(../assets/img/bg.jpg);
  background-size: cover;
  height: 100vh;
  padding-top: 300px;
  box-sizing: border-box;
  // background-color: #ccc;
  .input_wrap {
    width: 30vw;
    margin: 0 auto;
    // margin-top: 300px;
  }
}
</style>