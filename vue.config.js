/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-10-31 15:54:28
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-08 18:09:36
 * @FilePath: \pandav\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: config => {
    return {
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
      }
    }
  },
  // rules: [{ test: /\.less$/, loader: "!css-loader!less-loader" }]
  devServer: {
    proxy: {
      "/front": {
        // target: "http://172.16.23.108:9012/",
        target: "http://182.151.56.201:9012/",
        changeOrigin: true,
        pathRewrite: {
          "^/front": ""
        }
      },
      "/map": {
        target: "http://182.151.51.158:8999/map",
        changeOrigin: true,
        pathRewrite: {
          "^/map": ""
        }
      },
      "/group1": {
        target: "http://118.121.196.46:8000/group1",
        changeOrigin: true,
        pathRewrite: {
          "^/group1": ""
        }
      },
    }
  }

}