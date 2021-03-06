import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '*',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/birdnames',
      name: 'birdnames',
      component: () => import('./views/BirdNames.vue')
    },
    {
      path: '/birdlive',
      name: 'birdlive',
      component: () => import('./views/BirdLive.vue')
    },
    {
      path: '/lintuhaku',
      name: 'lintuhaku',
      component: () => import('./views/SpeechSearchHome.vue')
    },
    {
      path: '/lintuhaku/puhu',
      name: 'lintuhaku-puhu',
      component: () => import('./views/SpeechSearch.vue')
    },
    {
      path: '/:uid',
      name: 'blog-post',
      component: () => import('./views/BlogPost.vue')
    }
  ],
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})
