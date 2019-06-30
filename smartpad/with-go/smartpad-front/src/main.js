import Vue from 'vue';
import './directives';
// import socket from './socket';
import App from './App';
import router from './router';
import store from './store';

// Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
