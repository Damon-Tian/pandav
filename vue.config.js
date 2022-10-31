module.exports = {
  // rules: [{ test: /\.less$/, loader: "!css-loader!less-loader" }]
  devServer: {
    proxy: {
      "/mapapi": {
        target: "http://data.mars3d.cn",
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
      }
    }
  }
}
