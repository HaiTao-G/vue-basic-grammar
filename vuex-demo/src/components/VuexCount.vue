<template>
  <div>
    <h2>当前求和为：{{ $store.state.sum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2" selected>2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
    name: 'VuexCount',
    data() {
        return {
        n: 0
        }
    },
    methods: {
        increment() {
            this.$store.dispatch('jia', this.n)
        },
        decrement() {
            this.$store.dispatch('jian', this.n)
        },
        incrementOdd() {
            this.$store.dispatch('jiaOdd', this.n)
        },
        incrementWait() {
            setTimeout(() => {
                this.$store.dispatch('jiaWait', this.n)
            }, 1000)
        }
    }

}
</script>

<style>
    button{
        margin-left: 5px;
    }
</style>
