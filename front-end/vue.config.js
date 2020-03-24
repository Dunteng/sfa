// vue.config.js
module.exports = {
  // publicPath: '/sfa', // 打包文件相对路径
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        // data: `@import "./src/lib/hotcss/px2rem.scss";`
        data: `@import "./src/assets/style/main.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8889',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api', // rewrite path
          '^/server': '/server'
        }
      }
    }
  },
  // configureWebpack: config => {
  //   config.externals = {
  //     vue: 'Vue',
  //     'vue-router': 'VueRouter',
  //     lodash: {
  //       commonjs: 'lodash',
  //       umd: 'lodash',
  //       root: '_'
  //     }
  //   };
  // }
};
