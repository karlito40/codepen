const state = {i: 0}

const getters = {}

const actions = {
  addPage({ commit }, name) {
    commit('toto', name)
  },
}

// mutations
const mutations = {
  addPage(state, name) {
    console.log('addPage from test module')
    state.i++
  },
  toto(state, name) {
    console.log('call toto')
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}