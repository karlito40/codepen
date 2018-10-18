import Vue from 'vue'
import AppRoot from './AppRoot.vue'
import WithoutRouter from './components/WithoutRouter.vue'
import WithRouter from './components/WithRouter.vue'
import Article from './components/Article.vue'
// import Test from './components/Test'
import GSAP from './gsap'
import * as Plugins from 'gsap/all'
import VueRouter from 'vue-router'

GSAP.load(Plugins)

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: WithRouter, children: [
      { path: 'menu/:id', component: Article, name: 'article' },
    ]},
    { path: '/without-router', component: WithoutRouter },
  ]
})


new Vue({
  router,
  render: h => h(AppRoot)
}).$mount('#app')
