<template>
  <div id="app">
    <VueCount/>
    <VuexCount/>
  </div>
</template>

<script>
import VueCount from './components/VueCount.vue'
import VuexCount from './components/VuexCount.vue'

export default {
  name: 'App',
  components: {
    VueCount,
    VuexCount
  }
}
</script>

<style>
  button {
    margin-left: 5px;
  }
</style>
