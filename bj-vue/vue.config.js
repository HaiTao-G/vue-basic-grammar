const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 需要代理服务器将请求转发给谁,不需要写具体的路径
    proxy: {
      '/api': {	// 匹配所有以 /api1 开头的请求路径
        target: 'http://127.0.0.1:8080',	// 代理目标的基础路径
          // pathRewrite:{'^/api1':''},		// 正则将请求路径中以 /api1 开头替换为''空字符
          ws: true,    //用于支持 websocket
          changeOrigin: true  // 用于控制请求头中的 host 值
      },
      // '/api2': {	// 匹配所有以 /api2 开头的请求路径
      //   target: 'http://127.0.0.1:5001',	// 代理目标的基础路径
      //     pathRewrite:{'^/api2':''},	
      //     ws: true,    //用于支持 websocket
      //     changeOrigin: true  // 用于控制请求头中的 host 值
      // },
    }
  }
})
