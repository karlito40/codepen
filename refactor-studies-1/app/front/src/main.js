import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Vuelidate from 'vuelidate';
import { vuetify, apolloProvider, router } from './plugins';
import App from './App';
import './_global';

Vue.use(VueCompositionApi);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
