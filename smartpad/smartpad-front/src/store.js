import stateMerge from 'vue-object-merge';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    nbConnection: 0
  },
  actions: {
    set({ commit }, override) {
      commit('set', override);
    }
  },
  mutations: {
    set(state, override) {
      stateMerge(state, override);
    }
  }
})
