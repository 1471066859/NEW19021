<template>
  <el-menu
    :default-active="NavBarState"
    @open="handleOpen"
    @close="handleClose"
    background-color="#333"
    text-color="rgba(255, 255, 255, 0.65)"
    active-text-color="#fff"
    router
    unique-opened
  >
    <el-submenu
      popper-class="submenuBackColor"
      :index="item.title"
      v-for="(item, index) in navBar"
      :key="index"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="menuItem.path"
          v-for="(menuItem,i) in item.childen"
          :key="i"
        >{{menuItem.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import navBarJson from '@/data/NavBar'
export default {
  name: "NavBar",
  data() {
    return {
      // 导航栏数据
      navBar: [],
      // NavBarState: "/page/ProAdmin"
    }
  },
  created() {
    // this.NavBarState = this.$store.getters.getTabState;
    // console.log(this.NavBarState)
    this.navBar = navBarJson.navBar;
  },
  computed: {
    NavBarState() {
      return this.$store.getters.getTabState;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(keyPath)
    },
    handleClose(key, keyPath) {
    }
  },

}
</script>

<style lang="scss" scope>
.el-menu {
  height: 100%;
  width: 100%;
  .iconfont {
    font-size: 20px;
    padding-right: 10px;
  }
}
.actSubmenu {
  background: #fff;
}
.el-menu-item.is-active {
  background: #007bce !important;
  color: #fff;
}
.submenuBackColor {
  background: #fff;
}
.el-submenu .el-menu-item {
  background: red;
}
</style>