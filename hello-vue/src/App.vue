<template>
  <div id="app">
    {{ msg }}
    <br />
    {{ id }}
  </div>
</template>

<script>

  // Import the nanoid function from the nanoid package
  import { nanoid } from "nanoid";
  export default {
    name: "App",
    data() {
      return {
        msg: "Hello word!",
        id: nanoid(),
      };
    },
  };
</script>

<style scoped>
#app {
  color: red;
}
</style>
