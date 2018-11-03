import uniqid from 'uniqid';

const state = {
  messages: []
};

const getters = {}

const actions = {
  addFlash({ commit }, message) {
    commit('addFlash', message);
    setTimeout(() => {
      commit('removeFlash', message);
    }, 2500);
  },
  removeFlash({ commit }, message) {
    commit('removeFlash', message);
  },
}

const mutations = {
  addFlash(state, message) {
    state.messages.push({id: uniqid(), text: message});
  },
  removeFlash(state, message) {
    const index = state.messages.findIndex(v => v.id === message.id);
    state.messages.splice(index, 1);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
