import stateMerge from 'vue-object-merge';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    searching: false,
    nbPlayers: 0,
    battles: [],
    selectedBattle: undefined
  },
  actions: {
    set({ commit }, override) {
      commit('set', override);
    }
  },
  mutations: {
    set(state, override) {
      console.log('override', override);
      if(override.selectedBattle && !state.selectedBattle) {
        Vue.set(state, 'selectedBattle', {})
      }

      stateMerge(state, override);
    }
  }
})
