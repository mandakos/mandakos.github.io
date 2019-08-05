<template>
  <div id="app" v-bind:style="{'background-image': 'url(' + fields.headerImageUrl + ')' }">
    <div class="app-top">
      <Navigation />
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'app',
  components: {
    Navigation,
  },
  data () {
    return {
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
    }
  },
  created () {
    this.getContent()
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent()
    next()
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
