<template>
  <div class="tabbar">
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item :id="0" :class="{'active': selected == 0}">
        <i slot="icon" class="el-icon-monitor tab_icon"></i>
        产线
      </mt-tab-item>
      <mt-tab-item :id="1" :class="{'active': selected == 1}">
        <i slot="icon" class="el-icon-document tab_icon"></i>
        订单管理
      </mt-tab-item>
      <mt-tab-item :id="2" :class="{'active': selected == 2}">
        <i slot="icon" class="el-icon-box tab_icon"></i>
        单元管理
      </mt-tab-item>
      <mt-tab-item :id="3" :class="{'active': selected == 3}">
        <i slot="icon" class="el-icon-user tab_icon"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import '@/hotcss/hotcss'
export default {
  data() {
    return {
      selected: 0,
      path: this.$route.path,
      // stuffs: [
      //   {
      //     pack:{
      //       packName:"小盒",
      //       packUuid: "adaxaaxaxaxaxax"
      //     },
      //     packNum:1,
      //     stuffName: "大米",
      //     stuffUuid: "SAdasdasdadaddsada"
      //   },
      //   {
      //     pack:{
      //       packName:"小盒",
      //       packUuid: "adaxaaxaxaxaxax"
      //     },
      //     packNum:1,
      //     stuffName: "大米",
      //     stuffUuid: "SAdasdasdadaddsada"
      //   },
      // ]
    }
  },
  created() {
    // console.log(this.path)
    let selected = this.$store.getters.getTabState;
    this.selected = selected
  },
  computed: {
    // selected() {
    //   return this.$store.getters.getTabState;
    // }
  },

  watch: {
    selected(val, oldVal) {
      let { path } = this.$route;
      let production = '/works/production';
      let OrderAdmin = '/works/OrderAdmin';
      let UnitAdmin = '/works/UnitAdmin';
      let About = '/works/About';
      switch (val) {
        case 0:
          if (path == production) break;
          else this.$router.push(production)
          break;
        case 1:
          if (path == OrderAdmin) break;
          this.$router.push(OrderAdmin)
          break;
        case 2:
          if (path == UnitAdmin) break;
          this.$router.push(UnitAdmin)
          break;
        case 3:
          if (path == About) break;
          this.$router.push(About)
          break;

        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.tabbar {
  position: fixed;
  bottom: 0;
  width: 100vw;
}
.tab_icon {
  font-size: px(18);
}
.active {
  color: aqua;
}
.mint-tab-item-label {
  font-size: px(12) !important;
}
</style>