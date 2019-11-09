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
      <header></header>
      <!-- 页面导航 -->
      <div class="pageRouterBox">
        {{pageHeader}}
        <span>/</span>
        {{pageRouterBox}}
      </div>
      <!-- 功能模块区域 -->
      <div class="pageFnWrap">
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

import { setSession, getSession } from '@/Tools/intScaleNum'
import NavBar from '@/views/PC/components/NavBar'

export default {
  data() {
    return {
    }
  },
  created() {

  },
  methods: {

  },
  computed: {
    pageHeader() {
      const { path } = this.$route;
      switch (path) {
        case '/page/BoxAdmin':
          return '仓储管理系统'
          break;

        case '/page/Materials':
          return '仓储管理系统'
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

        default:
          break;
      }
    }
  },
  components: {
    NavBar,

  },
  beforeRouteEnter(to, from, next) {
    let userInfo = sessionStorage.getItem("userInfo");
    if (userInfo > 1) {
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
      color: rgba(255, 255, 255, 0.65);
      font-size: 20px;
      text-align: center;
      width: 100%;
      position: absolute;
      top: 10px;
      top: 20px;
      left: -35px;
    }
  }
  .pageContent {
    flex: 6;
    box-sizing: border-box;
    header {
      height: 60px;
      background: #fff;
      box-sizing: border-box;
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