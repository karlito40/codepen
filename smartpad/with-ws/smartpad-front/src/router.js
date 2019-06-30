import Vue from 'vue';
import Router from 'vue-router';
import Control from './views/Control';
import MouseControl from './views/MouseControl';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'control',
      component: Control
    },
    {
      path: '/mouse/control',
      name: 'mouse-control',
      component: MouseControl
    }
  ]
})
