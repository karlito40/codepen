import Vue from 'vue'
import Vuex from 'vuex'
import workspace from './workspace'
import flash from './flash'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    workspace,
    flash,
  },
  strict: debug,
})