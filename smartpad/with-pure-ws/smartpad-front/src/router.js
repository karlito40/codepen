import Vue from 'vue';
import Router from 'vue-router';
import MouseControl from './views/MouseControl';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mouse-control',
      component: MouseControl
    }
  ]
})
