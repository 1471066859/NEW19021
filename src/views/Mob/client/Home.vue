<template>
  <div class="mob_home">
    <app-hd :left_btn="left_btn" :hd_msg="hd_msg" :right_btn="!left_btn" />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import '@/hotcss/hotcss'
import Header from '@/views/Mob/components/Header'
export default {
  components: {
    'app-hd': Header
  },
  data() {
    return {
    }
  },
  computed: {
    hd_msg() {
      const { path } = this.$route;
      let msg = null
      path == '/client/order_detal' ? msg = '订单详情' : msg = 'WELCOME'
      return msg;
    },
    // 控制返回按钮可见性
    left_btn() {
      const { path } = this.$route;
      let is_show = null;
      path == '/client/add_order' ? is_show = false : is_show = true;
      return is_show;
    }
  },
  methods: {
  },
  // 判断是否登录
  beforeRouteEnter(to, from, next) {
    let userInfo = sessionStorage.getItem("userId");
    if (userInfo) {
      next();
    } else {
      next(vm => {
        vm.$router.push('/mlogin')
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
html,
body,
#app {
  box-sizing: border-box;
  height: 100%;
}
.mob_home {
  width: 100vw;
  height: 100%;
  .content {
    padding-top: px(40);
    box-sizing: border-box;
    overflow: scroll;
    height: 100%;
  }
}
</style>