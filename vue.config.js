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
      }
    }
  }
}
