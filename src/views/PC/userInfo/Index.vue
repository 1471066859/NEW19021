<template>
  <div class="userInfo">
    <PageTitle pageTitle="账号管理"></PageTitle>
  </div>
</template>

<script>
import PageTitle from '@/views/PC/components/PageTitle'
import { initNavBar } from '@/Tools/intScaleNum'
export default {
  name: "UserInfo",
  components: {
    PageTitle
  },
  created() {
    initNavBar(this);
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
}
</style>