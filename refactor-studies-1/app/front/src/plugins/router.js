import Vue from 'vue';
import VueRouter from 'vue-router';
import { Auth } from '@/core';
import { Home, SignIn, SignUp, KastList, Kast, KastForm } from '../views';
import KastProvider from '../components/KastProvider';
import UserProvider from '../components/UserProvider';

const KastController = {
  components: { KastProvider },
  render: (h) => {
    return h('KastProvider', [h('router-view')])
  }
};

const DashboardController = {
  components: { UserProvider },
  render: (h) => {
    return h('UserProvider', [h('router-view')])
  }
};

const routes = [
  // public routes
  { path: '/', component: Home, children: [
    { 
      path: '', 
      beforeEnter: (to, from, next) => {
        if (Auth.isAuthenticated()) {
          next('/u/kasts')
        } else {
          next('/login')
        }
        
      }
    },
    { path: 'login', component: SignIn },
    { path: 'signup', component: SignUp },
  ]},
  // private routes
  { path: '/u', component: DashboardController, children: [
    { path: 'kasts', component: KastList, children: [
      { path: 'new', component: KastForm }
    ]},
    { path: 'kast', component: KastController, children: [
      { path: ':kastId', component: Kast }
    ]}
  ]}
]

const PUBLIC_ROUTES = ['/', '/login', '/signup'];
const isPublicRoute = (route) => PUBLIC_ROUTES.includes(route.path);
const isPrivateRoute = (route) => !isPublicRoute(route);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes 
});

router.beforeEach((to, from, next) => {
  if (isPrivateRoute(to) && !Auth.isAuthenticated()) {
    console.error('Unauthorized access');
    next('/login')
  } else {
    next()
  }
});

export default router;