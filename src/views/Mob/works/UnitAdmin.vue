<template>
  <div class="UnitAdmin">
    <h1>暂无数据</h1>
  </div>
</template>

<script>
import '@/hotcss/hotcss'
export default {
  name: 'UnitAdmin',
  created() {
    this.$store.dispatch("setTabState", 2);
    this.$store.dispatch('setMobHdMsg', "WELCOME")
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.UnitAdmin {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  h1 {
    text-align: center;
  }
}
</style>