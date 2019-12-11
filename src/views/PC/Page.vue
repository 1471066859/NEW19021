<template>
  <div class="page">
    <!-- 左侧导航部分 -->
    <div class="pageNav">
      <h1>智能仿真产线系统</h1>
      <NavBar></NavBar>
    </div>
    <!-- 右侧内容 -->
    <div class="pageContent">
      <!-- 头部信息 -->
      <header>
        <i class="logoutBtn">
          <el-button type="text" :loading="logoutLoad" @click="logoutFn">退出登录</el-button>
        </i>
        <h1>产线001</h1>
      </header>
      <!-- 页面导航 -->
      <div class="pageRouterBox">
        {{pageHeader}}
        <span>/</span>
        {{pageRouterBox}}
      </div>
      <!-- 功能模块区域 -->
      <div class="pageFnWrap">
        <!-- <transition name="el-zoom-in-center"> -->
        <router-view></router-view>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>
<script>

import { setSession, getSession } from '@/Tools/intScaleNum'
import { pageHeader, pageRouterBox } from '@/Tools/routerTitle'
import NavBar from '@/views/PC/components/NavBar'

export default {
  data() {
    return {
      // 退出登录按钮loading
      logoutLoad: false,
    }
  },
  created() {

  },
  methods: {
    // 退出登录
    postLogoutFn() {
      this.logoutLoad = true;
      const data = {
        loginId: getSession('loginId')
      };
      this.axios.post('/api/webapi/user/logout', this.qs.stringify(data))
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            sessionStorage.clear();
            this.$router.push('/login');
            this.$notify({
              type: 'success',
              message: '退出成功!'
            });
          }
          this.logoutLoad = false;
        })
        .catch(err => {
          console.log(err);
        })
    },
    // 退出登录前提醒
    logoutFn() {
      this.$confirm('您确定要退出登录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postLogoutFn();
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消操作'
        });
      });

    },
  },
  computed: {
    pageHeader,
    pageRouterBox,
    /**
    pageHeader() {
      const { path } = this.$route;
      switch (path) {
        case '/page/BoxAdmin':
          return '料盒管理系统'
          break;

        case '/page/Materials':
          return '仓储管理系统'
          break;
        case '/page/ProductAdmin':
          return '仓储管理系统'
          break;

        case '/page/ProAdmin':
          return '产线管理系统'
          break;

        case '/page/AllOrder':
          return '订单管理系统'
          break;

        case '/page/ErrorOrder':
          return '订单管理系统'
          break;

        case '/page/ProingOrder':
          return '订单管理系统'
          break;

        case '/page/CarryOrder':
          return '订单管理系统'
          break;

        case '/page/AwatOrder':
          return '订单管理系统'
          break;

        case '/page/UserInfo':
          return '后台管理'
          break;

        case '/page/Chart':
          return '报表系统'
          break;

        case '/page/ProReportR':
          return '生产报表系统'
          break;

        case '/page/ProReportZ':
          return '生产报表系统'
          break;

        case '/page/ProReportY':
          return '生产报表系统'
          break;

        case '/page/ProReportJ':
          return '生产报表系统'
          break;

        case '/page/ProReportN':
          return '生产报表系统'
          break;
        case '/page/StuffChart':
          return '原材料报表系统'
          break;
        case '/page/StuffReportR':
          return '原材料报表系统'
          break;
        case '/page/StuffReportZ':
          return '原材料报表系统'
          break;
        case '/page/StuffReportY':
          return '原材料报表系统'
          break;
        case '/page/StuffReportJ':
          return '原材料报表系统'
          break;
        case '/page/StuffReportN':
          return '原材料报表系统'
          break;
        case '/page/OrderQuality':
          return '质量管理系统'
          break;
        case '/page/StuffQuality':
          return '质量管理系统'
          break;

        default:
          break;
      }
    },
    pageRouterBox() {
      const { path } = this.$route;
      switch (path) {
        case '/page/BoxAdmin':
          return '料盒出入库管理'
          break;

        case '/page/Materials':
          return '物料出入库管理'
          break;
        case '/page/ProductAdmin':
          return '成品出入库管理'
          break;

        case '/page/ProAdmin':
          return '产线管理'
          break;

        case '/page/AllOrder':
          return '全部订单'
          break;

        case '/page/ErrorOrder':
          return '异常订单'
          break;

        case '/page/ProingOrder':
          return '正在生产订单'
          break;

        case '/page/CarryOrder':
          return '完成生产订单'
          break;

        case '/page/AwatOrder':
          return '等待生产订单'
          break;
        case '/page/UserInfo':
          return '账号管理'
          break;

        case '/page/Chart':
          return '生产报表总览'

          break;
        case '/page/ProReportR':
          return '日生产报表'

          break;
        case '/page/ProReportZ':
          return '周生产报表'

          break;
        case '/page/ProReportY':
          return '月生产报表'

          break;
        case '/page/ProReportJ':
          return '季生产报表'

          break;
        case '/page/ProReportN':
          return '年生产报表'

        case '/page/StuffChart':
          return '原材料报表总览'

        case '/page/StuffReportR':
          return '日原材料报表'
          break;
        case '/page/StuffReportZ':
          return '周原材料报表'
          break;
        case '/page/StuffReportY':
          return '月原材料报表'
          break;
        case '/page/StuffReportJ':
          return '季原材料报表'
          break;
        case '/page/StuffReportN':
          return '年原材料报表'
          break;
        case '/page/OrderQuality':
          return '成品质量管理'
          break;
        case '/page/StuffQuality':
          return '原材料质量管理'
          break;

        default:
          break;
      }
    }
    */
  },
  components: {
    NavBar,

  },
  // 判断是否权限 0 为管理员 1为普通用户
  beforeRouteEnter(to, from, next) {
    let role = sessionStorage.getItem("role");
    if (role == 0) {
      next();
    } else {
      next(vm => {
        vm.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scope>
.page {
  width: 100%;
  // width: 1900px;
  margin: 0 auto;
  background: #f2f2f2;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  .pageNav {
    position: relative;
    flex: 1;
    box-sizing: border-box;
    height: 100%;
    padding-top: 60px;
    background: #333;
    h1 {
      background: #333;
      // color: rgba(255, 255, 255, 0.65);
      color: #fff;
      font-size: 20px;
      width: 100%;
      position: absolute;
      top: 20px;
      font-weight: 700;
      padding-left: 20px;
      box-sizing: border-box;
    }
  }
  .pageContent {
    flex: 6;
    box-sizing: border-box;
    header {
      height: 60px;
      background: #fff;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .logoutBtn {
        position: absolute;
        right: 50px;
        top: calc(50% - 20px);
        button {
          font-size: 14px !important;
        }
      }
      h1 {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }
    }
    .pageRouterBox {
      width: 98%;
      font-size: 14px;
      background: #fff;
      padding: 5px;
      box-sizing: border-box;
      margin: 10px auto;
      span {
        padding: 0 10px;
      }
    }
    .pageFnWrap {
      width: 98%;
      min-height: 600px;
      background: #fff;
      box-sizing: border-box;
      margin: 0 auto;
    }
  }
}
</style>