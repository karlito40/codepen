import Vue from 'vue';
import Router from 'vue-router';
import MouseControl from './views/MouseControl';
import MouseTarget from './views/MouseTarget';
import VirtualPad from './views/VirtualPad';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: VirtualPad
    },
    {
      path: '/mouse/target',
      name: 'mouse-target',
      component: MouseTarget
    },
    {
      path: '/mouse/control',
      name: 'mouse-control',
      component: MouseControl
    }
  ]
})
