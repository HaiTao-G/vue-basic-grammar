<template>
  <div id="app">
    <h1>父子组件传值 · 脚手架版</h1>

    <p class="intro">
      数据的唯一来源是这个<b>父组件（App.vue）</b>。下面的商品列表、购物车
      都是子组件：它们只负责展示，并把用户的操作用
      <code>$emit</code> 抛回给父组件，由父组件去改数据。
      这就是 Vue 的核心规则：<b>数据向下流（props），事件向上抛（$emit）</b>。
    </p>

    <!-- ========== 1. 购物车主链路：父 → 子 → 父 ========== -->
    <section class="row">
      <!-- 父传子：把 goods 数组传进去 -->
      <!-- 子传父：监听子组件抛出的 add-to-cart 事件 -->
      <ProductList :list="goods" @add-to-cart="handleAdd" />

      <!-- 购物车同样是子组件：数据从父来，操作抛给父 -->
      <CartPanel
        :cart="cart"
        :total="total"
        @remove="handleRemove"
        @change-count="handleChangeCount"
        @clear="handleClear"
      />
    </section>

    <!-- ========== 2. 组件上的 v-model ========== -->
    <section class="box">
      <h2>2. 组件 v-model（自定义输入框）</h2>
      <!-- 等价于：<BaseInput :value="keyword" @input="keyword = $event" /> -->
      <BaseInput v-model="keyword" placeholder="在这里打字，父组件的 keyword 会同步变化" />
      <p class="tip">父组件里的 keyword = <b>{{ keyword || "（空）" }}</b></p>
    </section>

    <!-- ========== 3. .sync 修饰符 ========== -->
    <section class="box">
      <h2>3. .sync 双向绑定（父子都能改同一个数）</h2>
      <!-- 等价于：<CounterBox :count="num" @update:count="num = $event" /> -->
      <CounterBox :count.sync="num" />
      <p class="tip">
        父组件里的 num = <b>{{ num }}</b>。
        在子组件里加减，父组件的数据会同步变化 —— 因为 .sync
        自动帮你监听了 <code>update:count</code> 事件。
      </p>
    </section>

    <!-- ========== 4. $refs：父组件直接调用子组件的方法 ========== -->
    <section class="box">
      <h2>4. $refs（应急手段，不推荐滥用）</h2>
      <ChildCard ref="child" @say-hi="handleSayHi" />
      <div class="ops">
        <button @click="callChildReset">父组件用 $refs 调子组件的 reset()</button>
        <button @click="readChildData">父组件用 $refs 读子组件的 data</button>
      </div>
      <p class="tip warn">
        能用 props / $emit 解决的场景，<b>就不要用 $refs</b>。
        它让父子强耦合，组件一多就理不清了。
      </p>
    </section>

    <!-- ========== 事件日志：所有子组件抛出的事件都记录在这里 ========== -->
    <section class="box">
      <h2>事件日志（子 → 父）</h2>
      <ul class="logs">
        <li v-for="(l, i) in logs" :key="i">{{ l }}</li>
      </ul>
      <p v-if="!logs.length" class="tip">还没有事件，去上面点几个按钮试试。</p>
    </section>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import CartPanel from "@/components/CartPanel";
import BaseInput from "@/components/BaseInput";
import CounterBox from "@/components/CounterBox";
import ChildCard from "@/components/ChildCard";

export default {
  name: "App",

  // 脚手架里用 components 局部注册，组件名可以直接写 PascalCase
  // （HTML 单文件里必须写 kebab-case，因为浏览器不区分大小写）
  components: { ProductList, CartPanel, BaseInput, CounterBox, ChildCard },

  data() {
    return {
      goods: [
        { id: 1, name: "小米手机", price: 1999 },
        { id: 2, name: "华为平板", price: 2999 },
        { id: 3, name: "苹果耳机", price: 899 },
      ],
      cart: [], // 购物车数据也放在父组件
      keyword: "",
      num: 0,
      logs: [],
    };
  },

  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.count, 0);
    },
  },

  methods: {
    // ---- 处理子组件抛上来的事件 ----
    handleAdd(item) {
      const found = this.cart.find((c) => c.id === item.id);
      if (found) {
        found.count++;
      } else {
        this.cart.push({ ...item, count: 1 });
      }
      this.log(`ProductItem 抛出 add-to-cart：${item.name}`);
    },
    handleRemove(id) {
      this.cart = this.cart.filter((c) => c.id !== id);
      this.log(`CartPanel 抛出 remove：id=${id}`);
    },
    handleChangeCount({ id, delta }) {
      const found = this.cart.find((c) => c.id === id);
      if (!found) return;
      found.count += delta;
      if (found.count <= 0) this.handleRemove(id);
      this.log(`CartPanel 抛出 change-count：id=${id}, delta=${delta}`);
    },
    handleClear() {
      this.cart = [];
      this.log("CartPanel 抛出 clear：清空购物车");
    },
    handleSayHi(msg) {
      this.log(`ChildCard 抛出 say-hi：${msg}`);
    },

    // ---- $refs 演示 ----
    callChildReset() {
      // 直接拿到子组件实例，调用它内部的方法
      this.$refs.child.reset();
      this.log("父组件通过 $refs 调用了子组件的 reset()");
    },
    readChildData() {
      alert("子组件内部的 count = " + this.$refs.child.count);
      this.log("父组件通过 $refs 读取了子组件的 count");
    },

    log(msg) {
      const time = new Date().toLocaleTimeString();
      this.logs.unshift(`[${time}] ${msg}`);
      if (this.logs.length > 8) this.logs.pop();
    },
  },
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #f5f7fa;
  color: #303133;
  font-family: "Microsoft YaHei", Arial, sans-serif;
}
#app {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  font-size: 22px;
}
h2 {
  font-size: 16px;
  margin: 0 0 10px;
}
.intro {
  font-size: 14px;
  line-height: 1.9;
  background: #ecf5ff;
  padding: 12px 16px;
  border-radius: 6px;
  code {
    background: #fff;
    padding: 1px 5px;
    border-radius: 3px;
    color: #409eff;
  }
}
.row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin: 16px 0;
  & > * {
    flex: 1;
  }
}
.box {
  background: #fff;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}
.tip {
  font-size: 13px;
  color: #909399;
  line-height: 1.8;
  &.warn {
    color: #e6a23c;
    background: #fdf6ec;
    padding: 8px 12px;
    border-radius: 4px;
  }
  code {
    background: #f5f7fa;
    padding: 1px 5px;
    border-radius: 3px;
  }
}
.ops {
  margin: 10px 0;
  button {
    margin-right: 8px;
    padding: 6px 12px;
    font-size: 13px;
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
  }
}
.logs {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  li {
    padding: 4px 0;
    border-bottom: 1px dashed #ebeef5;
    color: #606266;
  }
}
</style>
