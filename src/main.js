import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import App from './App.vue'
import router from './router'
import VueDisqus from 'vue-disqus'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/url-change-tracker';

Vue.use(VueAxios, axios)
Vue.use(VueHead)

Vue.config.productionTip = false

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  htmlSerializer
})

Vue.use(VueDisqus)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
