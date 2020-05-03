<template>
  <nav class="navigation">
    <div class="sideNavigation" v-bind:class="{ sideNavOpen : isActive }" ref="sideNavigation">
      <Author />
      <ul>
        <li v-on:click="isActive = !isActive"><router-link to="/">Blogi</router-link></li>
        <li v-on:click="isActive = !isActive"><router-link to="/about">Tietoa</router-link></li>
        <li v-on:click="isActive = !isActive"><router-link to="/birdnames">Lintulajien kääntäjä</router-link></li>
        <li v-on:click="isActive = !isActive"><router-link to="/birdlive">LintuLive</router-link></li>
      </ul>
    </div>
    <a href="#" class="toggleNav" v-on:click="isActive = !isActive" v-bind:class="{ active : isActive }">
      <svg class="svg-icon" viewBox="0 0 20 20">
        <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
      </svg>
    </a>
  </nav>
</template>

<script>
import Author from '@/components/Author.vue'

export default {
  name: 'Navigation',
  components: {
    Author
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
      documentClick(e){
        if (!this.$el.contains(e.target)) {
          this.isActive = false
        }
      }
    },
    created () {
      document.addEventListener('click', this.documentClick)
    },
    destroyed () {
    document.removeEventListener('click', this.documentClick)
  }
}
</script>
