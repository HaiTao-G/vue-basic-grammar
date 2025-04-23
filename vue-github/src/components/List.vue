<template>
  <div>
    <div class="row">
      <!-- 展示用户列表 -->
      <div
        v-show="info.users.length"
        class="card"
        v-for="user in info.users"
        :key="user.id"
      >
        <!-- html_url -->
        <a :href="user.html_url" target="_blank">
          <!--头像： avatar_url -->
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
        <!-- login -->
        <p class="card-text">{{ user.login }}</p>
      </div>
      <h1 v-show="info.isWelcome">欢迎使用</h1>
      <h1 v-show="info.isLoading">加载中...</h1>
      <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      info: {
        users: [],
        isWelcome: true,
        isLoading: false,
        errMsg: "",
      },
    };
  },
  methods: {
    getItems(itemsObj){
        this.info = {...this.info, ...itemsObj};
    }
  },
  mounted() {
    this.$bus.$on('getItems',this.getItems);
  },
};
</script>

<style lang="css" scoped>
    .album {
        min-height: 50rem; /* Can be removed; just added for demo purposes */
        padding-top: 3rem;
        padding-bottom: 3rem;
        background-color: #f7f7f7;
    }

    .card {
        float: left;
        width: 33.333%;
        padding: .75rem;
        margin-bottom: 2rem;
        border: 1px solid #efefef;
        text-align: center;
    }

    .card > img {
        margin-bottom: .75rem;
        border-radius: 100px;
    }

    .card-text {
        font-size: 85%;
    }
</style>
