<template>
  <div>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search GitHub Users</h3>
      <div>
        <input type="text" placeholder="enter the username" v-model="keyWord"/>
        <button @click="searchUsers">Search</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUsers() {
        this.$bus.$emit('getItems', 
            {isLoading:true,errMsg:"",users:[],isWelcome:false}
        );
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
            (response) => {
                console.log('请求成功！');
                this.$bus.$emit('getItems', {users:response.data.items,isLoading:false,errMsg:""});
            },
            (error) => {
                console.log('请求失败！',error.data);
                this.$bus.$emit('getItems', {errMsg:error.data,users:[],isLoading:false});
            }
        )

    },
  },
};
</script>

<style></style>
