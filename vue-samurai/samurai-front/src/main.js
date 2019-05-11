import Vue from 'vue';
import socket from './socket';
import App from './app/App';
import { importDefaults } from './utils/Context';
import store from './store';

const scopes = importDefaults(require.context('./app/scopes', false, /\.js$/));
const scenes = importDefaults(require.context('./app/scenes', false, /\.vue$/));
const components = importDefaults(require.context('./app/components', false, /\.vue$/));

Object.entries({ ...scopes, ...components, ...scenes })
  .forEach(([globalName, Component]) => {
    Vue.component(globalName, Component);
  });

Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
