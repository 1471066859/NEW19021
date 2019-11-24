import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户是否登录  ** 废弃**
    is_login: false,
    // 产线状态
    mobHdMsg: 'WELCOME',
    // 移动端底部tab状态
    tabState: "/page/AllOrder",
  },
  getters: {
    getIsLogin(state) {
      return state.is_login
    },
    getMobHdMsg(state) {
      return state.mobHdMsg
    },
    getTabState(state) {
      return state.tabState
    }
  },
  mutations: {
    setIsLogin(state, data) {
      state.is_login = data;
    },
    setTabState(state, data) {
      state.tabState = data;
    },
    setMobHdMsg(state, data) {
      state.mobHdMsg = data;
    }
  },
  actions: {
    setIsLogin({
      commit
    }, data) {
      commit('setIsLogin', data)
    },
    setMobHdMsg({
      commit
    }, data) {
      commit('setMobHdMsg', data)
    },
    setTabState({
      commit
    }, data) {
      commit('setTabState', data)
    },
  }
})