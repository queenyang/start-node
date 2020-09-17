/* eslint-disable no-undef */
module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    config.module.rule("eslint");
    config.module.rule("eslint").use("eslint-loader");
  },
  devServer: {
    proxy: {
      "/file": {
        target: "http://172.16.25.110:8082", // vpn地址
        ws: true, // 是否跨域
        changeOrigin: true
      }
    }
  }
};
