import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Builder from './Builder';

Vue.use(Vuetify)
Vue.use(Builder);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
