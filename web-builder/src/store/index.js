import Vue from 'vue'
import Vuex from 'vuex'
import workspace from './workspace'
import test from './test'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    workspace,
    test,
  },
  strict: debug,
})