/*
 * @Author: night-white-up 1030884759@qq.com
 * @Date: 2022-10-31 15:54:28
 * @LastEditors: night-white-up 1030884759@qq.com
 * @LastEditTime: 2022-11-01 18:42:09
 * @FilePath: \pandav\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // rules: [{ test: /\.less$/, loader: "!css-loader!less-loader" }]
  devServer: {
    proxy: {
      "/file": {
        target: "http://3888z2k945.wicp.vip:6150/file",
        changeOrigin: true,
        pathRewrite: {
          "^/mapapi": ""
        }
      },
      "/profile": {
        target: "http://10.51.100.105/profile",
        changeOrigin: true,
        pathRewrite: {
          "^/profile": ""
        }
      },

    }
  }
}