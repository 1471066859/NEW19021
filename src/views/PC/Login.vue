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
    // 判断页面是否存在登录信息，存在即清楚登录信息发送退出登录请求
    if (getSession('loginId')) {
      const data = {
        loginId: getSession('loginId'),
      };
      this.axios.post('/api/webapi/user/logout', this.qs.stringify(data))
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            sessionStorage.clear();
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  // 判断设备信息跳转不同设备登录页
  beforeRouteEnter(to, from, next) {
    let isMob = isMobile();
    if (isMob) next('/mlogin');
    else next()
  },
  methods: {
    //登录方法
    loginFuc() {
      let { user_name, password } = this.formLabelAlign;
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
    // 成功登录
    trueLogin(data) {
      if (data.role == 0) {
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
      } else {
        this.$notify({
          title: '登录失败',
          message: `权限不足无法登录`,
          type: 'error'
        });
      }

    },
    // 登录失败
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