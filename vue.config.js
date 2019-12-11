module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8085,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://192.168.4.155:9999',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }

}