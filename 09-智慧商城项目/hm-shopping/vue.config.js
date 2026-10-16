const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  // 关闭 ESLint 检查
  lintOnSave: false,
});
