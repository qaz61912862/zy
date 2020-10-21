module.exports = {
  devServer: {
    proxy: {
      // 意思是把http://api.vikingship.xyz/api/columns/5f3e86d62c56ee13bb83096c
      // 转换成 http://localhost:8080/h/api/columns/5f3e86d62c56ee13bb83096c
      '/h': {
        target: 'http://api.vikingship.xyz/', // 公司测试环境
        changeOrigin: true,
        pathRewrite: {
          '^/h': '/'
        }
      }
    }
  }
}
