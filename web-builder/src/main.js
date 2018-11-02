import Vue from 'vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';
import App from './components/App';
import Buildify from './plugins/Buildify';
import store from './store';

Vue.use(Vuetify);
Vue.use(Buildify);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
