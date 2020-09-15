/* eslint-disable no-undef */
module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    config.module.rule("eslint");
    config.module.rule("eslint").use("eslint-loader");
  }
};
