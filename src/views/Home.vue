<template>
  <div class="home content">
    <div class="frontpage">
      <h1>
        {{ $prismic.richTextAsPlain(fields.title) }}
      </h1>
      <prismic-rich-text :field="fields.description"/>
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
        description: null
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('frontpage')
        .then((document) => {
          if (document) {
            if(document.data.title) this.fields.title = document.data.title
            if(document.data.description) this.fields.description = document.data.description
          } else {
            this.$router.push({ name: 'not-found' })
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
