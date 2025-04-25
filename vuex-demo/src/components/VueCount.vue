<template>
  <div>
    <h2>当前求和为：{{sum}}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
    name: 'VueCount',
    data(){
        return{
            sum: 0,//当前的和
            n:1, //用户选择的数字
        };
    },
    methods:{
        increment:function(){
            this.sum += this.n; //sum = sum + n
        },
        decrement:function(){
            this.sum -= this.n; //sum = sum - n
        },
        incrementOdd:function(){
            if(this.sum % 2){
                this.sum += this.n; //sum = sum + n
            }
        },
        incrementWait:function(){
            setTimeout(() => {
                this.sum += this.n; //sum = sum + n
            }, 1000);
        },
    }

}
</script>

<style>
    button{
        margin-left: 5px;
    }
</style>