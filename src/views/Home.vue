<template>
  <div class="home content">
    <div class="frontpage">
      <h1>
        {{ $prismic.richTextAsPlain(fields.title) }}
      </h1>
    </div>
    <BlogList />
  </div>
</template>

<script>
// @ is an alias to /src
import BlogList from '@/components/BlogList.vue'

export default {
  name: 'home',
  components: {
    BlogList
  },
  data () {
    return {
      fields: {
        title: null,
      }
    }
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getSingle('frontpage')
        .then((document) => {
          if (document) {
            this.fields.title = document.data.title
          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>

<style scoped>
.frontpage {
  background-size: cover;
  background-position: bottom;
  text-align: center;
}
h1 {
  margin: auto;
  margin-bottom: 10rem;
  margin-top: 10rem;
}
</style>