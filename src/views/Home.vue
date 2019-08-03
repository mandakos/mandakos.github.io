<template>
  <div class="home content">
    <HelloWorld />
    <BlogList />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BlogList from '@/components/BlogList.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    BlogList
  }
}
</script>
