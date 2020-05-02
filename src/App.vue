<template>
  <div id="app">
    <div class="app-wrapper" style="min-height: 100vh;">
      <div class="app-top">
        <Navigation />
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
      <div :class="{ 'isVisible' : scrollPosition > 300 }" class="goToTop" @click="scrollToTop">
        <svg class="svg-icon" viewBox="0 0 20 20">
          <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
        </svg>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navigation,
    Footer
  },
  data () {
    return {
      isVisible: false,
      scrollPosition: null,
      fields: {
        headerImageUrl: null
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('frontpage')
        .then((document) => {
          if (document) {
            if (document.data.header_image.url) this.fields.headerImageUrl = document.data.header_image.url
          } else {
            this.fields.headerImageUrl = ''
          }
        })
    },
    showBackToTopButton () {
      this.scrollPosition = window.scrollY
    },
    scrollToTop () {
      window.scrollTo(0,0);
    },
  },
  created () {
    this.getContent()
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent()
    next()
  },
  mounted() {
    window.addEventListener('scroll', this.showBackToTopButton);
  }
}
</script>

<style>
@import "./assets/css/style.css";

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
