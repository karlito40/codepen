import Vue from 'vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

import App from './components/App';
import Buildify from './plugins/Buildify';
import store from './store';
import I18Nify, { i18n } from './i18n';

Vue.use(I18Nify);
Vue.use(Vuetify);
Vue.use(Buildify);

Vue.config.productionTip = false;

new Vue({
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
