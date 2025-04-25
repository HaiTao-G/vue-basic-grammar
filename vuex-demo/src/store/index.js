// 该文件用于创建vuex中最核心的store

// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'

// 应用Vuex插件
Vue.use(Vuex)

// 准备actions——用于响应组件中的动作
const actions = {
  jia(miniStore,value){
    console.log('actions中的jia被调用了')
    miniStore.commit('JIA',value)
  },
  jian(miniStore,value){
    console.log('actions中的jian被调用了')
    miniStore.commit('JIAN',value)
  },
  jiaOdd(miniStore,value){
    console.log('actions中的jiaOdd被调用了')
    if(miniStore.state.sum % 2) {
      miniStore.commit('JIA',value)
    }
  },
  jiaWait(miniStore,value){
    console.log('actions中的jiaWait被调用了')
    setTimeout(() => {
      miniStore.commit('JIA',value)
    }, 500)
  }
}

// 准备mutations——用于操作数据（state）
const mutations = {
  JIA(state,value){
    console.log('mutations中的JIA被调用了')
    state.sum += value
  },
  JIAN(state,value){
    console.log('mutations中的JIAN被调用了')
    state.sum -= value
  }
}

// 准备state——用于存储数据
const state = {
  sum:0, // 当前的和
}

// 创建store
const store = new Vuex.Store({
  actions,
  mutations,
  state
})
//暴露store
export default store