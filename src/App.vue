<template>
  <div id="app" v-bind:style="{'background-image': 'url(' + fields.header_image.url + ')' }">
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
        header_image: null
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('frontpage')
        .then((document) => {
          if (document) {
            this.fields.header_image = document.data.header_image
          } else {
            this.fields.header_image = ''
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
