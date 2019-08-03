<template>
  <nav class="navigation">
    <a href="#" class="toggleNav" v-on:click="isActive = !isActive" v-bind:class="{ active : isActive }">
      <svg width="30" height="30" id="hamburger-icon">
          <path d="M0,5 30,5" stroke-width="5"/>
          <path d="M0,14 30,14" stroke-width="5"/>
          <path d="M0,23 30,23" stroke="#000" stroke-width="5"/>
      </svg>
    </a>
    <div class="sideNavigation" v-bind:class="{ sideNavOpen : isActive }" ref="sideNavigation">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/testi">Testi</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      isActive: false
    }
  },
  methods:{
      documentClick(e){
        let el = this.$refs.sideNavigation
        let target = e.target
        if (!this.$el.contains(event.target)) {
          this.isActive=false
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
