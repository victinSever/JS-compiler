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

  // publicPath: './',

  // outputDir: 'package',

  // assetsDir: 'assets',

  devServer: {
    port: 3000,
    host: 'localhost',
    open: true
  },

  ///启动source-map
  configureWebpack: {
    devtool: debug ? 'source-map' : 'false',
    module: {
      rules: [
        // 配置读取 *.md 文件的规则
        {
          test: /\.md$/,
          use: [
            { loader: "html-loader" },
            { loader: "markdown-loader", options: {} }
          ]
        }
      ]
    }
  },

  //设置默认路径
  chainWebpack: config => {
    config.resolve.alias
          .set("@", resolve("src"))
  }
}