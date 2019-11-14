<template>
  <div class="title">
    <h1>{{pageTitle}}</h1>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    pageTitle: {
      type: String,
      default: "模块标题"
    }
  }
}
</script>

<style lang="scss" scope>
.title {
  h1 {
    font-size: 18px;
    padding: 10px 20px;
  }
}
</style>