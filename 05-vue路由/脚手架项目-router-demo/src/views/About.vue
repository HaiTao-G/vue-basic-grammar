<template>
  <div>
    <h2>关于页（About.vue）—— 懒加载 + 组件内守卫</h2>

    <p class="tip">
      这个页面在 router/index.js 里是用
      <code>() =&gt; import("@/views/About")</code> 引入的，属于<b>路由懒加载</b>：
      只有第一次访问它时才会真正下载这个页面的代码。 打开开发者工具的
      Network 面板，第一次点进来会看到多加载了一个 js 文件。
    </p>

    <label class="edit">
      <input v-model="draft" placeholder="随便写点东西，然后尝试离开本页" />
    </label>

    <p class="tip">
      上面输入框有内容时，点击其它导航会触发本组件的
      <code>beforeRouteLeave</code> 守卫，弹窗让你确认是否离开。
    </p>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      draft: "",
    };
  },

  // ========== 组件内守卫（写在组件里，只管自己这个页面）==========
  beforeRouteEnter(to, from, next) {
    // 注意：此时组件实例还没创建，所以【拿不到 this】
    // 想访问实例，要在 next 的回调里拿（vm 就是组件实例）
    console.log("[beforeRouteEnter] 准备进入 About，来自", from.path);
    next((vm) => {
      console.log("[beforeRouteEnter] 组件已创建，实例是", vm);
    });
  },

  beforeRouteUpdate(to, from, next) {
    // 当前路由改变、但组件被复用时调用（比如 /goods/1 -> /goods/2）
    console.log("[beforeRouteUpdate] 参数变了", from.params, "->", to.params);
    next();
  },

  beforeRouteLeave(to, from, next) {
    // 离开当前页面前触发，常用于"内容没保存，确定离开吗"
    if (this.draft.trim()) {
      const ok = window.confirm("内容还没保存，确定要离开吗？");
      if (ok) {
        next(); // 放行
      } else {
        next(false); // 取消跳转，留在原地
      }
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.edit input {
  width: 260px;
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
