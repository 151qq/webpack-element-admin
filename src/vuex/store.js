import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    mapInfo: [],
    pageInfo: {
      type: '',
      city: ''
    }
  },
  getters: {
    getMapInfo (state) {
      return state.mapInfo
    },
    getPageInfo (state) {
      return state.pageInfo
    }
  },
  mutations: {
    setMapInfo (state, mapInfo) {
      state.mapInfo = mapInfo
    },
    setPageInfo (state, pageInfo) {
      state.pageInfo = pageInfo
    }
  },
  actions: {
    setMapInfo ({ commit }, map) {
      commit('setMapInfo', map)
    },
    setPageInfo ({ commit }, page) {
      commit('setPageInfo', page)
    }
  }
})

export default userStore
