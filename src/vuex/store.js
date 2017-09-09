import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    pageInfo: {
      type: '',
      city: ''
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getPageInfo (state) {
      return state.pageInfo
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setPageInfo (state, pageInfo) {
      state.pageInfo = pageInfo
    }
  },
  actions: {
    setUserInfo ({ commit }, user) {
      commit('setUserInfo', user)
    },
    setPageInfo ({ commit }, page) {
      commit('setPageInfo', page)
    }
  }
})

export default userStore
