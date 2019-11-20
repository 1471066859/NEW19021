<template>
  <div class="test">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurants: [],
      state: '',
      timeout: null
    };
  },
  methods: {
    loadAll() {
      this.axios.get('http://localhost:3005/selUserList')
        .then(res => {
          const { data } = res;
          this.restaurants = data;
        })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    // this.restaurants = this.loadAll();
    this.loadAll();
  }
};
</script>