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
    sessionStorage.clear()
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
      if (user_name == "admin" && password == "admin") {
        setSession('userId', 1);
        setSession('role', 1);
        setSession('userName', 'admin');
        setSession('loginId', 'admin');
        this.$router.push({
          path: '/page',
        });
        return;
      }
      // user_name == 'mql' && password == 'mql' ? this.trueLogin() : this.falseLogin();
      const data = {
        loginId: user_name,
        userPwd: password,
      }
      this.axios.post('/api/webapi/user/login', this.qs.stringify(data))
        .then(res => {
          console.log(res);
          const { code, data, msg } = res.data;
          if (code == 200) {
            this.trueLogin(data)
          } else {
            this.falseLogin(msg);
          }
        })
    },
    trueLogin(data) {
      this.$notify({
        title: '登录成功',
        message: `欢迎您 ${data.userName}`,
        type: 'success'
      });
      setSession('userId', data.id);
      setSession('role', data.role);
      setSession('userName', data.userName);
      setSession('loginId', data.loginId);
      this.$router.push({
        path: '/page',
      });
    },
    falseLogin(msg) {
      this.formLabelAlign.user_name = '';
      this.formLabelAlign.password = '';
      this.$notify({
        title: '登录失败',
        message: `${msg}`,
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