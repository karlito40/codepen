import { init as initSocket } from './socket';
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

initSocket();

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
