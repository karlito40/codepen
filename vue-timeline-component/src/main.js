import Vue from 'vue'
import App from './App.vue'
import GSAP from './gsap'
import * as Plugins from 'gsap/all';

GSAP.load(Plugins);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
