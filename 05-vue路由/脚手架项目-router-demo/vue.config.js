const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  // 学习阶段关掉 eslint 检查，避免还没写完就报一堆格式错误
  lintOnSave: false,

  devServer: {
    port: 5173, // npm run serve 后访问 http://localhost:5173
    open: false,
  },
});
