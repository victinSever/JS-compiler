// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const debug = process.env.NODE_ENV !== 'production'

const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave:false,

  productionSourceMap: false,

  publicPath: './',

  outputDir: 'package',

  assetsDir: 'assets',

  devServer: {
    port: 3000,
    host: 'localhost',
    open: true
  },

  ///启动source-map
  configureWebpack: config => {
    if (debug) { // 开发环境配置
        config.devtool = 'source-map'
    }
  },

  //设置默认路径
  chainWebpack: config => {
    config.resolve.alias
          .set("@", resolve("src"))
  }
}