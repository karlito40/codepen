import Vue from 'vue';
import App from './App';

export default function boot () {
  return new Vue({
    render: h => h(App)
  }).$mount('#app');
}