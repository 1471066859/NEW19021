<template>
  <div>
    <p>描述文字</p>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="scss" scope>
p {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  // font-style: 50px Extra large;
  // font-family: 50px Extra large;
  // font-size: 50px Extra large;
  font: 20px Extra large;
  // font-family: 	20px Extra large;
  // font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  // "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>