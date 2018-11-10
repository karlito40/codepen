const state = {
  searchInLibrary: { active: false, nodeTarget: null },
  nodeSettings: { active: false, nodeTarget: null }
};

const getters = {}

const actions = {
  showNodeSettings({ commit }, node) {
    commit('setNodeSettings', { nodeTarget: node, active: true });
  },
  hideNodeSettings({ commit }) {
    commit('setNodeSettings', { nodeTarget: null, active: false });
  },
  hideSearchInLibrary({ commit }) {
    commit('hideSearchInLibrary');
  },
  toggleSearchInLibrary({ commit }, node) {
    commit('toggleSearchInLibrary', node);
  },
}

const mutations = {
  setNodeSettings(state, set = {}) {
    for(let [key, value] of Object.entries(set)) {
      state.nodeSettings[key] = value;
    }
  },
  hideSearchInLibrary(state) {
    state.searchInLibrary.active = false;
    state.searchInLibrary.nodeTarget = null;
  },
  toggleSearchInLibrary(state, nodeTarget) {
    state.searchInLibrary.active = (state.searchInLibrary.nodeTarget === nodeTarget)
      ? !state.searchInLibrary.active
      : true;
    
    state.searchInLibrary.nodeTarget = nodeTarget;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
