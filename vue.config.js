module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  // vue.config.js
  chainWebpack: (config) => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true,
      });
  },
};
