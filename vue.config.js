// 配置文件修改

// 引入等比适配插件
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
  remUnit: 16
})

// 暴露webpack.config.js文件，解决less-loader的配置默认值不合适引发的问题
module.exports = {
  // publicPath: './' // 基本路径
  outputDir: 'dist', // build输出目录
  assetsDir: 'assets', // 静态资源目录
  lintOnSave: false, // eslint的校验
  productionSourceMap: false, // 生产环境是否生成sourcemap文件
  
  // css配置
  css: {
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [postcss]
      }
    }
  },

  // 开发服务器
  devServer: {
    port: 8081,
    // open: true, // 启动后是否自动开启网页
    proxy: {
      '/api': {
        target: 'https://mock.apifox.com/m1/3604436-0-default', // apifox 云端mock
        pathRewrite: {
          '^/api': '/api'
        },
        changeOrigin: true // 是否跨域
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}