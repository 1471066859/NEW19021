<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import { getSession } from '@/Tools/intScaleNum'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {

  },
  mounted() {
    window.addEventListener('beforeunload', e => {
      const data = {
        loginId: getSession('loginId')
      };
      this.axios.post('/api/webapi/user/logout', this.qs.stringify(data))
    });
  },
  created() {
  },
  methods: {
  }
}
</script>

<style>
html,
body,
#app {
  background: #f2f2f2;
  width: 100%;
  height: 100%;
}
</style>
