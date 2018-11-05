const state = {
  searchForComponent: { active: false, nodeTarget: null }
};

const getters = {}

const actions = {
  disableSearchForComponent({ commit }) {
    commit('disableSearchForComponent');
  },
  toggleSearchForComponent({ commit }, node) {
    commit('toggleSearchForComponent', node);
  },
}

const mutations = {
  disableSearchForComponent(state) {
    state.searchForComponent.active = false;
    state.searchForComponent.nodeTarget = null;
  },
  toggleSearchForComponent(state, nodeTarget) {
    state.searchForComponent.active = (state.searchForComponent.nodeTarget === nodeTarget)
      ? !state.searchForComponent.active
      : true;
    
    state.searchForComponent.nodeTarget = nodeTarget;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
