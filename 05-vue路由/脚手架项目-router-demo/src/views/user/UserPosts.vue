<template>
  <div>
    <h3>动态（UserPosts.vue）</h3>
    <ul class="tip">
      <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserPosts",
  data() {
    return {
      posts: [
        { id: 1, title: "今天学会了嵌套路由" },
        { id: 2, title: "children 的 path 前面不能加斜杠" },
      ],
    };
  },
};
</script>
