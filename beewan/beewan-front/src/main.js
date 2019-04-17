import io from 'socket.io-client';
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

io('http://localhost:3006');

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
