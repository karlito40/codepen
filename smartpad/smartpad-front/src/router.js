import Vue from 'vue';
import Router from 'vue-router';
import FormMouseMove from './views/FormMouseMove';
import MouseControl from './views/MouseControl';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MouseControl
    },
    {
      path: '/test/mouse/move',
      name: 'test-mouse-move',
      component: FormMouseMove
    }
  ]
})
