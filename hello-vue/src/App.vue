<template>
  <div id="app">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "Hello word!",
    };
  },
};
</script>

<style scoped>
#app {
  color: red;
}
</style>
