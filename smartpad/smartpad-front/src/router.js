import Vue from 'vue';
import Router from 'vue-router';
import FormMouseMove from './views/FormMouseMove';
import MouseControl from './views/MouseControl';
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
      path: '/mouse/control',
      name: 'mouse-control',
      component: MouseControl
    },
    {
      path: '/mouse/move',
      name: 'mouse-move',
      component: FormMouseMove
    }
  ]
})
